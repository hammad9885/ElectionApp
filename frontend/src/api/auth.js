import { apiRequest } from './client';

export const authAPI = {
  register: (data) => apiRequest('/auth/register', 'POST', data),
  login: (data) => apiRequest('/auth/login', 'POST', data),
  sendOtp: (phone) => apiRequest('/auth/send-otp', 'POST', { phone }),
  logout: (token) => apiRequest('/logout', 'POST', null, token),
  user: (token) => apiRequest('/user', 'GET', null, token),
};
