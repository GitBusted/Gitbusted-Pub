# Local Development Setup Guide

This guide will help you set up and run both the frontend and FastAPI backend locally.

## Prerequisites

- Node.js (v18 or higher) - for frontend
- Python 3.8+ - for FastAPI backend
- Git - to clone the backend repository

## Step 1: Backend Setup (FastAPI)

### 1.1 Clone the Backend Repository

```bash
# Navigate to your project directory (outside the frontend folder)
cd D:\git-busted
git clone <your-backend-github-url> backend
```

Replace `<your-backend-github-url>` with the actual GitHub URL of your FastAPI backend.

### 1.2 Navigate to Backend Directory

```bash
cd backend
```

### 1.3 Create a Virtual Environment

**Windows (PowerShell):**

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**Windows (Command Prompt):**

```cmd
python -m venv venv
venv\Scripts\activate.bat
```

**Linux/Mac:**

```bash
python3 -m venv venv
source venv/bin/activate
```

### 1.4 Install Dependencies

```bash
pip install -r requirements.txt
```

If there's no `requirements.txt`, you'll need to install FastAPI and uvicorn:

```bash
pip install fastapi uvicorn[standard]
```

### 1.5 Check Backend Configuration

Look for these files in the backend:

- `main.py` or `app.py` - main FastAPI application
- `.env` or `.env.example` - environment variables
- `requirements.txt` - Python dependencies

### 1.6 Set Up Environment Variables (if needed)

If the backend uses environment variables, create a `.env` file in the backend directory:

```bash
# Example .env file (adjust based on your backend needs)
DATABASE_URL=sqlite:///./app.db
SECRET_KEY=your-secret-key-here
API_KEY=your-api-key-here
```

### 1.7 Run the Backend

```bash
# Option 1: Using uvicorn directly
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Option 2: If there's a run script
python main.py

# Option 3: If using a custom command
# Check the backend README for specific instructions
```

The backend should now be running at: `http://localhost:8000`

You can verify it's working by visiting:

- `http://localhost:8000/docs` - FastAPI automatic documentation (Swagger UI)
- `http://localhost:8000/redoc` - Alternative API documentation

## Step 2: Frontend Setup

### 2.1 Navigate to Frontend Directory

```bash
cd D:\git-busted\git-busted
```

### 2.2 Install Dependencies (if not already done)

```bash
npm install
```

### 2.3 Configure Environment Variables

Create a `.env` file in the frontend root directory (`git-busted/.env`):

```env
VITE_API_URL=http://localhost:8000
VITE_API_KEY=your-api-key-if-needed
```

### 2.4 Update Vite Configuration

The `vite.config.js` has been updated to proxy API requests to the backend during development.

### 2.5 Run the Frontend

```bash
npm run dev
```

The frontend should now be running at: `http://localhost:5173` (or another port if 5173 is busy)

## Step 3: Verify the Connection

1. **Backend is running**: Visit `http://localhost:8000/docs` to see the API documentation
2. **Frontend is running**: Visit `http://localhost:5173` (or the port shown in terminal)
3. **Test API connection**: The frontend should now be able to make API calls to the backend

## Common Issues & Solutions

### Backend won't start

- Check if port 8000 is already in use: `netstat -ano | findstr :8000` (Windows)
- Change the port in the uvicorn command: `--port 8080`
- Make sure all dependencies are installed: `pip install -r requirements.txt`

### Frontend can't connect to backend

- Verify backend is running on `http://localhost:8000`
- Check CORS settings in the FastAPI backend (should allow `http://localhost:5173`)
- Verify the `.env` file has the correct `VITE_API_URL`

### CORS Errors

If you see CORS errors in the browser console, add this to your FastAPI backend:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Running Both Services

### Option 1: Two Terminal Windows

- Terminal 1: Run the backend (`uvicorn main:app --reload`)
- Terminal 2: Run the frontend (`npm run dev`)

### Option 2: Use a Process Manager

You can use tools like:

- `concurrently` (npm package) - run both from one command
- `pm2` - process manager for Node.js
- VS Code tasks - configure tasks to run both

## Next Steps

1. Implement API calls in your React components using the `src/utils/api.js` utility
2. Update `CheckMyCode.jsx` to fetch data from the backend
3. Test the full flow: Frontend → Backend → Database

## API Utility Usage

The frontend now includes an API utility (`src/utils/api.js`) that you can use:

```javascript
import { api } from "../utils/api";

// GET request
const data = await api.get("/endpoint");

// POST request
const result = await api.post("/endpoint", { data: "value" });
```
