'use client'

import { useState, useEffect } from 'react';
import SetupStepIndicator from './components/SetupStepIndicator';
import Header from './components/Header';
import Footer from './components/Footer';
import OrgStep from './components/OrgStep';
import CredentialsStep from './components/CredentialsStep';
import SignInStep from './components/SignInStep';
import ChatInterface from './components/ChatInterface';
import { generateCodeVerifier, generateCodeChallenge, storePKCEVerifier, getPKCEVerifier, clearPKCEVerifier } from './utils/pkce';

type Step = 'org' | 'credentials' | 'signin';

interface AsgardeoConfig {
  orgName: string;
  clientId: string;
}

interface UserInfo {
  sub?: string;
  email?: string;
  username?: string;
  given_name?: string;
  family_name?: string;
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>('org');
  const [config, setConfig] = useState<AsgardeoConfig>({
    orgName: 'aigateway',
    clientId: 'mVQrgCtgnWmTSFTrek0T9Y3lcoEa',
  });
  const [isConfigured, setIsConfigured] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // Ensure we're mounted before accessing localStorage
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if already configured on mount
  useEffect(() => {
    if (!mounted) return;
    const savedConfig = sessionStorage.getItem('asgardeo-config');
    const savedUserInfo = sessionStorage.getItem('user-info');
    
    if (savedConfig) {
      const parsed = JSON.parse(savedConfig);
      setConfig(parsed);
      setIsConfigured(true);
      setCurrentStep('signin');
    }

    if (savedUserInfo) {
      const parsed = JSON.parse(savedUserInfo);
      setUserInfo(parsed);
      setIsAuthenticated(true);
    }
  }, [mounted]);

  // Handle OAuth callback
  useEffect(() => {
    if (!mounted) return;

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (error) {
      setError(`Authentication failed: ${error}`);
      // Clean up URL
      window.history.replaceState({}, '', '/');
      return;
    }

    if (code && !isAuthenticated) {
      const handleCallback = async () => {
        try {
          const savedConfig = sessionStorage.getItem('asgardeo-config');
          if (!savedConfig) {
            setError('Configuration not found. Please start over.');
            return;
          }

          const config = JSON.parse(savedConfig);
          const codeVerifier = getPKCEVerifier();

          if (!codeVerifier) {
            setError('PKCE verification failed. Please try signing in again.');
            return;
          }

          // Exchange code for tokens
          const response = await fetch('/api/auth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              code,
              orgName: config.orgName,
              clientId: config.clientId,
              codeVerifier: codeVerifier,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to exchange authorization code');
          }

          const data = await response.json();

          // Store tokens and user info
          sessionStorage.setItem('access-token', data.tokens.access_token);
          sessionStorage.setItem('user-info', JSON.stringify(data.userInfo));

          setUserInfo(data.userInfo);
          setIsAuthenticated(true);

          // Clean up URL
          window.history.replaceState({}, '', '/');
        } catch (err) {
          setError('Failed to complete authentication. Please try again.');
          console.error(err);
          // Clean up URL
          window.history.replaceState({}, '', '/');
        }
      };

      handleCallback();
    }
  }, [mounted, isAuthenticated]);

  const handleOrgSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (config.orgName.trim()) {
      setCurrentStep('credentials');
    }
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (config.clientId.trim()) {
      setIsSaving(true);
      setError(null);
      
      try {
        // Save to session storage instead of .env
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('asgardeo-config', JSON.stringify(config));
        }
        
        setIsConfigured(true);
        setCurrentStep('signin');
      } catch (err) {
        setError('Failed to save configuration. Please try again.');
        console.error(err);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleReset = () => {
    sessionStorage.removeItem('asgardeo-config');
    sessionStorage.removeItem('user-info');
    sessionStorage.removeItem('access-token');
    sessionStorage.removeItem('pkce_code_verifier');
    setConfig({ orgName: '', clientId: '' });
    setIsConfigured(false);
    setIsAuthenticated(false);
    setUserInfo(null);
    setCurrentStep('org');
  };

  const handleSignIn = async () => {
    try {
      setIsSaving(true);
      setError(null);

      // Generate PKCE parameters
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);
      
      // Store code verifier for later use in token exchange
      storePKCEVerifier(codeVerifier);

      // Get auth URL from backend
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orgName: config.orgName,
          clientId: config.clientId,
          codeChallenge: codeChallenge,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to initiate authentication');
      }

      const data = await response.json();
      
      // Redirect to Asgardeo login
      window.location.href = data.authUrl;
    } catch (err) {
      setError('Failed to sign in. Please try again.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = () => {
    sessionStorage.removeItem('user-info');
    sessionStorage.removeItem('access-token');
    clearPKCEVerifier();
    setIsAuthenticated(false);
    setUserInfo(null);
  };

  // If authenticated, show chat interface directly
  if (isAuthenticated && userInfo) {
    return (
      <ChatInterface
        orgName={config.orgName}
        userInfo={userInfo}
        onSignOut={handleSignOut}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-xl">
        <Header />

        <SetupStepIndicator currentStep={currentStep} />

        {currentStep === 'org' && (
          <OrgStep config={config} setConfig={setConfig} onSubmit={handleOrgSubmit} />
        )}

        {currentStep === 'credentials' && (
          <CredentialsStep
            config={config}
            setConfig={setConfig}
            isSaving={isSaving}
            error={error}
            onBack={() => setCurrentStep('org')}
            onSubmit={handleCredentialsSubmit}
          />
        )}

        {currentStep === 'signin' && (
          <SignInStep
            config={config}
            isConfigured={isConfigured}
            isSaving={isSaving}
            error={error}
            isAuthenticated={isAuthenticated}
            handleSignIn={handleSignIn}
            handleReset={handleReset}
            userInfo={userInfo}
            handleSignOut={handleSignOut}
          />
        )}

        <Footer />
      </div>
    </div>
  );
}
