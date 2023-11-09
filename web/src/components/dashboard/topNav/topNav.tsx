import Link from 'next/link';

export default function TopNav() {
  return (
    <nav>
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-5">
        <div className="flex items-center space-x-4">
          <Link className="flex-shrink-0" href="/">
            Some Logo
          </Link>
        </div>
        <div className="mx-auto flex flex-row gap-2 bg-white">
          <Link className="0 hidden rounded p-2 md:block" href="/dashboard">
            Dashboard
          </Link>
          <Link className="hidden rounded p-2 md:block" href="/dashboard3">
            Settings
          </Link>
        </div>
        <Link className="hidden rounded p-2 md:block" href="/profile">
          Profile
        </Link>
      </div>
    </nav>
  );
}
