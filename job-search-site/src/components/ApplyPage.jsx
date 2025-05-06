import React from 'react';
import './ApplyPage.css';

function ApplyPage({ job, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Application submitted for: ${job.title} at ${job.company}`);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Apply for {job.title}</h3>
        <p><strong>Company:</strong> {job.company}</p>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Why are you a good fit?" required />
          <div className="modal-buttons">
            <button type="submit">Submit Application</button>
            <button type="button" className="cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyPage;