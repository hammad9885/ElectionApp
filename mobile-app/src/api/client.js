import Constants from 'expo-constants';

const localApiUrl = 'http://192.168.110.10:8000/api/v1';

export const API_BASE_URL =
  Constants.expoConfig?.extra?.apiBaseUrl || localApiUrl;

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

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  } catch (error) {
    const message = error?.message || 'Network request failed';
    if (message.includes('CLEARTEXT') || message.includes('cleartext')) {
      throw new Error(
        'HTTP blocked on this device. Install the latest app build, or use Expo Go for testing.'
      );
    }
    throw new Error(
      `Cannot reach server at ${API_BASE_URL}. Check Wi-Fi and that backend is running. (${message})`
    );
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error(`Server returned invalid response (${response.status})`);
  }

  if (!response.ok) {
    const message = data.message || data.errors || 'Something went wrong';
    const error = new Error(typeof message === 'string' ? message : JSON.stringify(message));
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
