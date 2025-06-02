import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { CirclePlus } from 'lucide-react';
import { useState, useEffect, useMemo, useRef } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Job Board',
    href: '/joblist',
  },
];

type Job = {
  id: number;
  title: string;
  category: string;
  job_type: string;
  vacancy: number;
  salary: number;
  location: string;
  description: string;
  benefits?: string;
  responsibility?: string;
  qualifications?: string;
  experience: string;
  keywords: string;
  company_name: string;
  company_location: string;
  website?: string;
  date_posted: string;
};

export default function JobBoard() {
  const { jobs = [], flash } = usePage().props as Partial<{
    jobs: Job[];
    flash?: { success?: string; error?: string };
  }>;

  const itemsPerPage = 15;
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);

  const listRef = useRef<HTMLDivElement>(null);

  const uniqueLocations = useMemo(() => {
    const locations = jobs.map((job) => job.location);
    return Array.from(new Set(locations));
  }, [jobs]);

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();

    const matches = jobs.filter((job) => {
      const matchesText =
        job.title.toLowerCase().includes(lowerSearch) ||
        job.company_name.toLowerCase().includes(lowerSearch) ||
        job.description.toLowerCase().includes(lowerSearch);

      const matchesLocation =
        selectedLocation === '' || job.location === selectedLocation;

      return matchesText && matchesLocation;
    });

    setFilteredJobs(matches);
    setPage(1);
  }, [searchTerm, selectedLocation, jobs]);

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentJobs = filteredJobs.slice(start, end);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Job Board" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        {(flash?.success || flash?.error) && (
          <Alert variant="default">
            <AlertTitle>{flash.success ? 'Success' : 'Error'}</AlertTitle>
            <AlertDescription>{flash.success || flash.error}</AlertDescription>
          </Alert>
        )}

          <div className="ml-auto">
            <Link
              href={route('joblist.create')}
              className="inline-flex items-center gap-2 text-lg border border-black bg-[#04045E] px-3 py-2 rounded-lg text-white hover:bg-[#FE9E01]"
              aria-label="Add a Job"
            >
              <CirclePlus className="h-5 w-5" />
              <span>Add a Job</span>
            </Link>
          </div>  

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
        </div>

        <div className="flex justify-left mb-4 gap-3">
          {(() => {
            const pages: (number | string)[] = [];
            if (totalPages <= 7) {
              for (let i = 1; i <= totalPages; i++) pages.push(i);
            } else {
              pages.push(1);
              if (page > 4) pages.push('...');
              const startPage = Math.max(2, page - 1);
              const endPage = Math.min(totalPages - 1, page + 1);
              for (let i = startPage; i <= endPage; i++) pages.push(i);
              if (page < totalPages - 3) pages.push('...');
              pages.push(totalPages);
            }
            return pages.map((p, idx) =>
              typeof p === 'string' ? (
                <span key={`ellipsis-${idx}`} className="px-1 text-gray-500">
                  {p}
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`px-1 text-sm transition ${
                    p === page
                      ? 'text-[#FE9E01] font-semibold'
                      : 'text-[#04045E] hover:text-[#FE9E01]'
                  }`}
                >
                  {p}
                </button>
              )
            );
          })()}
        </div>

        <div
          ref={listRef}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {currentJobs.length === 0 ? (
            <p>No job listings found.</p>
          ) : (
            currentJobs.map((job) => (
              <div
                key={job.id}
                className="border border-gray-300 rounded-lg p-4 bg-white p-6 rounded-lg shadow-md flex flex-col h-full min-h-[300px] justify-between relative overflow-hidden"
              >
                <div className="flex-1 flex flex-col gap-2">
                  <h2 className="font-bold text-lg mb-1">{job.title}</h2>

                  <p className="text-sm text-gray-700">
                    Company Name: <span className="font-bold">{job.company_name}</span>
                  </p>

                  <p className="text-sm text-gray-500">
                    Location: <span className="font-semibold">{job.location}</span>
                  </p>

                  <p className="text-sm text-gray-500">
                    Job Type: <span className="font-semibold">{job.job_type}</span>
                  </p>

                  <p className="text-sm text-gray-500">
                    Vacancy: <span className="font-semibold">{job.vacancy}</span>
                  </p>

                  <p className="text-sm text-gray-500">
                    Experience: <span className="font-semibold">{job.experience}</span>
                  </p>

                  <p className="text-sm text-gray-500">
                    Salary: <span className="font-semibold">₱ {job.salary ? job.salary.toLocaleString() : 'Not specified'}</span>
                  </p>

                  <p className="text-sm text-gray-500">
                    Posted on: <span className="font-semibold">{job.date_posted}</span>
                  </p>

                  <p className="text-sm text-gray-700 mt-2 text-justify">
                    Description:
                    <br />
                    <span className="font-semibold">
                      {job.description.split(' ').slice(0, 15).join(' ')}
                      {job.description.split(' ').length > 15 && '...'}
                    </span>
                  </p>
                </div>

                <div className="mt-6 flex justify-center gap-3">
                    <Link
                      href={route('joblist.show', job.id)}
                      className="inline-flex text-lg border border-black bg-[#04045E] px-3 py-2 rounded-lg text-white cursor-pointer hover:bg-[#FE9E01]"
                      aria-label="View Job"
                    >
                      <span>View</span>
                    </Link>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={() => handlePageChange(Math.max(page - 1, 1))}
            disabled={page === 1}
            className="bg-[#04045E] px-4 py-2 rounded-lg bg-gray-300 disabled:opacity-50 hover:bg-[#FE9E01] hover:text-white transition"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={end >= filteredJobs.length}
            className="border border-[#04045E] px-4 py-2 rounded-lg bg-gray-300 disabled:opacity-50 hover:bg-[#FE9E01] hover:text-white transition"
          >
            Next
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
