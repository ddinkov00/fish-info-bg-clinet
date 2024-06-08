import { EMPTY_STRING } from '@/utils/constants';

export type EnvironmentConfig = {
  fishInfoApiBaseUrl: string;
  fishInfoApiTimeout: number;
  queryStaleTime: number;
  mapsApiKey: string;
  firebaseApiKey: string;
};

const getConfig = (): EnvironmentConfig => {
  return {
    fishInfoApiBaseUrl: process.env.NEXT_PUBLIC_FISH_INFO_API_BASE_URL ?? EMPTY_STRING,
    fishInfoApiTimeout: Number(process.env.NEXT_PUBLIC_FISH_INFO_API_TIMEOUT_SECONDS) * 1000,

    queryStaleTime: Number(process.env.NEXT_PUBLIC_QUERY_STALE_TIME_SECONDS) * 1000,

    mapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? EMPTY_STRING,

    firebaseApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? EMPTY_STRING,
  };
};

export const envConfig = getConfig();
