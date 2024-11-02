import api from "./api";

interface Job {
  id: string;
  status: "pending" | "resolved" | "failed";
  result: string | null;
}

const JobService = {
  createJob: async (): Promise<Job> => {
    const response = await api.post<{ id: string }>("/jobs");
    return { id: response.data.id, status: "pending", result: null };
  },

  fetchJobs: async (): Promise<Job[]> => {
    const response = await api.get<Job[]>("/jobs");
    return response.data;
  },
  getJobById: async (jobId: string): Promise<Job> => {
    const response = await api.get<Job>(`/jobs/${jobId}`);
    return response.data;
  },
};

export default JobService;
