'use client'

export default function Footer() {
  return (
    <p className="text-center text-xs text-gray-400 mt-8">
      Powered by{' '}
      <a href="https://asgardeo.io" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">
        Asgardeo
      </a>
      {' '}and{' '}
      <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">
        Next.js
      </a>
    </p>
  );
}
