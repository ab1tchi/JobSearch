import AppLayout from '@/layouts/app-layout'; // Import the main layout component
import { type BreadcrumbItem } from '@/types'; // Import the BreadcrumbItem type
import { Head } from '@inertiajs/react'; // Import Head for setting the page title
import { usePage } from '@inertiajs/react'; // Import usePage to access Inertia page props
import { useState, useMemo } from 'react'; // Import React hooks

// Define the breadcrumb navigation items
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Job Board',
    href: '/joblist',
  },
];

// Define the Job type structure
type Job = {
  id: number;
  title: string;
  company: string;
  description: string;
  location: string;
  job_type: string;
  date_posted: string;
  salary_min: number;
  salary_max: number;
};

export default function JobBoard() {
  const { jobs = [] } = usePage().props as Partial<{ jobs: Job[] }>;

  const itemsPerPage = 12;
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(''); // For location filtering
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);

  // Get unique locations from job data
  const uniqueLocations = useMemo(() => {
    const locations = jobs.map((job) => job.location);
    return Array.from(new Set(locations));
  }, [jobs]);

  // Search & filter handler
  const handleSearch = () => {
    const lowerSearch = searchTerm.toLowerCase();

    const matches = jobs.filter((job) => {
      const matchesText =
        job.title.toLowerCase().includes(lowerSearch) ||
        job.company.toLowerCase().includes(lowerSearch) ||
        job.description.toLowerCase().includes(lowerSearch);

      const matchesLocation = selectedLocation === '' || job.location === selectedLocation;

      return matchesText && matchesLocation;
    });

    setFilteredJobs(matches);
    setPage(1); // Reset to first page
  };

  // Paginate
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentJobs = filteredJobs.slice(start, end);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Job Board" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        {/* Search Section */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Job title, keywords, or company"
            className="flex-1 border rounded-lg p-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border rounded-lg p-2"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            {uniqueLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <button
            className="bg-blue-600 text-white rounded-lg px-4"
            onClick={handleSearch}
          >
            Find jobs
          </button>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {currentJobs.length === 0 ? (
            <p>No job listings found.</p>
          ) : (
            currentJobs.map((job) => (
              <div
                key={job.id}
                className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4"
              >
                <h2 className="font-bold">{job.title}</h2>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-sm">{job.description}</p>
                <p className="text-sm">{job.location}</p>
                <p className="text-sm">{job.job_type}</p>
                <p className="text-sm">Posted on: {job.date_posted}</p>
                <p className="text-sm font-semibold">
                  Salary: PHP {job.salary_min.toLocaleString()} - {job.salary_max.toLocaleString()}
                </p>
                <button className="mt-2 bg-blue-600 text-white rounded-lg px-4 py-1">Apply now</button>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setPage((p) => (end < filteredJobs.length ? p + 1 : p))
            }
            disabled={end >= filteredJobs.length}
            className="px-4 py-2 rounded-lg bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </AppLayout>
  );
}