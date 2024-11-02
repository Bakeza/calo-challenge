import React, { useEffect, useState } from "react";
import JobService from "../services/JobService";

interface Job {
  id: string;
  status: "pending" | "resolved" | "failed";
  result: string | null;
}

interface JobDetails {
  id: string;
  status: string;
  result: string | null;
  // Add other details you expect from the job object here
}

interface JobListProps {
  jobCreated: string | null;
}

const JobList: React.FC<JobListProps> = ({ jobCreated }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await JobService.fetchJobs();
        setJobs(response);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    const intervalId = setInterval(fetchJobs, 5000);
    fetchJobs();

    return () => clearInterval(intervalId);
  }, [jobCreated]);

  const handleJobClick = async (jobId: string) => {
    if (jobDetails && jobDetails.id === jobId) {
      // If the clicked job is already shown, hide details
      setJobDetails(null);
    } else {
      // Fetch the job details
      try {
        const response = await JobService.getJobById(jobId);
        setJobDetails(response);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Could not fetch job details.");
        setJobDetails(null); // Clear previous details on error
      }
    }
  };

  return (
    <div className="job-list">
      <h2>Job List</h2>
      {error && <p className="error">{error}</p>}
      <ul className="job-list-items">
        {jobs.map((job) => (
          <li
            key={job.id}
            className={`job-item ${job.status}`}
            onClick={() => handleJobClick(job.id)}
          >
            {jobDetails && jobDetails.id === job.id && (
              <div className="job-details">
                {/* Add any additional job details here */}
                <p>Job ID: {jobDetails.id}</p>
                <p>Status: {jobDetails.status}</p>
                {/* Display more details as needed */}
              </div>
            )}
            {job.result && (
              <img
                src={job.result}
                alt="Random food from Unsplash"
                className="job-image"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
