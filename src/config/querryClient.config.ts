import { QueryClient } from '@tanstack/react-query';

import { envConfig } from './environment.config';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: envConfig.queryStaleTime * 1000,
    },
  },
});
