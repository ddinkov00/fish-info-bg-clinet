import axios from 'axios';

import { handelUnauthorized } from '@/utils/authenticationHelper';
import { LocalStorageKeys } from '@/utils/constants';

import { envConfig } from './environment.config';

export const fishInfoApiClient = axios.create({
  baseURL: envConfig.fishInfoApiBaseUrl,
  timeout: envConfig.fishInfoApiTimeout,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

fishInfoApiClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem(LocalStorageKeys.refreshToken);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

fishInfoApiClient.interceptors.response.use(
  async (config) => config,
  async (error) => {
    const responseStatusCode = error.response ? error.response.status : null;
    if (responseStatusCode === 401 || responseStatusCode === 403) {
      await handelUnauthorized();
    }

    return Promise.reject(error);
  },
);
