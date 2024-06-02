import { fishInfoApiClient } from '@/config/axios.config';

import { Endpoints } from './endpoints';
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
} from './types/identity';

export const login = async (data: LoginRequest) => {
  const response = await fishInfoApiClient.post(Endpoints.login, data);
  return response.data as LoginResponse;
};

export const register = async (data: RegisterRequest) => {
  await fishInfoApiClient.post(Endpoints.register, data);
};

export const refreshToken = async (data: RefreshTokenRequest) => {
  const response = await fishInfoApiClient.post(Endpoints.refreshToken, data);
  return response.data as RefreshTokenResponse;
};
