import axios from 'axios';

// Create an Axios instance with base URL
const api = axios.create({
  baseURL: 'http://147.93.103.57:5000', // 147.93.103.57:5000 Replace with your backend URL if needed
});

// Attach token from localStorage to all outgoing requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // Attach token to the request header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error responses (e.g., unauthorized)
    if (error.response?.status === 401) {
      // Redirect to login or clear token if unauthorized
      localStorage.removeItem('token');
      window.location.href = '/'; // Adjust the path as needed
    }
    return Promise.reject(error);
  }
);

export default api;
