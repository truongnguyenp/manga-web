import { getPopupContainer } from '@/configs/configTools/tools';
import Loading from '@/shared/components/common/Loading';
import '@/styles/globals.css';
import { ConfigProvider } from 'antd';
import { AppProps } from 'next/app';
import { Suspense, useState } from 'react';
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
        locale={i18nState.language as any}
      >
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
  );
}
