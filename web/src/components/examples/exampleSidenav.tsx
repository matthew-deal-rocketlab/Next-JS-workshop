// SideNav component

import SignOut from '../signout';
import ExampleSideNavLinks from './exampleSideNavLinks';

export default function ExampleSideNav() {
  return (
    <div className="w-full flex-none md:w-64">
      <div className="flex h-full flex-col overflow-y-auto px-3 py-4 md:px-2">
        <div className="flex grow flex-col justify-between space-y-2 rounded-lg bg-gray-200 p-4">
          <div className="space-y-2">
            <ExampleSideNavLinks />
          </div>
          <SignOut />
        </div>
      </div>
    </div>
  );
}
