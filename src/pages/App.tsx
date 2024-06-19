import { envConfig } from '@/config/environment.config';
import { queryClient } from '@/config/querryClient.config';
import { QueryClientProvider } from '@tanstack/react-query';
import { APIProvider } from '@vis.gl/react-google-maps';
import { AppPropsWithLayout } from './_app';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <APIProvider apiKey={envConfig.mapsApiKey}>
        {getLayout(<Component {...pageProps} />)}
      </APIProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
