import {
  getConfigLocale,
  getPopupContainer,
} from '@/configs/configTools/tools';
import '@/styles/globals.css';
import { ConfigProvider } from 'antd';
import { AppProps } from 'next/app';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const { i18n: i18nState } = useTranslation();

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        getPopupContainer={getPopupContainer}
        locale={getConfigLocale(i18nState.language)}
      >
        <Component {...pageProps} />
      </ConfigProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
