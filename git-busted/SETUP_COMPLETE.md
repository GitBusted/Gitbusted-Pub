# ✅ Setup Complete!

Your backend and frontend are now configured to work together locally.

## What Was Done

### Backend Setup ✅
- ✅ Created Python virtual environment
- ✅ Installed all dependencies from `requirements.txt`
- ✅ Updated CORS configuration for local development
- ✅ Created startup scripts (`run.bat` and `run.ps1`)
- ✅ Verified model files are present

### Frontend Setup ✅
- ✅ Updated `CheckMyCode.jsx` to connect to the backend API
- ✅ Integrated API utility for making requests
- ✅ Added error handling and result display

## How to Run Everything

### Step 1: Start the Backend

Open a terminal and run:

**PowerShell:**
```powershell
cd D:\git-busted\backend
.\run.ps1
```

**Or Command Prompt:**
```cmd
cd D:\git-busted\backend
run.bat
```

**Or manually:**
```powershell
cd D:\git-busted\backend
.\venv\Scripts\Activate.ps1
uvicorn fast:app --reload --host 0.0.0.0 --port 8000
```

The backend will start at: `http://localhost:8000`

**Verify it's working:** Visit `http://localhost:8000/docs` to see the API documentation.

### Step 2: Start the Frontend

Open a **new terminal** and run:

```powershell
cd D:\git-busted\git-busted
npm run dev
```

The frontend will start at: `http://localhost:5173` (or another port if 5173 is busy)

### Step 3: Test It!

1. Open `http://localhost:5173` in your browser
2. Navigate to "Check My Code"
3. Paste some code in the textarea
4. Click "Check Code"
5. See the results!

## Backend API Endpoint

The backend exposes one main endpoint:

**POST `/detect_similarity`**
- **Request Body:**
  ```json
  {
    "query": "your code here",
    "top_k": 10,        // optional, default: 10
    "min_score": 0.5    // optional, default: 0.5
  }
  ```
- **Response:**
  ```json
  {
    "status": "Busted" | "normal",
    "similarity_score": "0.85",
    "message": "...",
    "results": [...]  // if status is "normal"
  }
  ```

## Important Notes

1. **Model Files**: The backend will automatically download `tfidf_matrix.npz` if it doesn't exist on first run (this may take a moment).

2. **CORS**: The backend is configured to allow requests from:
   - `http://localhost:5173` (Vite default)
   - `http://localhost:3000` (alternative)
   - `http://127.0.0.1:5173`
   - `http://127.0.0.1:3000`

3. **Environment Variables**: If you need to change the API URL, create a `.env` file in the frontend directory:
   ```
   VITE_API_URL=http://localhost:8000
   ```

## Troubleshooting

### Backend won't start
- Make sure port 8000 is not in use
- Verify virtual environment is activated
- Check that all dependencies are installed: `pip install -r requirements.txt`

### Frontend can't connect
- Verify backend is running on `http://localhost:8000`
- Check browser console for CORS errors
- Verify `.env` file has correct `VITE_API_URL`

### Model loading errors
- The backend will download `tfidf_matrix.npz` automatically if missing
- Make sure `model.pkl` and `tfidf_vectorizer.pkl` are in the backend directory

## Next Steps

- Test the plagiarism detection with different code samples
- Customize the UI in `CheckMyCode.jsx`
- Add more features to the frontend
- Deploy both services when ready!

Enjoy coding! 🚀

