import Constants from 'expo-constants';

const localApiUrl = 'http://192.168.110.10:8000/api/v1';
const REQUEST_TIMEOUT_MS = 15000;

export const API_BASE_URL =
  Constants.expoConfig?.extra?.apiBaseUrl || localApiUrl;

function formatApiError(data, fallback = 'Something went wrong') {
  if (data?.errors && typeof data.errors === 'object') {
    const firstError = Object.values(data.errors).flat()[0];
    if (firstError) {
      return firstError;
    }
  }

  if (typeof data?.message === 'string' && data.message) {
    return data.message;
  }

  return fallback;
}

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

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  options.signal = controller.signal;

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error(
        'Server is not responding. Start backend and check Wi-Fi connection.'
      );
    }

    const message = error?.message || 'Network request failed';
    if (message.includes('CLEARTEXT') || message.includes('cleartext')) {
      throw new Error(
        'HTTP blocked on this device. Install the latest app build.'
      );
    }
    throw new Error(
      `Cannot reach server. Check Wi-Fi and backend. (${message})`
    );
  } finally {
    clearTimeout(timeoutId);
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error(`Server returned invalid response (${response.status})`);
  }

  if (!response.ok) {
    const error = new Error(formatApiError(data));
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
