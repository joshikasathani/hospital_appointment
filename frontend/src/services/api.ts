import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Base API Configuration
const API_BASE_URL = 'http://localhost:8000';

// Create Axios instance with default configuration
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    
    // Handle network errors
    if (!error.response) {
      error.message = 'Network error. Please check your connection.';
    }
    
    return Promise.reject(error);
  }
);

// Generic API response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

// API Error class
export class ApiError extends Error {
  constructor(
    public message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Helper function to handle API responses
const handleResponse = <T>(response: AxiosResponse<T>): T => {
  return response.data;
};

// Helper function to handle API errors
const handleError = (error: any): never => {
  if (error.response) {
    // Server responded with error status
    throw new ApiError(
      error.response.data?.detail || error.response.data?.message || 'Server error',
      error.response.status,
      error.response.data
    );
  } else if (error.request) {
    // Network error
    throw new ApiError('Network error. Please check your connection.');
  } else {
    // Other error
    throw new ApiError(error.message || 'An unexpected error occurred.');
  }
};

export default api;
export { handleResponse, handleError };
