import axios from 'axios';

import { LocalStorageKeys, Routes } from '@/utils/constants';

import { refreshToken } from '@/api/identityController';
import Router from 'next/router';
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
    const token = localStorage.getItem(LocalStorageKeys.accessToken);
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
  async (error): Promise<any> => {
    const responseStatusCode = error.response ? error.response.status : null;
    if (responseStatusCode === 401 || responseStatusCode === 403) {
      const refreshTokenValue = localStorage.getItem(LocalStorageKeys.refreshToken);

      if (!refreshTokenValue) {
        Router.push(Routes.login);
        return;
      }

      try {
        const refreshTokenData = await refreshToken({ refreshToken: refreshTokenValue });
        localStorage.setItem(LocalStorageKeys.accessToken, refreshTokenData.accessToken);
        localStorage.setItem(LocalStorageKeys.refreshToken, refreshTokenData.refreshToken);
      } catch (_) {
        Router.push(Routes.login);
      }
    }

    Promise.reject(error);
  },
);
