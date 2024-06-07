import Router from 'next/router';

import { login } from '@/api/identityController';
import type { LoginRequest } from '@/api/types/identity';

import { LocalStorageKeys, Routes } from './constants';

export const handleLogin = async (email: string, password: string) => {
  const request: LoginRequest = {
    email,
    password,
  };

  const loginData = await login(request);
  localStorage.setItem(LocalStorageKeys.accessToken, loginData.accessToken);
  localStorage.setItem(LocalStorageKeys.refreshToken, loginData.refreshToken);

  Router.push(Routes.home);
};
