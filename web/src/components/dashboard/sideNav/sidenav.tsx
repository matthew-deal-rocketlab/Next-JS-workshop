// SideNav component
import Link from 'next/link';
import SideNavLinks from './sideNavLinks';

export default function SideNav() {
  return (
    <div className="w-full flex-none md:w-64">
      <div className="flex h-full flex-col overflow-y-auto px-3 py-4 md:px-2">
        <div className="flex grow flex-col justify-between space-y-2 rounded-lg bg-gray-200 p-4">
          <div className="space-y-2">
            <SideNavLinks />
          </div>
          <form className="mt-auto w-full">
            <button className="flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium text-black hover:bg-gray-300 hover:text-gray-600">
              <div className="hidden md:block">Sign Out</div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
