import React, { useState } from "react";
import { Link } from "react-router";
import { api } from "./utils/api";

export default function CheckMyCode() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckCode = async () => {
    if (!code.trim()) {
      setError("Please paste some code to check");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await api.post("/detect_similarity", {
        query: code,
        top_k: 10,
        min_score: 0.5,
      });

      setResult(response);
    } catch (err) {
      setError(
        err.message || "Failed to check code. Make sure the backend is running."
      );
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-black m-0 min-h-screen text-white relative flex flex-col main-font">
        {/* NAVBAR */}
        <nav className="w-full py-8 flex justify-center items-center relative">
          {/* GitHub Icon (top-right) */}
          <img
            src="/github-brands-solid-full.webp" // from /public
            alt="github"
            className="w-12 absolute right-10  opacity-80 hover:opacity-100 duration-200 cursor-pointer rounded-xl"
          />

          {/* Centered Nav Items */}
          <ul className="flex gap-10 text-xl font-semibold">
            <Link to="/">
              {" "}
              <li className="cursor-pointer hover:opacity-80 duration-200">
                Home
              </li>
            </Link>
            <Link to="/CheckMyCode">
              <li className="cursor-pointer hover:opacity-80 duration-200">
                Check My Code
              </li>
            </Link>
            <Link to="/About">
              <li className="cursor-pointer hover:opacity-80 duration-200">
                About
              </li>
            </Link>
          </ul>
        </nav>

        <div className="text-container flex flex-col mx-4 justify-center text-center">
          <label className="mb-5 text-2xl">Paste your Code here 💻</label>
          <div className="w-full p-6 rounded-xl shadow-2xl transition duration-300  backdrop-blur-lg border border-white/20">
            <textarea
              className="w-full h-64 p-4 text-base font-mono bg-gray-800/30  backdrop-blur-lg border border-gray-700 rounded-lg resize-none"
              id="code-input"
              placeholder="Paste your code snippet here ! "
              value={code}
              onChange={(e) => setCode(e.target.value)}
            ></textarea>
            <button
              onClick={handleCheckCode}
              disabled={loading}
              className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition duration-200"
            >
              {loading ? "Checking..." : "Check Code"}
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
              <p className="font-semibold">Error:</p>
              <p>{error}</p>
            </div>
          )}

          {/* Result Display */}
          {result && (
            <div className="mt-4 p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Results:</h3>
              {result.status === "Busted" ? (
                <div className="bg-red-900/30 border border-red-500 rounded-lg p-4">
                  <p className="text-red-300 font-bold text-2xl mb-2">
                    ⚠️ {result.status}!
                  </p>
                  <p className="text-red-200">{result.message}</p>
                  <p className="text-red-300 mt-2">
                    Similarity Score: {result.similarity_score}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-green-300 mb-2">
                    Status: {result.status || "Normal"}
                  </p>
                  <p className="text-gray-300 mb-4">
                    Similarity Score: {result.similarity_score}
                  </p>
                  {result.results && result.results.length > 0 && (
                    <div className="mt-4">
                      <p className="text-gray-400 mb-2">Top Matches:</p>
                      <div className="space-y-2">
                        {result.results.map((item, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-800/50 p-2 rounded text-left"
                          >
                            <span className="text-blue-300">
                              Score: {item.score}
                            </span>
                            {item.language && (
                              <span className="ml-4 text-purple-300">
                                Language: {item.language}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {result.message && (
                    <p className="text-gray-400 mt-4">{result.message}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
