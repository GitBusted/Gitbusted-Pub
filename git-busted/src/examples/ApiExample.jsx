/**
 * Example component showing how to use the API utility
 * This is a reference - you can delete this file once you've implemented your API calls
 */

import React, { useState } from "react";
import { api } from "../utils/api";

export default function ApiExample() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Example: POST request to check code
      // Adjust the endpoint based on your FastAPI backend routes
      const response = await api.post("/check-code", {
        code: code,
        // Add other fields as needed by your backend
      });

      setResult(response);
    } catch (err) {
      setError(err.message || "Failed to check code");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Example: GET request (could be used to fetch data on component mount)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await api.get("/endpoint");
  //       console.log(data);
  //     } catch (err) {
  //       console.error("Error fetching data:", err);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your code here"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Checking..." : "Check Code"}
        </button>
      </form>

      {error && <div className="error">Error: {error}</div>}
      {result && <div className="result">{JSON.stringify(result, null, 2)}</div>}
    </div>
  );
}

