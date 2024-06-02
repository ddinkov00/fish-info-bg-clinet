import Router from 'next/router';

import { login, refreshToken } from '@/api/identityController';
import { LoginRequest } from '@/api/types/identity';

import { LocalStorageKeys, Routes } from './constants';

export const handelUnauthorized = async () => {
  const refreshTokenValue = localStorage.getItem(LocalStorageKeys.refreshToken);

  if (!refreshTokenValue) {
    Router.push(Routes.login);
    return;
  }

  try {
    const refreshTokenData = await refreshToken({ refreshToken: refreshTokenValue });
    localStorage.setItem(LocalStorageKeys.accessToken, refreshTokenData.accessToken);
    localStorage.setItem(LocalStorageKeys.refreshToken, refreshTokenData.refreshToken);
  } catch (error) {
    Router.push(Routes.login);
  }
};

export const handleLogin = async (email: string, password: string) => {
  const request: LoginRequest = {
    email: email,
    password: password,
  };

  const loginData = await login(request);
  localStorage.setItem(LocalStorageKeys.accessToken, loginData.accessToken);
  localStorage.setItem(LocalStorageKeys.refreshToken, loginData.refreshToken);

  Router.push(Routes.login);
};
