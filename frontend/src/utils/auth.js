// Simple auth utilities for role-based access
export const getCurrentUser = () => {
  const token = localStorage.getItem('access_token');
  if (!token) return null;
  
  try {
    // Simple JWT decode (for demo purposes)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.sub,
      role: payload.role
    };
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('access_token');
};
