package hub

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"time"
)

// OAuthProviderConfig holds OAuth credentials for a single provider.
type OAuthProviderConfig struct {
	ClientID     string
	ClientSecret string
}

// OAuthConfig holds configuration for all OAuth providers.
type OAuthConfig struct {
	Google OAuthProviderConfig
	GitHub OAuthProviderConfig
}

// IsConfigured returns true if at least one OAuth provider is configured.
func (c *OAuthConfig) IsConfigured() bool {
	return c.Google.ClientID != "" || c.GitHub.ClientID != ""
}

// IsProviderConfigured returns true if the specified provider is configured.
func (c *OAuthConfig) IsProviderConfigured(provider string) bool {
	switch provider {
	case "google":
		return c.Google.ClientID != "" && c.Google.ClientSecret != ""
	case "github":
		return c.GitHub.ClientID != "" && c.GitHub.ClientSecret != ""
	default:
		return false
	}
}

// OAuthService handles OAuth operations for CLI authentication.
type OAuthService struct {
	config     OAuthConfig
	httpClient *http.Client
}

// NewOAuthService creates a new OAuth service.
func NewOAuthService(config OAuthConfig) *OAuthService {
	return &OAuthService{
		config: config,
		httpClient: &http.Client{
			Timeout: 30 * time.Second,
		},
	}
}

// OAuthUserInfo contains user information retrieved from an OAuth provider.
type OAuthUserInfo struct {
	ID          string
	Email       string
	DisplayName string
	AvatarURL   string
	Provider    string
}

// Google OAuth endpoints
const (
	googleAuthURL  = "https://accounts.google.com/o/oauth2/v2/auth"
	googleTokenURL = "https://oauth2.googleapis.com/token"
	googleUserURL  = "https://www.googleapis.com/oauth2/v2/userinfo"
)

// GitHub OAuth endpoints
const (
	githubAuthURL  = "https://github.com/login/oauth/authorize"
	githubTokenURL = "https://github.com/login/oauth/access_token"
	githubUserURL  = "https://api.github.com/user"
	githubEmailURL = "https://api.github.com/user/emails"
)

// GetAuthorizationURL generates an OAuth authorization URL for the specified provider.
func (s *OAuthService) GetAuthorizationURL(provider, callbackURL, state string) (string, error) {
	switch provider {
	case "google":
		return s.getGoogleAuthURL(callbackURL, state)
	case "github":
		return s.getGitHubAuthURL(callbackURL, state)
	default:
		return "", fmt.Errorf("unsupported OAuth provider: %s", provider)
	}
}

// getGoogleAuthURL generates a Google OAuth authorization URL.
func (s *OAuthService) getGoogleAuthURL(callbackURL, state string) (string, error) {
	if s.config.Google.ClientID == "" {
		return "", fmt.Errorf("Google OAuth is not configured")
	}

	params := url.Values{
		"client_id":     {s.config.Google.ClientID},
		"redirect_uri":  {callbackURL},
		"response_type": {"code"},
		"scope":         {"openid email profile"},
		"state":         {state},
		"access_type":   {"offline"},
		"prompt":        {"consent"},
	}

	return googleAuthURL + "?" + params.Encode(), nil
}

// getGitHubAuthURL generates a GitHub OAuth authorization URL.
func (s *OAuthService) getGitHubAuthURL(callbackURL, state string) (string, error) {
	if s.config.GitHub.ClientID == "" {
		return "", fmt.Errorf("GitHub OAuth is not configured")
	}

	params := url.Values{
		"client_id":    {s.config.GitHub.ClientID},
		"redirect_uri": {callbackURL},
		"scope":        {"read:user user:email"},
		"state":        {state},
	}

	return githubAuthURL + "?" + params.Encode(), nil
}

// ExchangeCode exchanges an authorization code for user information.
func (s *OAuthService) ExchangeCode(ctx context.Context, provider, code, callbackURL string) (*OAuthUserInfo, error) {
	switch provider {
	case "google":
		return s.exchangeGoogleCode(ctx, code, callbackURL)
	case "github":
		return s.exchangeGitHubCode(ctx, code, callbackURL)
	default:
		return nil, fmt.Errorf("unsupported OAuth provider: %s", provider)
	}
}

// exchangeGoogleCode exchanges a Google authorization code for user info.
func (s *OAuthService) exchangeGoogleCode(ctx context.Context, code, callbackURL string) (*OAuthUserInfo, error) {
	if s.config.Google.ClientID == "" || s.config.Google.ClientSecret == "" {
		return nil, fmt.Errorf("Google OAuth is not configured")
	}

	// Exchange code for access token
	tokenResp, err := s.exchangeCodeForToken(ctx, googleTokenURL, s.config.Google.ClientID, s.config.Google.ClientSecret, code, callbackURL)
	if err != nil {
		return nil, fmt.Errorf("failed to exchange Google code: %w", err)
	}

	// Get user info
	userInfo, err := s.getGoogleUserInfo(ctx, tokenResp.AccessToken)
	if err != nil {
		return nil, fmt.Errorf("failed to get Google user info: %w", err)
	}

	return userInfo, nil
}

// exchangeGitHubCode exchanges a GitHub authorization code for user info.
func (s *OAuthService) exchangeGitHubCode(ctx context.Context, code, callbackURL string) (*OAuthUserInfo, error) {
	if s.config.GitHub.ClientID == "" || s.config.GitHub.ClientSecret == "" {
		return nil, fmt.Errorf("GitHub OAuth is not configured")
	}

	// Exchange code for access token
	tokenResp, err := s.exchangeGitHubCodeForToken(ctx, code, callbackURL)
	if err != nil {
		return nil, fmt.Errorf("failed to exchange GitHub code: %w", err)
	}

	// Get user info
	userInfo, err := s.getGitHubUserInfo(ctx, tokenResp.AccessToken)
	if err != nil {
		return nil, fmt.Errorf("failed to get GitHub user info: %w", err)
	}

	return userInfo, nil
}

// tokenResponse represents the response from an OAuth token endpoint.
type tokenResponse struct {
	AccessToken  string `json:"access_token"`
	TokenType    string `json:"token_type"`
	ExpiresIn    int    `json:"expires_in"`
	RefreshToken string `json:"refresh_token"`
	Scope        string `json:"scope"`
}

// exchangeCodeForToken exchanges an authorization code for an access token (Google).
func (s *OAuthService) exchangeCodeForToken(ctx context.Context, tokenURL, clientID, clientSecret, code, callbackURL string) (*tokenResponse, error) {
	data := url.Values{
		"grant_type":    {"authorization_code"},
		"code":          {code},
		"redirect_uri":  {callbackURL},
		"client_id":     {clientID},
		"client_secret": {clientSecret},
	}

	req, err := http.NewRequestWithContext(ctx, "POST", tokenURL, strings.NewReader(data.Encode()))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("token exchange failed: %s - %s", resp.Status, string(body))
	}

	var tokenResp tokenResponse
	if err := json.NewDecoder(resp.Body).Decode(&tokenResp); err != nil {
		return nil, fmt.Errorf("failed to decode token response: %w", err)
	}

	return &tokenResp, nil
}

// exchangeGitHubCodeForToken exchanges a GitHub authorization code for an access token.
func (s *OAuthService) exchangeGitHubCodeForToken(ctx context.Context, code, callbackURL string) (*tokenResponse, error) {
	data := url.Values{
		"client_id":     {s.config.GitHub.ClientID},
		"client_secret": {s.config.GitHub.ClientSecret},
		"code":          {code},
		"redirect_uri":  {callbackURL},
	}

	req, err := http.NewRequestWithContext(ctx, "POST", githubTokenURL, strings.NewReader(data.Encode()))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("Accept", "application/json")

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("token exchange failed: %s - %s", resp.Status, string(body))
	}

	var tokenResp tokenResponse
	if err := json.NewDecoder(resp.Body).Decode(&tokenResp); err != nil {
		return nil, fmt.Errorf("failed to decode token response: %w", err)
	}

	if tokenResp.AccessToken == "" {
		// GitHub sometimes returns error in the body
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("no access token in response: %s", string(body))
	}

	return &tokenResp, nil
}

// googleUserInfo represents the response from Google's userinfo endpoint.
type googleUserInfo struct {
	ID            string `json:"id"`
	Email         string `json:"email"`
	VerifiedEmail bool   `json:"verified_email"`
	Name          string `json:"name"`
	GivenName     string `json:"given_name"`
	FamilyName    string `json:"family_name"`
	Picture       string `json:"picture"`
}

// getGoogleUserInfo retrieves user information from Google.
func (s *OAuthService) getGoogleUserInfo(ctx context.Context, accessToken string) (*OAuthUserInfo, error) {
	req, err := http.NewRequestWithContext(ctx, "GET", googleUserURL, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Authorization", "Bearer "+accessToken)

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("failed to get user info: %s - %s", resp.Status, string(body))
	}

	var userInfo googleUserInfo
	if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
		return nil, fmt.Errorf("failed to decode user info: %w", err)
	}

	return &OAuthUserInfo{
		ID:          userInfo.ID,
		Email:       userInfo.Email,
		DisplayName: userInfo.Name,
		AvatarURL:   userInfo.Picture,
		Provider:    "google",
	}, nil
}

// githubUser represents the response from GitHub's user endpoint.
type githubUser struct {
	ID        int64  `json:"id"`
	Login     string `json:"login"`
	Name      string `json:"name"`
	Email     string `json:"email"`
	AvatarURL string `json:"avatar_url"`
}

// githubEmail represents an email from GitHub's user/emails endpoint.
type githubEmail struct {
	Email    string `json:"email"`
	Primary  bool   `json:"primary"`
	Verified bool   `json:"verified"`
}

// getGitHubUserInfo retrieves user information from GitHub.
func (s *OAuthService) getGitHubUserInfo(ctx context.Context, accessToken string) (*OAuthUserInfo, error) {
	// Get user profile
	req, err := http.NewRequestWithContext(ctx, "GET", githubUserURL, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Authorization", "Bearer "+accessToken)
	req.Header.Set("Accept", "application/vnd.github.v3+json")

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("failed to get user info: %s - %s", resp.Status, string(body))
	}

	var user githubUser
	if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
		return nil, fmt.Errorf("failed to decode user info: %w", err)
	}

	// If email is not public, fetch from emails endpoint
	email := user.Email
	if email == "" {
		email, err = s.getGitHubPrimaryEmail(ctx, accessToken)
		if err != nil {
			return nil, fmt.Errorf("failed to get user email: %w", err)
		}
	}

	displayName := user.Name
	if displayName == "" {
		displayName = user.Login
	}

	return &OAuthUserInfo{
		ID:          fmt.Sprintf("%d", user.ID),
		Email:       email,
		DisplayName: displayName,
		AvatarURL:   user.AvatarURL,
		Provider:    "github",
	}, nil
}

// getGitHubPrimaryEmail fetches the primary email from GitHub's emails endpoint.
func (s *OAuthService) getGitHubPrimaryEmail(ctx context.Context, accessToken string) (string, error) {
	req, err := http.NewRequestWithContext(ctx, "GET", githubEmailURL, nil)
	if err != nil {
		return "", err
	}
	req.Header.Set("Authorization", "Bearer "+accessToken)
	req.Header.Set("Accept", "application/vnd.github.v3+json")

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("failed to get emails: %s - %s", resp.Status, string(body))
	}

	var emails []githubEmail
	if err := json.NewDecoder(resp.Body).Decode(&emails); err != nil {
		return "", fmt.Errorf("failed to decode emails: %w", err)
	}

	// Find primary verified email
	for _, e := range emails {
		if e.Primary && e.Verified {
			return e.Email, nil
		}
	}

	// Fall back to any verified email
	for _, e := range emails {
		if e.Verified {
			return e.Email, nil
		}
	}

	// Fall back to any email
	if len(emails) > 0 {
		return emails[0].Email, nil
	}

	return "", fmt.Errorf("no email found")
}
