import { apiRequest } from './client';

export const formsAPI = {
  submit(formData) {
    return apiRequest('/forms/submit', 'POST', formData);
  },
};
