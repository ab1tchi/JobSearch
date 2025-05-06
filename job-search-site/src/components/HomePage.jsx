import React, { useState } from 'react';
import ApplyPage from './ApplyPage';
import allJobs from './jobs';
import './HomePage.css';

function HomePage() {
  const [job, setJob] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState(Object.values(allJobs).flat());
  const [selectedJob, setSelectedJob] = useState(null);

  const locations = ['Tarlac City', 'Manila', 'Cebu', 'Davao', 'IlocosNorte', 'IlocosSur', 'Palawan'];

  const handleSearch = (e) => {
    e.preventDefault();
    const jobList = location && allJobs[location] ? allJobs[location] : Object.values(allJobs).flat();
    const filtered = job
      ? jobList.filter(jobObj =>
          jobObj.title.toLowerCase().includes(job.toLowerCase()) ||
          jobObj.company.toLowerCase().includes(job.toLowerCase())
        )
      : jobList;
    setResults(filtered);
  };
  
  return (
    <div className="homepage">
      <header className="top-navbar">
        <h2 className="logo">Job Search</h2>
        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#">Company Reviews</a>
        </nav>
      </header>
      <hr className="navbar-line" />

      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-bar">
          <span className="icon">🔍</span>
          <input
            type="text"
            placeholder="Job title, keywords, or company"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />
          <span className="icon">📍</span>
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="">Select Location</option>
            {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
          <button type="submit">Find jobs</button>
        </div>
      </form>

      <div className="results-section">
        {results.length > 0 ? results.map((job, idx) => (
          <div className="job-card" key={idx}>
            <div className="job-main">
              <h4>{job.title} | {job.location}</h4>
              <p className="company">{job.company} <span className="rating">★ {job.rating}</span></p>
              <p className="salary">{job.salary}</p>
              <div className="tags">
                <span>{job.type}</span>
                <span>{job.schedule}</span>
              </div>
              <p className="response-time">{job.responseTime}</p>
            </div>
            <button onClick={() => setSelectedJob(job)} className="apply-btn">Apply now</button>
          </div>
        )) : (
          <p>No jobs found. Try a different search.</p>
        )}
      </div>

      {selectedJob && (
        <ApplyPage job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
}

export default HomePage;
