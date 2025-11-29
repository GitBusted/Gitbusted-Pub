# Quick Start Guide

## Running Backend + Frontend Locally

### Prerequisites
- Python 3.8+ installed
- Node.js 18+ installed
- Backend repository URL

### Step 1: Clone and Setup Backend

```powershell
# From D:\git-busted directory
cd D:\git-busted
git clone <your-backend-repo-url> backend
cd backend

# Create virtual environment
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Run backend (usually on port 8000)
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Keep this terminal open!** The backend should be running at `http://localhost:8000`

### Step 2: Setup Frontend

Open a **new terminal** window:

```powershell
# Navigate to frontend
cd D:\git-busted\git-busted

# Install dependencies (if not done)
npm install

# Create .env file (copy from .env.example if it exists)
# Or create manually with:
# VITE_API_URL=http://localhost:8000

# Run frontend
npm run dev
```

The frontend should be running at `http://localhost:5173` (or another port)

### Step 3: Verify

1. Backend: Visit `http://localhost:8000/docs` - Should see FastAPI docs
2. Frontend: Visit `http://localhost:5173` - Should see your app
3. Test API: Use the browser console to test API calls

## Important Notes

### Backend CORS Configuration

Make sure your FastAPI backend allows requests from the frontend. Add this to your FastAPI `main.py`:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Using the API Utility

In your React components:

```javascript
import { api } from '../utils/api';

// Example in a component
const checkCode = async (code) => {
  try {
    const result = await api.post('/check-code', { code });
    console.log(result);
  } catch (error) {
    console.error('Error:', error.message);
  }
};
```

## Troubleshooting

**Backend not starting?**
- Check if port 8000 is in use
- Verify Python and dependencies are installed
- Check backend logs for errors

**Frontend can't connect?**
- Verify backend is running on port 8000
- Check `.env` file has correct `VITE_API_URL`
- Check browser console for CORS errors

**CORS errors?**
- Add CORS middleware to FastAPI (see above)
- Verify frontend URL is in allowed origins

