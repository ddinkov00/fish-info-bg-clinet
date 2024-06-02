import { EMPTY_STRING } from '@/utils/constants';

export type EnvironmentConfig = {
  fishInfoApiBaseUrl: string;
  fishInfoApiTimeout: number;
  queryStaleTime: number;
};

const getConfig = (): EnvironmentConfig => {
  return {
    fishInfoApiBaseUrl: process.env.NEXT_PUBLIC_FISH_INFO_API_BASE_URL ?? EMPTY_STRING,
    fishInfoApiTimeout: Number(process.env.NEXT_PUBLIC_FISH_INFO_API_TIMEOUT_SECONDS) * 1000,

    queryStaleTime: Number(process.env.NEXT_PUBLIC_QUERY_STALE_TIME_SECONDS) * 1000,
  };
};

export const envConfig = getConfig();
