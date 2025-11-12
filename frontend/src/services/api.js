import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Server responded with error
      const message = error.response.data?.error?.message || 'An error occurred';
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Request made but no response
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      // Something else happened
      return Promise.reject(new Error('An unexpected error occurred'));
    }
  }
);

// Task API functions
export const getTasks = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.status) params.append('status', filters.status);
  if (filters.priority) params.append('priority', filters.priority);
  if (filters.search) params.append('search', filters.search);
  if (filters.sortBy) params.append('sortBy', filters.sortBy);
  if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
  
  return api.get(`/tasks?${params.toString()}`);
};

export const getTask = async (id) => {
  return api.get(`/tasks/${id}`);
};

export const createTask = async (taskData) => {
  return api.post('/tasks', taskData);
};

export const updateTask = async (id, taskData) => {
  return api.put(`/tasks/${id}`, taskData);
};

export const updateTaskStatus = async (id, status) => {
  return api.patch(`/tasks/${id}/status`, { status });
};

export const deleteTask = async (id) => {
  return api.delete(`/tasks/${id}`);
};

export const deleteCompletedTasks = async () => {
  return api.delete('/tasks/completed/all');
};

// User API functions
export const getUsers = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.role) params.append('role', filters.role);
  if (filters.search) params.append('search', filters.search);
  
  return api.get(`/users?${params.toString()}`);
};

export const getUser = async (id) => {
  return api.get(`/users/${id}`);
};

export const createUser = async (userData) => {
  return api.post('/users', userData);
};

export const updateUser = async (id, userData) => {
  return api.put(`/users/${id}`, userData);
};

export const deleteUser = async (id) => {
  return api.delete(`/users/${id}`);
};

// Health check
export const checkHealth = async () => {
  return api.get('/health');
};

export default api;