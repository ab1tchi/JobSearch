import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useMemo } from 'react';

type Job = {
  id: number;
  title: string;
  company_name?: string;
  company?: string;
  category?: string;
  job_type: string;
  vacancy?: number;
  salary?: number;
  salary_min?: number;
  salary_max?: number;
  location: string;
  description: string;
  benefits?: string;
  responsibility?: string;
  qualifications?: string;
  experience?: string;
  keywords?: string;
  website?: string;
  date_posted: string;
};

export default function JobBoardIntegrated() {
  const { jobs = [] } = usePage().props as Partial<{ jobs: Job[] }>;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);

  const uniqueLocations = useMemo(() => {
    const locs = jobs.map((job) => job.location);
    return Array.from(new Set(locs)).sort();
  }, [jobs]);

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();

    const matches = jobs.filter((job) => {
      const companyName = job.company_name ?? job.company ?? '';
      const matchesText =
        job.title.toLowerCase().includes(lowerSearch) ||
        companyName.toLowerCase().includes(lowerSearch) ||
        job.description.toLowerCase().includes(lowerSearch);

      const matchesLocation =
        selectedLocation === '' || job.location.toLowerCase() === selectedLocation.toLowerCase();

      return matchesText && matchesLocation;
    });

    setFilteredJobs(matches);
  }, [searchTerm, selectedLocation, jobs]);

  const displayedJobs = filteredJobs.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Head title="Job Board">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <a href="#welcome" className="text-2xl font-bold text-[#04045E] tracking-wide">
            SarakUbra
          </a>
          <nav className="flex items-center gap-8 text-sm font-semibold">
            <a href="#" className="border-b-2 border-[#04045E] pb-1">
              Browse Jobs
            </a>
          </nav>
          <div className="flex gap-2">
            <Link
              href={route('login')}
              className="border border-[#04045E] text-[#04045E] font-semibold px-3 py-1 rounded hover:bg-[#FE9E01] hover:text-white transition"
            >
              Find Job
            </Link>
            <Link
              href={route('register')}
              className="border border-[#04045E] text-[#04045E] font-semibold px-3 py-1 rounded hover:bg-[#FE9E01] hover:text-white transition"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[500px] overflow-hidden flex items-center justify-center">
        <img src="/photo.png" alt="Job Board Hero" className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-opacity-40 flex items-end justify-start px-5 py-8">
          <div className="text-[#FE9E01] max-w-lg">
            <h1 className="text-4xl font-bold italic underline mb-2">Find your dream job</h1>
            <p className="text-lg font-medium mb-6">Thousands of jobs available.</p>
            <Link
              href="login"
              className="bg-[#04045E] hover:bg-[#FE9E01] text-white px-8 py-3 rounded font-semibold transition inline-block"
            >
              Explore Now
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow mx-auto max-w-7xl px-4 py-10">
        {/* Hero & Search */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1b1b18] mb-2">Get the Right Job</h1>
          <p className="text-lg text-gray-600 font-semibold mb-6">
            Find Suitable Job For Your Lifestyle — Search over {jobs.length} Job Posts
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto items-stretch justify-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Job title, skill, or keyword"
              className="w-full sm:w-2/3 px-4 py-3 rounded border border-gray-300 font-semibold text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="w-full sm:w-1/3 px-4 py-3 rounded border border-gray-300 font-semibold text-base"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              aria-label="Filter by location"
            >
              <option value="">All Locations</option>
              {uniqueLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </form>
        </section>

        {/* Job Listings */}
        <section>
          {displayedJobs.length === 0 ? (
            <p className="text-center text-gray-600">No job listings found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {displayedJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full min-h-[300px] justify-between"
                >
                  <div className="flex-1 flex flex-col gap-2">
                    <h2 className="font-bold text-lg mb-1">{job.title}</h2>
                    <p className="text-sm text-gray-700 mb-2">
                      Join our dynamic team as...
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Location:</span> {job.location}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">🕒 {job.job_type}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">💰 ₱ {job.salary ? job.salary.toLocaleString() : 'Not specified'} per month</span>
                    </p>
                  </div>
                  <div className="mt-6 flex justify-center">
                    <Link
                      href='login'
                      className="bg-[#04045E] px-4 py-2 rounded-lg text-white cursor-pointer hover:bg-[#FE9E01] disabled:opacity-50"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#04045E] text-white py-8 text-center text-sm">
        &copy; CMPSC117 PROJECT;
        <br />
        <a href="#" className="text-white mx-1 hover:text-[#FE9E01]">About</a> &bull;
        <a href="#" className="text-white mx-1 hover:text-[#FE9E01]">Terms</a> &bull;
        <a href="#" className="text-white mx-1 hover:text-[#FE9E01]">Privacy</a>
      </footer>
    </div>
  );
}
