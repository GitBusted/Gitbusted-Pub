# Troubleshooting: App Not Running in Browser

## Quick Check

1. **Is the dev server running?**
   - You should see output like: `Local: http://localhost:5173/`
   - If not, run: `npm run dev` in the `git-busted` folder

2. **Open the correct URL:**
   - Try: `http://localhost:5173`
   - Or: `http://127.0.0.1:5173`

3. **Check browser console:**
   - Press F12 to open Developer Tools
   - Look for errors in the Console tab
   - Check the Network tab for failed requests

## Common Issues

### Blank White Page
- Check browser console for JavaScript errors
- Verify all imports are correct
- Make sure `src/main.jsx` is loading

### Port Already in Use
- If port 5173 is busy, Vite will use the next available port
- Check the terminal output for the actual port number

### CORS Errors
- Make sure the backend is running on port 8000
- Check that CORS is configured in `backend/fast.py`

### Module Not Found
- Run `npm install` to ensure all dependencies are installed
- Check that file paths in imports are correct

## Steps to Fix

1. **Stop the current server** (Ctrl+C in terminal)

2. **Clear cache and reinstall:**
   ```powershell
   cd D:\git-busted\git-busted
   rm -r node_modules
   npm install
   npm run dev
   ```

3. **Check the terminal output** - it should show:
   ```
   VITE v7.x.x  ready in xxx ms
   
   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ```

4. **Open the URL shown** in your browser

## Still Not Working?

Share the error message from:
- Browser console (F12 → Console tab)
- Terminal where `npm run dev` is running

