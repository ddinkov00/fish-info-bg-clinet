import { MutationFunction, QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';

export interface MutationRequestProps<TData, TVariables> {
  func: MutationFunction<TData, TVariables>;
  invalidateKeys?: QueryKey | QueryKey[];
}

export const useMutationRequest = <TData, TVariables>(
  request: MutationRequestProps<TData, TVariables>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: request.func,
    onSuccess: async <TResponse>(_response: TResponse) => {
      let keys = request.invalidateKeys;
      if (keys) {
        if (!Array.isArray(keys)) {
          keys = [keys];
        }

        (keys as QueryKey[]).forEach((key) => queryClient.invalidateQueries({ queryKey: key }));
      }
    },
  });
};
