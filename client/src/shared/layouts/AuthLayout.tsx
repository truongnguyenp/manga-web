import { Layout as LayoutAnt } from 'antd';
import { twMerge } from 'tailwind-merge';
import { useEffect } from 'react';
import useTypeSafeTranslation from '@/hooks/useTypeSafeTranslation';
interface LayoutProps {
  children?: React.ReactNode;
}
import Link from 'next/link';
export default function Layout({ children }: LayoutProps) {
  const { t } = useTypeSafeTranslation();

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
      <div
        className={twMerge('sticky top-0 z-50 transition-all duration-500 py-3 bg-black')}
      >
  <Link className="pl-4 font-medium text-primary text-4xl" href="/">
        {t('appInfo.name')}
      </Link>
      </div>
    
      <LayoutAnt.Content
        className={twMerge(
          'z-10 h-full w-full md:p-0 bg-black'
        )}
      >
        {children}
      </LayoutAnt.Content>
    </LayoutAnt>
  );
}
