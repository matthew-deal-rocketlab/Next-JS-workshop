import SideNav from '@/components/dashboard/sidenav';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <nav>
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-5">
          <div className="flex items-center space-x-4">
            <Link className="flex-shrink-0" href="/">
              Some Logo
            </Link>
          </div>
          <div className="mx-auto flex flex-row gap-2 bg-white">
            <div className="">
              <Link className="0 hidden rounded p-2 md:block" href="/dashboard">
                Dashboard
              </Link>
            </div>

            <div className="">
              <Link className="hidden rounded p-2 md:block" href="/dashboard3">
                Settings
              </Link>
            </div>
          </div>
          <div className="">
            <Link className="hidden rounded p-2 md:block" href="/profile">
              Profile
            </Link>
          </div>
        </div>
      </nav>
      <div className="flex flex-1 overflow-hidden md:flex-row">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow overflow-y-auto p-6 md:p-12">{children}</div>
      </div>
    </div>
  );
}
