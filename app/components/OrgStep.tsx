'use client'

import React from 'react';

interface Props {
  config: { orgName: string };
  setConfig: (c: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function OrgStep({ config, setConfig, onSubmit }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Step 1: Sign up for Asgardeo</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          First, create a free Asgardeo account if you haven&apos;t already.
        </p>
      </div>

      <a
        href="https://asgardeo.io/signup"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg mb-6 transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
        Sign up for free Asgardeo account
      </a>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <form onSubmit={onSubmit}>
          <label className="block text-sm font-medium mb-2">
            Enter your organization name
          </label>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            This is the organization name you used when signing up for Asgardeo.
          </p>
          <input
            type="text"
            value={config.orgName}
            onChange={(e) => setConfig({ ...config, orgName: e.target.value })}
            placeholder="aigateway"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
            required
          />
          <button
            type="submit"
            className="w-full mt-4 bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-medium py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
          >
            Continue →
          </button>
        </form>
      </div>
    </div>
  );
}
