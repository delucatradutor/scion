package hub

import (
	"strings"
	"testing"
)

func TestOAuthConfig_IsConfigured(t *testing.T) {
	tests := []struct {
		name     string
		config   OAuthConfig
		expected bool
	}{
		{
			name:     "empty config",
			config:   OAuthConfig{},
			expected: false,
		},
		{
			name: "google configured",
			config: OAuthConfig{
				Google: OAuthProviderConfig{
					ClientID:     "google-client-id",
					ClientSecret: "google-secret",
				},
			},
			expected: true,
		},
		{
			name: "github configured",
			config: OAuthConfig{
				GitHub: OAuthProviderConfig{
					ClientID:     "github-client-id",
					ClientSecret: "github-secret",
				},
			},
			expected: true,
		},
		{
			name: "both configured",
			config: OAuthConfig{
				Google: OAuthProviderConfig{
					ClientID:     "google-client-id",
					ClientSecret: "google-secret",
				},
				GitHub: OAuthProviderConfig{
					ClientID:     "github-client-id",
					ClientSecret: "github-secret",
				},
			},
			expected: true,
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			if got := tc.config.IsConfigured(); got != tc.expected {
				t.Errorf("IsConfigured() = %v, want %v", got, tc.expected)
			}
		})
	}
}

func TestOAuthConfig_IsProviderConfigured(t *testing.T) {
	config := OAuthConfig{
		Google: OAuthProviderConfig{
			ClientID:     "google-client-id",
			ClientSecret: "google-secret",
		},
		GitHub: OAuthProviderConfig{
			ClientID: "github-client-id",
			// Missing secret
		},
	}

	tests := []struct {
		provider string
		expected bool
	}{
		{"google", true},
		{"github", false}, // missing secret
		{"unknown", false},
	}

	for _, tc := range tests {
		t.Run(tc.provider, func(t *testing.T) {
			if got := config.IsProviderConfigured(tc.provider); got != tc.expected {
				t.Errorf("IsProviderConfigured(%s) = %v, want %v", tc.provider, got, tc.expected)
			}
		})
	}
}

func TestOAuthService_GetAuthorizationURL(t *testing.T) {
	config := OAuthConfig{
		Google: OAuthProviderConfig{
			ClientID:     "google-client-id",
			ClientSecret: "google-secret",
		},
		GitHub: OAuthProviderConfig{
			ClientID:     "github-client-id",
			ClientSecret: "github-secret",
		},
	}

	service := NewOAuthService(config)

	t.Run("google authorization URL", func(t *testing.T) {
		url, err := service.GetAuthorizationURL("google", "http://localhost:18271/callback", "test-state")
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}

		if !strings.HasPrefix(url, "https://accounts.google.com/o/oauth2/v2/auth") {
			t.Errorf("unexpected URL prefix: %s", url)
		}
		if !strings.Contains(url, "client_id=google-client-id") {
			t.Errorf("URL missing client_id: %s", url)
		}
		if !strings.Contains(url, "state=test-state") {
			t.Errorf("URL missing state: %s", url)
		}
		if !strings.Contains(url, "redirect_uri=http") {
			t.Errorf("URL missing redirect_uri: %s", url)
		}
	})

	t.Run("github authorization URL", func(t *testing.T) {
		url, err := service.GetAuthorizationURL("github", "http://localhost:18271/callback", "test-state")
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}

		if !strings.HasPrefix(url, "https://github.com/login/oauth/authorize") {
			t.Errorf("unexpected URL prefix: %s", url)
		}
		if !strings.Contains(url, "client_id=github-client-id") {
			t.Errorf("URL missing client_id: %s", url)
		}
		if !strings.Contains(url, "state=test-state") {
			t.Errorf("URL missing state: %s", url)
		}
	})

	t.Run("unsupported provider", func(t *testing.T) {
		_, err := service.GetAuthorizationURL("unknown", "http://localhost:18271/callback", "test-state")
		if err == nil {
			t.Error("expected error for unsupported provider")
		}
	})
}

func TestOAuthService_NotConfigured(t *testing.T) {
	config := OAuthConfig{} // Empty config

	service := NewOAuthService(config)

	t.Run("google not configured", func(t *testing.T) {
		_, err := service.GetAuthorizationURL("google", "http://localhost:18271/callback", "test-state")
		if err == nil {
			t.Error("expected error when google is not configured")
		}
	})

	t.Run("github not configured", func(t *testing.T) {
		_, err := service.GetAuthorizationURL("github", "http://localhost:18271/callback", "test-state")
		if err == nil {
			t.Error("expected error when github is not configured")
		}
	})
}
