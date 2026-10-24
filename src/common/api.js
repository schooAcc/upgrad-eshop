import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dev-project-ecommerce.upgrad.dev/api/',
});

api.interceptors.request.use((config) => {
  let token = null;
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    token = user && user.token;
  } catch (error) {
    token = null;
  }
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export const getErrorMessage = (error) => {
  if (error && error.response) {
    const data = error.response.data;
    if (typeof data === 'string' && data.trim()) {
      return data;
    }
    if (data && data.message) {
      return data.message;
    }
    if (data && data.error) {
      return data.error;
    }
    if (error.response.status === 401) {
      return 'Invalid credentials. Please check your email and password.';
    }
    if (error.response.status === 403) {
      return 'You are not authorised to perform this action.';
    }
  }
  return 'Something went wrong. Please try again.';
};

export default api;
