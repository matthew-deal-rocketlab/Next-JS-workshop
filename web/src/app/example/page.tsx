import Cards from '@/components/examples/cards';
import RevenueChart from '@/components/examples/revenue-chart';
import LatestInvoices from '@/components/examples/latest-invoices';
import {
  CardsSkeleton,
  RevenueChartSkeleton,
} from '@/components/examples/skeletons';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <div>
      <h1 className="text-2xl">Example Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <Cards />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>

        <Suspense fallback={<RevenueChartSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </div>
  );
}
