import Loading from '@/shared/components/common/Loading';
import '@/styles/globals.css';
import { ConfigProvider } from 'antd';
import { AppProps } from 'next/app';
import { Suspense, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import i18n from '@/shared/i18n/index';
export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const { i18n: i18nState } = useTranslation();

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider locale={i18nState.language as any}>
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <Loading />
              </div>
            }
          >
            <Component {...pageProps} />
          </Suspense>
        </ConfigProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </I18nextProvider>
  );
}
