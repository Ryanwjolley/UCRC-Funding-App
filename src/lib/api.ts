// API Service for UDMT Application
// Prefer VITE_API_BASE_URL (without trailing /api) then fallback
const rawBase = (import.meta as any).env?.VITE_API_BASE_URL || (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001';
const API_BASE_URL = rawBase.endsWith('/api') ? rawBase : `${rawBase.replace(/\/$/, '')}/api`;

// Get token from localStorage
const getToken = () => localStorage.getItem('udmt_token');

// Set token in localStorage
export const setToken = (token: string) => localStorage.setItem('udmt_token', token);

// Remove token from localStorage
export const removeToken = () => localStorage.removeItem('udmt_token');

// API request wrapper with auth
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = getToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// Authentication API
export const authAPI = {
  login: async (email: string, password: string) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setToken(data.token);
    return data;
  },

  register: async (email: string, password: string, name: string) => {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    setToken(data.token);
    return data;
  },

  getProfile: async () => {
    return apiRequest('/auth/profile');
  },

  logout: () => {
    removeToken();
  },
};

// Applications API
export const applicationsAPI = {
  getAll: async () => {
    return apiRequest('/applications');
  },

  getById: async (id: string) => {
    return apiRequest(`/applications/${id}`);
  },

  create: async (formData: any) => {
    return apiRequest('/applications', {
      method: 'POST',
      body: JSON.stringify({ form_data: formData }),
    });
  },

  update: async (id: string, formData: any, status?: string) => {
    return apiRequest(`/applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ form_data: formData, status }),
    });
  },

  submit: async (id: string) => {
    return apiRequest(`/applications/${id}/submit`, {
      method: 'POST',
    });
  },

  delete: async (id: string) => {
    return apiRequest(`/applications/${id}`, {
      method: 'DELETE',
    });
  },
};

// Admin API
export const adminAPI = {
  getAllApplications: async (status?: string) => {
    const query = status ? `?status=${status}` : '';
    return apiRequest(`/applications/admin/all${query}`);
  },
};

export default {
  auth: authAPI,
  applications: applicationsAPI,
  admin: adminAPI,
};
