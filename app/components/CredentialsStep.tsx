'use client'

import React from 'react';

interface Props {
  config: { clientId: string; orgName: string };
  setConfig: (c: any) => void;
  isSaving: boolean;
  error: string | null;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function CredentialsStep({ config, setConfig, isSaving, error, onBack, onSubmit }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Step 2: Create Public Client Application</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Create a public client application in Asgardeo with PKCE enabled.
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6">
        <h3 className="font-medium mb-3 text-sm">Instructions:</h3>
        <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-2 list-decimal list-inside">
          <li>
            <a
              href={`https://console.asgardeo.io/t/${config.orgName}/develop/applications`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:underline"
            >
              Sign into Asgardeo Console →
            </a>
          </li>
          <li>Navigate to <strong>Applications</strong> → <strong>New Application</strong></li>
          <li>Select <strong>Single Page Application</strong> and give a <strong>Name</strong></li>
          <li>Set redirect URL to <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">http://localhost:3000</code></li>
          <li>Allow <strong>AI agents</strong> to sign into this application</li>       
          <li>Copy the <strong>Client ID</strong></li>
        </ol>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <strong>Base URL configured:</strong><br />
          <code className="text-xs">https://api.asgardeo.io/t/{config.orgName}</code>
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Client ID</label>
          <input
            type="text"
            value={config.clientId}
            onChange={(e) => setConfig({ ...config, clientId: e.target.value })}
            placeholder="mVQrgCtgnWmTSFTrek0T9Y3lcoEa"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 bg-orange-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save & Continue →'}
          </button>
        </div>
      </form>
    </div>
  );
}
