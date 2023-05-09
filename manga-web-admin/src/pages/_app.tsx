import '@/styles/globals.css';
import { ConfigProvider } from 'antd';
import { AppProps } from 'next/app';
import { useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@/configs/theme/index.less';
import i18n from '@/shared/i18n/index';
import {
  BUTTON,
  IMAGE,
  INPUT,
  MODAL,
  SELECT,
  TABLE,
} from '@/configs/theme/antd-theme';
export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const { i18n: i18nState } = useTranslation();

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          locale={i18nState.language as any}
          theme={{
            token: {
              colorTextBase: 'rgb(255 255 255)',
            },
            components: {
              ['Button']: BUTTON,
              ['Image']: IMAGE,
              ['Input']: INPUT,
              ['Select']: SELECT,
              ['Table']: TABLE,
              ['Modal']: MODAL,
            },
          }}
        >
          <Component {...pageProps} />
        </ConfigProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
}
