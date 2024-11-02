import React, { useState } from "react";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import "./styles/styles.css";

const App: React.FC = () => {
  const [jobCreated, setJobCreated] = useState<string | null>(null);

  const handleJobCreated = (jobId: string) => {
    setJobCreated(jobId);
  };

  return (
    <div className="app-container">
      <h1>Calo Job Manager</h1>
      <JobForm onJobCreated={handleJobCreated} />
      <JobList jobCreated={jobCreated} />
    </div>
  );
};

export default App;
