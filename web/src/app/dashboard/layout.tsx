import SideNav from '@/components/sidenav';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-5">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <div className="flex-shrink-0">Some Logo</div>
            </Link>
          </div>
          <div className="flex flex-row gap-2">
            <Link href="/dashboard">
              <div className="hidden md:block">Dashboard</div>
            </Link>
            <Link href="/dashboard">
              <div className="hidden md:block">Dashboard</div>
            </Link>
            <Link href="/dashboard">
              <div className="hidden md:block">Dashboard</div>
            </Link>
          </div>
          <Link href="/dashboard">
            <div className="hidden md:block">Profile</div>
          </Link>
        </div>
      </nav>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </div>
    </>
  );
}
