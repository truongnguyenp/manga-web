import { Layout as LayoutAnt } from 'antd';
import { twMerge } from 'tailwind-merge';
import { useEffect } from 'react';
import Header from './Header';
import useTypeSafeTranslation from '@/hooks/useTypeSafeTranslation';
interface LayoutProps {
  children?: React.ReactNode;
  isSignInLayout: boolean;
}

export default function Layout({
  children,
  isSignInLayout = false,
}: LayoutProps) {
  useEffect(() => {
    // get the cached data from localStorage when API takes too long to fetch
  }, []);

  return (
    <LayoutAnt
      className={twMerge(
        'relative z-0 flex h-screen w-screen overflow-x-hidden object-cover'
      )}
      id="layout"
    >
      <div className={twMerge('sticky top-0 z-50 transition-all duration-500')}>
        {!isSignInLayout && <Header />}
      </div>

      <LayoutAnt.Content
        className={twMerge(
          'z-10 h-full w-full rounded-2xl p-6 md:rounded-none md:p-0'
        )}
      >
        {children}
      </LayoutAnt.Content>
    </LayoutAnt>
  );
}
