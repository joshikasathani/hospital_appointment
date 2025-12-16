const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
  },
  HOSPITALS: {
    LIST: `${API_BASE_URL}/api/hospitals`,
    REGISTER: `${API_BASE_URL}/api/hospitals/register`,
    DETAIL: (id) => `${API_BASE_URL}/api/hospitals/${id}`,
  },
  APPOINTMENTS: {
    BOOK: `${API_BASE_URL}/api/appointments/book`,
    LIST: `${API_BASE_URL}/api/appointments`,
    DETAIL: (id) => `${API_BASE_URL}/api/appointments/${id}`,
  }
};

export default API_BASE_URL;
