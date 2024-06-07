import type { ReactElement, ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { envConfig } from '@/config/environment.config';
import { queryClient } from '@/config/querryClient.config';
import '@/styles/globals.css';
import { APIProvider } from '@vis.gl/react-google-maps';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <APIProvider apiKey={envConfig.mapsApiKey}>
        {getLayout(<Component {...pageProps} />)}
      </APIProvider>
    </QueryClientProvider>
  );
}
