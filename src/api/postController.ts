import { fishInfoApiClient } from '@/config/axios.config';
import { useMutation } from '@tanstack/react-query';
import { Endpoints } from './endpoints';
import { PostPostRequest } from './types/posts';

export const postPost = async (data: PostPostRequest) => {
  await fishInfoApiClient.post(Endpoints.post, data);
};

export const usePostPost = () => {
  return useMutation({
    mutationFn: async (data: PostPostRequest) => await postPost(data),
    mutationKey: [Endpoints.post],
  });
};
