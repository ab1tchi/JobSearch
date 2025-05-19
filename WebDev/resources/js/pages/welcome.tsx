import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { type SharedData } from '@/types';

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

export default function Welcome() {
  const { auth } = usePage<SharedData>().props;
  const { jobs = [] } = usePage().props as Partial<{ jobs: Job[] }>;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(''); // For location filtering
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);

  return (
    <>
      <Head title="WebDev">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <a href="#" className="text-2xl font-bold text-blue-500 tracking-wide">SarakUbra</a>
          <nav className="flex items-center gap-8 text-sm font-semibold">
            <a href="#" className="border-b-2 border-blue-500 pb-1">Browse Jobs</a>
          </nav>
          <div className="flex gap-3">
            <Link href={route('login')} className="border border-blue-500 text-blue-500 font-semibold px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition">Log in</Link>
            <Link href={route('register')} className="border border-blue-500 text-blue-500 font-semibold px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition">Register</Link>
            <Link href={route('register')} className="border border-blue-500 text-blue-500 font-semibold px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition">Post a job</Link>
            </div>
          </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10">
        {/* Hero */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1b1b18] mb-2">Get the Right Job</h1>
          <p className="text-lg text-gray-600 font-semibold mb-6">Find Suitable Job For Your Lifestyle  — Search over 65 Job Posts 
            <br></br>
            "65 lang kasi nasa database hehe"<br></br>
            Madi ag display agijay job list from database HAHHAHA</p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
            onSubmit={(e) => { e.preventDefault(); alert('Search submitted!'); }}
          >
            <input
              type="text"
              placeholder="Job title, skill, or keyword"
              className="w-full px-4 py-3 rounded border border-gray-300 font-semibold text-base"
              required
            />
            <select className="px-4 py-3 rounded border border-gray-300 font-semibold text-base">
              <option value="">All Locations</option>
              <option value="manila">Manila</option>
              <option value="cebu">Cebu</option>
              <option value="davao">Davao</option>
            </select>
            <button type="submit" className="bg-blue-500 text-white font-bold px-6 py-3 rounded hover:bg-blue-600 transition">
              Search
            </button>
          </form>
        </section>

        {/* Dynamic Job Listings from the first code */}
        <section>
          <h2 className="text-center text-3xl font-bold text-blue-500 mb-10">Featured Jobs</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.length === 0 ? (
            <p>No job listings found.</p>
        ) : (
            filteredJobs.map((job) => (
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
        </section>
      </main>

      <footer className="bg-[#2d2d2d] text-[#bfbfbf] py-8 text-center text-sm">
        &copy; WEBDEV PROJECT;
        <br />
        <a href="#" className="text-blue-500 mx-1 hover:text-blue-400">About</a> &bull;
        <a href="#" className="text-blue-500 mx-1 hover:text-blue-400">Terms</a> &bull;
        <a href="#" className="text-blue-500 mx-1 hover:text-blue-400">Privacy</a>
      </footer>
    </>
  );
}