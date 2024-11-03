# Calo Challenge

## Project Overview

This project involves creating a fullstack application with a backend service and a frontend client. The backend will provide endpoints for creating and managing jobs that retrieve random images from the Unsplash API, while the frontend will allow users to interact with these jobs. Each job simulates network delays and other challenges that mimic real-world conditions.

---

### Features

#### Backend API Endpoints
- **`POST /jobs`**: Creates a new job and returns its unique ID.
- **`GET /jobs`**: Retrieves a list of all jobs with their statuses.
- **`GET /jobs/{id}`**: Fetches details for a specific job by ID.

#### Frontend Client
- Displays a list of all jobs with their statuses.
- Enables users to create new jobs with ease.
- Automatically fetches and updates the UI with job results once resolved.
- Provides job details upon clicking on a job card for more information.

---

### Setup Instructions

1. **Clone the Repository**
   Clone the project repository to get started on both backend and frontend components.

   ```bash
   git clone https://github.com/Bakeza/calo-challenge.git
   cd calo-challenge
   ```

2. **Running the Application from the Root Directory**
   You can start both the backend server and the frontend client simultaneously from the root directory.

   ```bash
   # Start the server (backend)
   npm run start-server

   # Start the client (frontend)
   npm run start-client
   ```

3. **Detailed Setup (Optional)**
   For separate setups of the backend and frontend, follow these steps:

   #### Backend
   - **Create a `.env` File**
     In the `server` folder, create a `.env` file and add your Unsplash API access key.
     ```bash
     ACCESS_KEY=your_unsplash_access_key
     ```
   - **Install Dependencies & Start the Server**
     Run the following commands to install necessary packages and start the server.
     ```bash
     cd server
     npm install
     npm run dev
     ```

   #### Frontend
   - **Navigate to the Frontend Directory**
     Move into the `client` folder.
     ```bash
     cd ../client
     ```
   - **Install Dependencies & Start the Client**
     Run the following to set up and start the frontend client.
     ```bash
     npm install
     npm start
     ```

---

### Time Report

| Task                    | Time Spent (Hours) |
|-------------------------|--------------------|
| Project Setup           | 1                 |
| Backend Development     | 3                 |
| Frontend Development    | 3                 |
| Testing and Debugging   | 2                 |
| **Total**               | **9**             |

---

### Resources
- [Unsplash API Documentation](https://source.unsplash.com/)

---
