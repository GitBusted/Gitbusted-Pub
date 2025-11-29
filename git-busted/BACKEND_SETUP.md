# Backend Setup Instructions

## Overview

This document explains how to set up and run the FastAPI backend locally to work with the frontend.

## Step-by-Step Setup

### 1. Clone the Backend Repository

From your project root (`D:\git-busted`), clone the backend:

```powershell
cd D:\git-busted
git clone <YOUR_BACKEND_GITHUB_URL> backend
```

Replace `<YOUR_BACKEND_GITHUB_URL>` with the actual GitHub URL.

### 2. Navigate to Backend Directory

```powershell
cd backend
```

### 3. Create Python Virtual Environment

**Windows PowerShell:**

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**Windows CMD:**

```cmd
python -m venv venv
venv\Scripts\activate.bat
```

**Note:** If you get an execution policy error in PowerShell, run:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 4. Install Dependencies

```powershell
pip install -r requirements.txt
```

If `requirements.txt` doesn't exist, install FastAPI and uvicorn:

```powershell
pip install fastapi uvicorn[standard]
```

### 5. Configure Environment Variables (if needed)

Check if the backend has a `.env.example` file. If so, copy it:

```powershell
copy .env.example .env
```

Then edit `.env` with your local settings. Common variables:

- `DATABASE_URL` - Database connection string
- `SECRET_KEY` - Secret key for JWT/sessions
- `API_KEY` - API key if required
- `DEBUG=True` - Enable debug mode

### 6. Run the Backend

```powershell
# Standard FastAPI command
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Alternative commands** (depending on your backend structure):

```powershell
# If main file is app.py
uvicorn app:app --reload --host 0.0.0.0 --port 8000

# If there's a custom run script
python main.py

# If using a different port
uvicorn main:app --reload --host 0.0.0.0 --port 8080
```

### 7. Verify Backend is Running

Open your browser and visit:

- **API Documentation:** `http://localhost:8000/docs` (Swagger UI)
- **Alternative Docs:** `http://localhost:8000/redoc`
- **Health Check:** `http://localhost:8000/` or `http://localhost:8000/health`

You should see the FastAPI automatic documentation interface.

## CORS Configuration (Important!)

Your FastAPI backend **must** allow requests from the frontend. Add this to your backend's main file (usually `main.py` or `app.py`):

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite default port
        "http://localhost:3000",  # Alternative port
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],   # Allows all headers
)
```

## Common Backend File Structure

```
backend/
├── main.py              # Main FastAPI application
├── app.py              # Alternative main file name
├── requirements.txt    # Python dependencies
├── .env               # Environment variables (not in git)
├── .env.example       # Example environment variables
├── models/            # Database models
├── routers/           # API route handlers
├── schemas/           # Pydantic schemas
└── README.md          # Backend-specific documentation
```

## Troubleshooting

### Port Already in Use

If port 8000 is already in use:

```powershell
# Check what's using the port (Windows)
netstat -ano | findstr :8000

# Use a different port
uvicorn main:app --reload --host 0.0.0.0 --port 8080
```

### Module Not Found Errors

```powershell
# Make sure virtual environment is activated
# Reinstall dependencies
pip install -r requirements.txt
```

### Database Connection Issues

- Check `.env` file has correct `DATABASE_URL`
- Ensure database is running (if using PostgreSQL/MySQL)
- For SQLite, ensure the database file path is correct

### Import Errors

- Make sure you're in the backend directory
- Verify the main file name matches (main.py vs app.py)
- Check Python path and virtual environment

## Next Steps

Once the backend is running:

1. Keep the terminal open (backend must stay running)
2. Open a new terminal for the frontend
3. Follow the frontend setup in `QUICK_START.md`
4. Test the connection between frontend and backend

## Backend API Endpoints

After starting the backend, check `http://localhost:8000/docs` to see all available endpoints. Common endpoints might include:

- `GET /` - Root/health check
- `POST /check-code` - Check code (example)
- `GET /users` - Get users
- `POST /users` - Create user
- etc.

Adjust your frontend API calls based on the actual endpoints in your backend.
