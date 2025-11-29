# How to Run the Backend

## Quick Start (Easiest)

### PowerShell:

```powershell
cd D:\git-busted\backend
.\run.ps1
```

### Command Prompt:

```cmd
cd D:\git-busted\backend
run.bat
```

## Manual Method

### Step 1: Navigate to Backend Directory

```powershell
cd D:\git-busted\backend
```

### Step 2: Activate Virtual Environment

**PowerShell:**

```powershell
.\venv\Scripts\Activate.ps1
```

**Command Prompt:**

```cmd
venv\Scripts\activate.bat
```

**Note:** If you get an execution policy error in PowerShell, run this first:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Step 3: Run the Server

```powershell
uvicorn fast:app --reload --host 0.0.0.0 --port 8000
```

## What You Should See

When the backend starts successfully, you'll see:

```
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
```

## Verify It's Working

1. **Open in browser:** `http://localhost:8000/docs`

   - You should see the FastAPI automatic documentation (Swagger UI)

2. **Or test the endpoint:** `http://localhost:8000/detect_similarity`
   - Should show method not allowed (since it's POST only)

## Important Notes

- **Keep the terminal open** - The backend must keep running
- **First run:** The backend will download `tfidf_matrix.npz` if it doesn't exist (may take a moment)
- **Model loading:** You'll see "Model loaded successfully!" when ready
- **Port 8000:** Make sure nothing else is using this port

## Troubleshooting

### "Port already in use"

- Another process is using port 8000
- Change the port: `uvicorn fast:app --reload --host 0.0.0.0 --port 8080`
- Update frontend `.env` to match: `VITE_API_URL=http://localhost:8080`

### "Module not found" or "No module named 'fastapi'"

- Virtual environment not activated
- Run: `pip install -r requirements.txt`

### "Model not loaded" error

- Check that `model.pkl` and `tfidf_vectorizer.pkl` exist in backend folder
- `tfidf_matrix.npz` will download automatically on first run

## Stop the Backend

Press `Ctrl+C` in the terminal where it's running.
