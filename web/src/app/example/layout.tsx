import TopNav from '@/components/dashboard/topNav/topNav';
import ExampleSideNav from '@/components/examples/exampleSidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <TopNav />
      <div className="flex flex-1 overflow-hidden md:flex-row">
        <ExampleSideNav />
        <div className="flex-grow overflow-y-auto p-6 md:p-12">{children}</div>
      </div>
    </div>
  );
}
