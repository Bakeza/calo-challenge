import React, { useState } from "react";
import JobService from "../services/JobService";

interface JobFormProps {
  onJobCreated: (jobId: string) => void;
}

const JobForm: React.FC<JobFormProps> = ({ onJobCreated }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createJob = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await JobService.createJob();
      onJobCreated(response.id);
    } catch (error) {
      console.error("Error creating job:", error);
      setError("Failed to create job. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-form">
      <button onClick={createJob} disabled={loading}>
        {loading ? "Creating..." : "Create New Job"}
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default JobForm;
