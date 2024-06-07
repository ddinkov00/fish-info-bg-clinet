import { useQuery } from '@tanstack/react-query';

import { fishInfoApiClient } from '@/config/axios.config';

import { Endpoints } from './endpoints';
import type { CloseSeasonsResponse } from './types/closeSeasons';

export const getCloseSeasons = async () => {
  const response = await fishInfoApiClient.get(Endpoints.closeSeasons);
  return response.data as CloseSeasonsResponse;
};

export const useGetCloseSeasons = () => {
  return useQuery({ queryKey: [Endpoints.closeSeasons], queryFn: getCloseSeasons });
};
