import axios from 'axios';
import Cookies from 'js-cookie';

// Base API configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://api.neo.tecnvais.com/api/v1/', 
  
  // baseURL: process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000/api/v1/', 
  headers: { 'Content-Type': 'application/json' },
});

// Function to handle logout
export const handleLogout = () => {
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
  window.location.href = '/login2';
};

// Request Interceptor (Attach Token)
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Handle Token Expiry)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log('Access token expired, attempting refresh...');
      const refreshToken = Cookies.get('refresh_token');

      if (!refreshToken) {
        console.log('No refresh token found, logging out...');
        handleLogout();
        return Promise.reject(error);
      }

      try {
        // Refresh Token Request
        const refreshResponse = await axios.post(
          // `${process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000/api/v1/'}token/users/refresh/`,

          `${process.env.REACT_APP_API_BASE_URL || 'https://api.neo.tecnvais.com/api/v1/'}token/users/refresh/`,
          { refresh: refreshToken }
        );

        const newAccessToken = refreshResponse.data.access;
        Cookies.set('access_token', newAccessToken, { expires: 1, secure: true, sameSite: 'Strict' });

        // Clone and Retry the Original Request
        const originalRequest = { ...error.config };
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.log('Token refresh failed, logging out...');
        handleLogout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
