/**
 * API utility for making requests to the FastAPI backend
 *
 * Usage:
 * import { api } from '../utils/api';
 *
 * // GET request
 * const data = await api.get('/endpoint');
 *
 * // POST request
 * const result = await api.post('/endpoint', { key: 'value' });
 *
 * // PUT request
 * const updated = await api.put('/endpoint/1', { key: 'value' });
 *
 * // DELETE request
 * await api.delete('/endpoint/1');
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const API_KEY = import.meta.env.VITE_API_KEY || "";

/**
 * Creates headers for API requests
 */
function getHeaders() {
  const headers = {
    "Content-Type": "application/json",
  };

  if (API_KEY) {
    headers["Authorization"] = `Bearer ${API_KEY}`;
    // Or if your backend uses a different format:
    // headers['X-API-Key'] = API_KEY;
  }

  return headers;
}

/**
 * Handles API response and errors
 */
async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: response.statusText || "An error occurred",
    }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  // Handle empty responses
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }
  return await response.text();
}

/**
 * API utility object with common HTTP methods
 */
export const api = {
  /**
   * GET request
   * @param {string} endpoint - API endpoint (e.g., '/users' or '/check-code')
   * @param {Object} params - Query parameters (optional)
   * @returns {Promise} Response data
   */
  async get(endpoint, params = {}) {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: getHeaders(),
    });

    return handleResponse(response);
  },

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @returns {Promise} Response data
   */
  async post(endpoint, data = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @returns {Promise} Response data
   */
  async put(endpoint, data = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  /**
   * PATCH request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @returns {Promise} Response data
   */
  async patch(endpoint, data = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @returns {Promise} Response data
   */
  async delete(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    return handleResponse(response);
  },
};

export default api;
