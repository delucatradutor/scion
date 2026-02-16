// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package cmd

import (
	"fmt"
	"os"
	"sort"

	"github.com/ptone/scion-agent/pkg/config"
	"github.com/spf13/cobra"
)

var configGlobal bool

var configCmd = &cobra.Command{
	Use:   "config",
	Short: "Manage scion configuration settings",
	Long:  `View and modify settings for scion-agent. Settings are resolved from grove (.scion/settings.json) and global (~/.scion/settings.json) locations.`,
}

var configListCmd = &cobra.Command{
	Use:   "list",
	Short: "List all effective settings",
	RunE: func(cmd *cobra.Command, args []string) error {
		// Resolve grove path
		projectDir, err := config.GetResolvedProjectDir(grovePath)
		// If we are not in a grove, we might only show global settings or defaults
		// We handle the case where grove resolution fails gracefully for global listing?
		// But LoadSettings expects grovePath. If empty, it loads Global + Defaults.

		var effective *config.Settings
		if err == nil {
			effective, err = config.LoadSettings(projectDir)
		} else {
			// Try loading just global/defaults
			effective, err = config.LoadSettings("")
		}

		if err != nil {
			return err
		}

		// Flatten struct for display
		m := config.GetSettingsMap(effective)

		if isJSONOutput() {
			return outputJSON(m)
		}

		// Sort keys
		keys := make([]string, 0, len(m))
		for k := range m {
			keys = append(keys, k)
		}
		sort.Strings(keys)

		fmt.Println("Effective Settings:")
		for _, k := range keys {
			val := m[k]
			if val == "" {
				val = "<empty>"
			}
			fmt.Printf("  %s: %s\n", k, val)
		}

		// Also show sources?
		// For now just effective settings as per design doc example.
		return nil
	},
}

var configSetCmd = &cobra.Command{
	Use:   "set <key> <value>",
	Short: "Set a configuration value",
	Args:  cobra.ExactArgs(2),
	RunE: func(cmd *cobra.Command, args []string) error {
		key := args[0]
		value := args[1]

		targetPath := ""
		if !configGlobal {
			projectDir, err := config.GetResolvedProjectDir(grovePath)
			if err != nil {
				return fmt.Errorf("cannot set local setting: not inside a grove or grove path invalid: %w", err)
			}
			targetPath = projectDir
		}

		if err := config.UpdateSetting(targetPath, key, value, configGlobal); err != nil {
			return err
		}

		scope := "local"
		if configGlobal {
			scope = "global"
		}

		if isJSONOutput() {
			return outputJSON(ActionResult{
				Status:  "success",
				Command: "config set",
				Message: fmt.Sprintf("Updated %s setting '%s' to '%s'", scope, key, value),
				Details: map[string]interface{}{
					"key":   key,
					"value": value,
					"scope": scope,
				},
			})
		}

		fmt.Printf("Updated %s setting '%s' to '%s'\n", scope, key, value)
		return nil
	},
}

var configGetCmd = &cobra.Command{
	Use:   "get <key>",
	Short: "Get a specific configuration value",
	Args:  cobra.ExactArgs(1),
	RunE: func(cmd *cobra.Command, args []string) error {
		key := args[0]

		projectDir, _ := config.GetResolvedProjectDir(grovePath)
		// Even if error, we can try loading defaults/global

		settings, err := config.LoadSettings(projectDir)
		if err != nil {
			return err
		}

		val, err := config.GetSettingValue(settings, key)
		if err != nil {
			return err
		}

		if isJSONOutput() {
			return outputJSON(map[string]string{
				"key":   key,
				"value": val,
			})
		}

		fmt.Println(val)
		return nil
	},
}

var configValidateCmd = &cobra.Command{
	Use:   "validate",
	Short: "Validate settings files against the schema",
	Long: `Validate settings files against the JSON Schema for the declared schema version.

Checks both global (~/.scion/settings.yaml) and grove-level (.scion/settings.yaml)
settings files. Reports whether each file uses the versioned or legacy format,
and lists any schema validation errors found.

Legacy settings files (without schema_version) are identified but not validated
against the schema — they use the pre-versioned format.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		type fileResult struct {
			Path     string   `json:"path"`
			Format   string   `json:"format"`
			Version  string   `json:"version,omitempty"`
			Valid    bool     `json:"valid"`
			Errors   []string `json:"errors,omitempty"`
			Warnings []string `json:"warnings,omitempty"`
		}

		var results []fileResult
		hasErrors := false

		// Collect settings file paths to validate.
		var filePaths []struct {
			dir   string
			label string
		}

		globalDir, _ := config.GetGlobalDir()
		if globalDir != "" {
			filePaths = append(filePaths, struct {
				dir   string
				label string
			}{globalDir, "global"})
		}

		projectDir, err := config.GetResolvedProjectDir(grovePath)
		if err == nil && projectDir != "" && projectDir != globalDir {
			filePaths = append(filePaths, struct {
				dir   string
				label string
			}{projectDir, "grove"})
		}

		for _, fp := range filePaths {
			settingsPath := config.GetSettingsPath(fp.dir)
			if settingsPath == "" {
				continue
			}

			data, err := os.ReadFile(settingsPath)
			if err != nil {
				results = append(results, fileResult{
					Path:   settingsPath,
					Format: "unknown",
					Errors: []string{fmt.Sprintf("failed to read file: %v", err)},
				})
				hasErrors = true
				continue
			}

			version, isLegacy := config.DetectSettingsFormat(data)

			r := fileResult{
				Path:  settingsPath,
				Valid: true,
			}

			switch {
			case version != "":
				r.Format = "versioned"
				r.Version = version

				validationErrors, err := config.ValidateSettings(data, version)
				if err != nil {
					r.Valid = false
					r.Errors = []string{err.Error()}
					hasErrors = true
				} else if len(validationErrors) > 0 {
					r.Valid = false
					hasErrors = true
					for _, ve := range validationErrors {
						r.Errors = append(r.Errors, ve.Error())
					}
				}

			case isLegacy:
				r.Format = "legacy"
				r.Warnings = append(r.Warnings, "Legacy settings format detected. Run 'scion config migrate' to update.")

			default:
				r.Format = "minimal"
				r.Warnings = append(r.Warnings, "No schema_version found. File may be empty or use an unrecognized format.")
			}

			results = append(results, r)
		}

		if len(results) == 0 {
			if isJSONOutput() {
				return outputJSON(ActionResult{
					Status:  "success",
					Command: "config validate",
					Message: "No settings files found.",
				})
			}
			fmt.Println("No settings files found.")
			return nil
		}

		if isJSONOutput() {
			return outputJSON(map[string]interface{}{
				"files": results,
				"valid": !hasErrors,
			})
		}

		for _, r := range results {
			fmt.Printf("%s (%s", r.Path, r.Format)
			if r.Version != "" {
				fmt.Printf(" v%s", r.Version)
			}
			fmt.Println(")")

			if r.Valid && len(r.Warnings) == 0 {
				fmt.Println("  Valid")
			}

			for _, w := range r.Warnings {
				fmt.Printf("  WARNING: %s\n", w)
			}

			for _, e := range r.Errors {
				fmt.Printf("  ERROR: %s\n", e)
			}

			fmt.Println()
		}

		if hasErrors {
			return fmt.Errorf("validation failed")
		}
		return nil
	},
}

var (
	configMigrateServer bool
	configMigrateDryRun bool
)

var configMigrateCmd = &cobra.Command{
	Use:   "migrate",
	Short: "Migrate configuration to the versioned format",
	Long: `Migrate configuration files to the versioned settings format.

Use --server to consolidate server.yaml into settings.yaml under the 'server' key.
Use --dry-run to preview changes without writing files.

Examples:
  # Preview server config migration
  scion config migrate --server --dry-run

  # Migrate server.yaml into settings.yaml
  scion config migrate --server`,
	RunE: func(cmd *cobra.Command, args []string) error {
		if !configMigrateServer {
			return fmt.Errorf("specify --server to migrate server configuration")
		}

		globalDir, err := config.GetGlobalDir()
		if err != nil {
			return fmt.Errorf("failed to get global directory: %w", err)
		}

		// Load existing server.yaml
		serverYAMLPath := config.GetServerConfigPath(globalDir)
		if serverYAMLPath == "" {
			return fmt.Errorf("no server.yaml found in %s — nothing to migrate", globalDir)
		}

		gc, err := config.LoadGlobalConfig(globalDir)
		if err != nil {
			return fmt.Errorf("failed to load server config: %w", err)
		}

		// Convert to V1ServerConfig
		v1Server := config.ConvertGlobalToV1ServerConfig(gc)

		if configMigrateDryRun {
			fmt.Println("Dry run: would merge the following into settings.yaml under 'server' key:")
			fmt.Println()
			data, err := config.MarshalV1ServerConfig(v1Server)
			if err != nil {
				return fmt.Errorf("failed to marshal server config: %w", err)
			}
			fmt.Printf("server:\n")
			// Indent each line
			for _, line := range splitLines(string(data)) {
				if line != "" {
					fmt.Printf("  %s\n", line)
				} else {
					fmt.Println()
				}
			}
			fmt.Printf("\nSource: %s\n", serverYAMLPath)
			fmt.Println("Run without --dry-run to apply.")
			return nil
		}

		// Merge into settings.yaml
		if err := config.MergeServerIntoSettings(globalDir, v1Server); err != nil {
			return fmt.Errorf("failed to merge server config into settings.yaml: %w", err)
		}

		// Back up the original server.yaml
		backupPath := serverYAMLPath + ".bak"
		if err := os.Rename(serverYAMLPath, backupPath); err != nil {
			fmt.Printf("Warning: failed to back up %s: %v\n", serverYAMLPath, err)
		} else {
			fmt.Printf("Backed up %s to %s\n", serverYAMLPath, backupPath)
		}

		fmt.Printf("Server config migrated into %s under 'server' key.\n", config.GetSettingsPath(globalDir))
		return nil
	},
}

// splitLines splits a string into lines.
func splitLines(s string) []string {
	var lines []string
	start := 0
	for i, c := range s {
		if c == '\n' {
			lines = append(lines, s[start:i])
			start = i + 1
		}
	}
	if start < len(s) {
		lines = append(lines, s[start:])
	}
	return lines
}

func init() {
	rootCmd.AddCommand(configCmd)
	configCmd.AddCommand(configListCmd)
	configCmd.AddCommand(configSetCmd)
	configCmd.AddCommand(configGetCmd)
	configCmd.AddCommand(configValidateCmd)
	configCmd.AddCommand(configMigrateCmd)

	configSetCmd.Flags().BoolVar(&configGlobal, "global", false, "Set configuration globally (~/.scion/settings.json)")
	configMigrateCmd.Flags().BoolVar(&configMigrateServer, "server", false, "Migrate server.yaml into settings.yaml")
	configMigrateCmd.Flags().BoolVar(&configMigrateDryRun, "dry-run", false, "Preview changes without writing files")
}
