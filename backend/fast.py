
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import scipy.sparse
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import re
import os
import gdown

app = FastAPI()

# Add CORS middleware to allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite default port
        "http://localhost:3000",  # Alternative port
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
npz_file = "tfidf_matrix.npz"

def is_valid_npz_file(filepath):
    """Check if file is a valid npz file (not HTML)"""
    try:
        with open(filepath, 'rb') as f:
            header = f.read(100)
            # Check if it starts with HTML (common Google Drive redirect)
            if header.startswith(b'<!DOCTYPE') or header.startswith(b'<html') or header.startswith(b'<HTML'):
                return False
            # Check for npz magic bytes (PK zip format)
            if header.startswith(b'PK'):
                return True
            # Try to load it
            f.seek(0)
            np.load(filepath, allow_pickle=False)
            return True
    except:
        return False

if not os.path.exists(npz_file) or not is_valid_npz_file(npz_file):
    if os.path.exists(npz_file) and not is_valid_npz_file(npz_file):
        print("⚠️  Existing file appears to be HTML (download failed). Removing it...")
        os.remove(npz_file)
    
    print("Downloading tfidf_matrix.npz from Google Drive...")
    # Use direct download link format: https://drive.google.com/uc?id=FILE_ID
    file_id = "1z14KMJ11WA_GUwZMa9-cPXL7b7eeHcCN"
    url = f"https://drive.google.com/uc?id={file_id}"
    print(f"Downloading from: {url}")
    
    try:
        gdown.download(url, npz_file, quiet=False)
        
        # Verify the download
        if not is_valid_npz_file(npz_file):
            print("❌ Download failed - file is not a valid npz file (got HTML instead)")
            print("   Please download the file manually from Google Drive")
            print(f"   File ID: {file_id}")
            print("   Or update the download URL in fast.py")
            if os.path.exists(npz_file):
                os.remove(npz_file)
        else:
            print("✅ Download complete and verified!")
    except Exception as e:
        print(f"❌ Download failed: {e}")
        print("   Please download tfidf_matrix.npz manually and place it in the backend directory")
# Load the saved model on startup
vectorizer = None
tfidf_matrix = None
df_final = None


@app.on_event("startup")
def load_model():
    global vectorizer, tfidf_matrix, df_final

    print("🚀 Loading model...")

    # -----------------------------
    # 1) Load the vectorizer
    # -----------------------------
    try:
        with open("tfidf_vectorizer.pkl", "rb") as f:
            vectorizer = pickle.load(f)
        print("✓ Loaded vectorizer")
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to load tfidf_vectorizer.pkl — {e}"
        )

    # -----------------------------
    # 2) Load the tfidf_matrix
    # -----------------------------
    try:
        # First: assume it's a proper SciPy .npz file
        tfidf_matrix = scipy.sparse.load_npz("tfidf_matrix.npz")
        print("✓ Loaded sparse matrix using scipy.sparse.load_npz")

    except Exception as e1:
        print(f"⚠ load_npz failed: {e1}")
        print("Trying fallback: numpy load (allow_pickle=True)...")

        try:
            data = np.load("tfidf_matrix.npz", allow_pickle=True)
            print(f"✓ Fallback loaded. Keys: {data.files}")

            key = data.files[0]
            arr = data[key]

            if scipy.sparse.issparse(arr):
                tfidf_matrix = arr
            else:
                tfidf_matrix = scipy.sparse.csr_matrix(arr)

            print(f"✓ Matrix loaded from key '{key}' via numpy fallback")

        except Exception as e2:
            print(f"⚠ Numpy fallback failed: {e2}")
            print("Trying final fallback: direct pickle load...")

            try:
                with open("tfidf_matrix.npz", "rb") as f:
                    tfidf_matrix = pickle.load(f)

                if not scipy.sparse.issparse(tfidf_matrix):
                    raise ValueError("Pickled object is not a sparse matrix")

                print("✓ Loaded matrix via direct pickle fallback")

            except Exception as e3:
                raise HTTPException(
                    status_code=500,
                    detail=(
                        "Failed to load tfidf_matrix.npz\n"
                        f"load_npz() error: {e1}\n"
                        f"numpy fallback error: {e2}\n"
                        f"pickle fallback error: {e3}"
                    )
                )

    # -----------------------------
    # 3) Load the dataframe
    # -----------------------------
    try:
        df_final = pd.read_pickle("model.pkl")
        print(f"✓ Loaded dataframe with {len(df_final)} rows")

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to load model.pkl — {e}"
        )

    print("🎉 All model files loaded successfully.")



# Request model for the endpoint
class QueryRequest(BaseModel):
    query: str
    top_k: int = 10
    min_score: float = 0.5

# Preprocess function (same as in notebook)
def preprocess_code(code):
    if pd.isna(code):
        return ""
    
    code = str(code)
    code = re.sub(r"//.*", "", code)
    code = re.sub(r"/\*.*?\*/", "", code, flags=re.DOTALL)
    code = re.sub(r'"[^"]*"', '', code)
    code = re.sub(r'\s+', ' ', code)
    return code.strip()

# Language detection (updated to match notebook logic)
def detect_language(code):
    code_lower = code.lower()
    
    # More specific checks first (matching notebook logic)
    if '#include' in code_lower or 'int main' in code_lower:
        return ['C', 'C++']
    elif 'public static' in code_lower or ('class ' in code_lower and '{' in code):
        return ['Java']
    elif 'function ' in code_lower or 'const ' in code_lower or 'let ' in code_lower:
        return ['JavaScript']
    elif 'def ' in code_lower or 'import ' in code_lower or 'range(' in code_lower:
        return ['Python']
    else:
        return None

# Similarity function (FIXED for pandas/scipy compatibility)
def get_similarity(query: str, top_k: int = 10, min_score: float = 0.5):
    query_clean = preprocess_code(query)
    query_vec = vectorizer.transform([query_clean])
    
    detected_langs = detect_language(query)
    
    if detected_langs:
        mask = df_final['language'].isin(detected_langs)
        # FIX: Convert pandas Series to numpy array for scipy compatibility
        mask_array = mask.to_numpy()
        filtered_matrix = tfidf_matrix[mask_array]
        filtered_df = df_final[mask].copy()
    else:
        filtered_matrix = tfidf_matrix
        filtered_df = df_final.copy()
    
    if filtered_matrix.shape[0] == 0:
        return {"message": "No matches found"}
    
    scores = cosine_similarity(query_vec, filtered_matrix).flatten()
    
    max_score = np.max(scores)
    # High similarity threshold = plagiarism detected
    if max_score > 0.70:
        return {
            "status": "Busted", 
            "similarity_score": f"{float(max_score):.2f}", 
            "message": "High similarity detected - possible copy-paste!"
        }
    
    high_score_idx = np.where(scores >= min_score)[0]
    if len(high_score_idx) == 0:
        return {"message": f"No strong matches found (all scores < {min_score})"}
    
    top_idx = scores[high_score_idx].argsort()[-top_k:][::-1]
    top_idx = high_score_idx[top_idx]
    
    results = []
    # Get original indices from filtered dataframe
    filtered_indices = filtered_df.index.tolist()
    
    for idx in top_idx:
        # Map back to original dataframe index
        orig_idx = filtered_indices[idx]
        results.append({
            "score": f"{float(scores[idx]):.2f}",
            "language": df_final.loc[orig_idx, "language"],
        })
    
    return {
        "status": "normal", 
        "similarity_score": f"{float(max_score):.2f}", 
        "results": results
    }

# API Endpoint
@app.post("/detect_similarity")
def detect_similarity(request: QueryRequest):
    if vectorizer is None or tfidf_matrix is None or df_final is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    result = get_similarity(request.query, request.top_k, request.min_score)
    return result