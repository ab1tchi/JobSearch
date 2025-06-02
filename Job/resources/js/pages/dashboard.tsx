import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@headlessui/react';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function Dashboard() {
  // Extract categories from page props sent by Inertia
  const { categories = {} } = usePage().props as { categories?: Record<string, number> };

  // Convert categories object to entries for mapping
  const categoryEntries = Object.entries(categories);

  // Sum all job counts for total jobs
  const totalJobs = categoryEntries.reduce((acc, [, count]) => acc + count, 0);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-12 rounded-xl p-10 bg-white">
        {/* Grid container for all 3 cards */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">

          {/* Card 1: Job Posts Total */}
          <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-full border">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            <Link
              href="/joblist"
              className="relative z-10 flex h-full w-full flex-col items-center justify-center bg-[#04045E] px-4 py-2 rounded-2xl text-white hover:text-black cursor-pointer hover:bg-[#FE9E01] disabled:opacity-50"
            >
              <p className="mt-2 text-2xl text-white">Job Posts Total:</p>
              <br />
              <h2 className="text-4xl font-bold text-white">{totalJobs}</h2>
            </Link>
          </div>

          {/* Card 2 */}
          <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-full border">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            <Link
              href="joblist/create"
              className="relative z-10 flex h-full w-full flex-col items-center justify-center bg-[#04045E] px-4 py-2 rounded-2xl text-white hover:text-black cursor-pointer hover:bg-[#FE9E01] disabled:opacity-50"
            >
              <p className="mt-2 text-2xl text-white">Post A Job</p>
            </Link>
          </div>

          {/* Card 3 */}
          <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-full border">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            <Link
              href="/joblist"
              className="relative z-10 flex h-full w-full flex-col items-center justify-center bg-[#04045E] px-4 py-2 rounded-2xl text-white hover:text-black cursor-pointer hover:bg-[#FE9E01] disabled:opacity-50"
            >
              <p className="mt-2 text-2xl text-white">View Jobs</p>
            </Link>
          </div>

        </div> {/* end grid container */}

        {/* Job Categories section */}
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-auto rounded-xl border md:min-h-min p-6">
          <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
          <div className="relative z-10">
            <h2 className="mb-6 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Job Categories</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {categoryEntries.length === 0 ? (
                <p className="text-center text-neutral-600 dark:text-neutral-300">No categories available.</p>
              ) : (
                categoryEntries.map(([category, count]) => (
                  <div
                    key={category}
                    className="relative z-10 flex h-full w-full flex-col items-center justify-center bg-[#1C1C7E] px-4 py-2 rounded-xl text-white hover:text-white cursor-pointer hover:bg-[#04045E] disabled:opacity-50"
                  >
                    <h3 className="text-lg font-medium text-white">{category}</h3>
                    <p className="mt-1 text-sm text-white">
                      {count} job{count !== 1 ? 's' : ''}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
