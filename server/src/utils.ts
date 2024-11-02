import dotenv from "dotenv";
import fs from "fs";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

interface Job {
  id: string;
  status: "pending" | "resolved" | "failed";
  result: string | null;
}

const JOBS_FILE = path.join(__dirname, "jobs.json");

const APPLICATION_ID = process.env.APPLICATION_ID;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

export function addJob(id: string): void {
  const jobs = getJobs();
  jobs.push({ id, status: "pending", result: null });
  saveJobs(jobs);
}

export function getJobs(): Job[] {
  return JSON.parse(fs.readFileSync(JOBS_FILE, "utf-8"));
}

export function getJobById(id: string): Job | undefined {
  return getJobs().find((job) => job.id === id);
}

export function updateJob(
  id: string,
  status: "pending" | "resolved" | "failed",
  result: string | null = null
): void {
  const jobs = getJobs();
  const job = jobs.find((job) => job.id === id);
  if (job) {
    job.status = status;
    job.result = result;
    saveJobs(jobs);
  }
}

function saveJobs(jobs: Job[]): void {
  fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2));
}

// Random delay between 5s and 5m
export function getRandomDelay() {
  return Math.floor(Math.random() * 12) * 5000 + 5000;
}
export async function fetchRandomImage(): Promise<string> {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&query=food`
  );

  if (!response.ok) {
    throw new Error(`Unsplash API error: ${response.status}`);
  }

  const data = (await response.json()) as { urls: { regular: string } };
  return data.urls.regular;
}
