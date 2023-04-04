import { Layout as LayoutAnt } from 'antd';
import { twMerge } from 'tailwind-merge';
import { useEffect } from 'react';
import Header from './Header';
import Head from 'next/head';
import { appConfig } from '@/configs/config';
import { getToken } from '@/utils/localStorage';
import { useState } from 'react';
interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(!!token);
  }, []);
  console.log(isAuthenticated);
  useEffect(() => {
    // get the cached data from localStorage when API takes too long to fetch
  }, []);

  return (
    <LayoutAnt
      className={twMerge(
        'relative z-0 flex h-screen w-screen overflow-x-hidden object-cover bg-dark-bg'
      )}
      id="layout"
    >
      <Head>
        <title>{appConfig.title}</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div className={twMerge('sticky top-0 z-50 transition-all duration-500')}>
        <Header isAuthenticated={isAuthenticated} />
      </div>

      <LayoutAnt.Content className={twMerge('z-10 h-full w-full')}>
        {children}
      </LayoutAnt.Content>
    </LayoutAnt>
  );
}
