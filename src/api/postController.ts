import { fishInfoApiClient } from '@/config/axios.config';
import { useMutationRequest } from '@/hooks/useMutationRequest';
import { useQuery } from '@tanstack/react-query';
import { Endpoints } from './endpoints';
import { GetPostResponse, PostPostRequest } from './types/posts';

export const postPost = async (data: PostPostRequest) => {
  await fishInfoApiClient.post(Endpoints.post, data);
};

export const getPosts = async (): Promise<GetPostResponse[]> => {
  const response = await fishInfoApiClient.get(Endpoints.post);
  return response.data;
};

export const usePostPost = () => {
  return useMutationRequest({
    func: async (data: PostPostRequest) => await postPost(data),
    invalidateKeys: [Endpoints.post],
  });
};

export const useGetPosts = () => {
  return useQuery({
    queryKey: [Endpoints.post],
    queryFn: getPosts,
  });
};
