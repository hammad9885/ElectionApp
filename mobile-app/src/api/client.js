// Backend API base URL
// Android emulator: http://10.0.2.2:8000
// iOS simulator:   http://localhost:8000
// Real device:     http://<YOUR-COMPUTER-LAN-IP>:8000
//
// IMPORTANT: For testing on a real phone (Expo Go), the backend must be
// reachable from the phone over your Wi-Fi. Set this to your PC's LAN IP.
// Example: 'http://192.168.100.5:8000/api/v1'

export const API_BASE_URL = 'http://192.168.110.10:8000/api/v1';

export async function apiRequest(endpoint, method = 'GET', body = null, token = null) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  const data = await response.json();

  if (!response.ok) {
    const message = data.message || data.errors || 'Something went wrong';
    const error = new Error(typeof message === 'string' ? message : JSON.stringify(message));
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
