import cors from "cors";
import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  addJob,
  fetchRandomImage,
  getJobById,
  getJobs,
  getRandomDelay,
  updateJob,
} from "./utils.js";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.post("/jobs", async (req: Request, res: Response): Promise<void> => {
  const jobId = uuidv4();
  addJob(jobId);
  res.status(201).json({ id: jobId });

  setTimeout(async () => {
    try {
      const imageUrl = await fetchRandomImage();
      updateJob(jobId, "resolved", imageUrl);
    } catch (error) {
      console.error("Job execution failed:", error);
      updateJob(jobId, "failed");
    }
  }, getRandomDelay());
});

app.get("/jobs", (req: Request, res: Response): void => {
  const jobs = getJobs();
  res.json(jobs);
});

app.get("/jobs/:jobId", (req: Request, res: Response): void => {
  const job = getJobById(req.params.jobId);
  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }
  res.json(job);
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
