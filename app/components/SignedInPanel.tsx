'use client';

interface UserInfo {
  sub?: string;
  email?: string;
  username?: string;
  given_name?: string;
  family_name?: string;
}

interface Props {
  userInfo: UserInfo | null;
  handleSignOut: () => void;
  handleReset: () => void;
}

export default function SignedInPanel({ userInfo, handleSignOut, handleReset }: Props) {
  return (
    <div className="text-center">
      <div className="mb-6">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">You are now signed in with Asgardeo.</p>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Redirecting to dashboard...</p>
      </div>

      {userInfo && (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6">
          <p className="text-sm font-medium">
            Signed in as: <span className="text-orange-500">{userInfo.username || userInfo.email || userInfo.sub}</span>
          </p>
        </div>
      )}

      <div className="space-y-3">
        <button
          onClick={handleSignOut}
          className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-3 px-4 rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
        >
          Sign out
        </button>
        <button onClick={handleReset} className="w-full text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          Reset configuration
        </button>
      </div>
    </div>
  );
}
