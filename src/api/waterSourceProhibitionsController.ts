import { fishInfoApiClient } from '@/config/axios.config';
import { useQuery } from '@tanstack/react-query';
import { Endpoints } from './endpoints';
import { WaterSourceProhibitionResponse } from './types/waterSourceProhibition';

export const getWaterSourceProhibitions = async () => {
  const response = await fishInfoApiClient.get(Endpoints.waterSourceProhibitions);
  return response.data as WaterSourceProhibitionResponse[];
};

export const useGetWaterSourceProhibitions = () => {
  return useQuery({
    queryKey: [Endpoints.waterSourceProhibitions],
    queryFn: getWaterSourceProhibitions,
  });
};
