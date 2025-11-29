# Quick Run Guide

## To See the App in Browser (Frontend Only)

1. **Start Frontend:**
   ```powershell
   cd D:\git-busted\git-busted
   npm run dev
   ```

2. **Open Browser:**
   - Go to: `http://localhost:5173`
   - You should see the Git-Busted homepage!

3. **What Works:**
   - ✅ Navigation (Home, Check My Code, About)
   - ✅ UI displays correctly
   - ❌ "Check Code" button won't work (backend needed)

## To Use Full Functionality (Frontend + Backend)

### Terminal 1 - Backend:
```powershell
cd D:\git-busted\backend
.\run.ps1
```
Wait for: `Application startup complete.` and `Uvicorn running on http://0.0.0.0:8000`

### Terminal 2 - Frontend:
```powershell
cd D:\git-busted\git-busted
npm run dev
```
Wait for: `Local: http://localhost:5173/`

### Then:
1. Open `http://localhost:5173` in browser
2. Click "Check My Code"
3. Paste code and click "Check Code"
4. See results! 🎉

## Quick Check

- **Frontend running?** Visit `http://localhost:5173` - should see the app
- **Backend running?** Visit `http://localhost:8000/docs` - should see API docs

## Troubleshooting

**App not showing?**
- Check terminal for errors
- Try `http://127.0.0.1:5173` instead
- Make sure port 5173 isn't blocked

**"Check Code" not working?**
- Make sure backend is running on port 8000
- Check browser console (F12) for errors
- Verify backend shows "Application startup complete"

