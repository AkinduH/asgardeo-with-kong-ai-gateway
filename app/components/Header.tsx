'use client'

export default function Header() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#FF7300"/>
          <path d="M2 17L12 22L22 17" stroke="#FF7300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="#FF7300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h1 className="text-3xl font-bold">Asgardeo Setup</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400">
        Configure your Asgardeo authentication in 3 simple steps
      </p>
    </div>
  );
}
