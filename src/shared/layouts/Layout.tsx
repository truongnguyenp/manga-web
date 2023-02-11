import { useLocation } from 'react-router-dom';
import { Grid, Layout as LayoutAnt } from 'antd';
import { twMerge } from 'tailwind-merge';
import { useEffect } from 'react';
import Header from './Header';
import { PATH_URL } from '@/utils/constants';
import useTypeSafeTranslation from '@/hooks/useTypeSafeTranslation';
interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();
  const { t } = useTypeSafeTranslation();
  const hasBackground =
    pathname === PATH_URL.home || pathname === PATH_URL.signIn;

  const { md } = Grid.useBreakpoint();

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
      <image className="fixed -bottom-2 z-[5] h-[10rem] w-screen object-cover object-[48%_0]" />
      <image
        className={twMerge(
          'absolute z-[1] h-screen w-screen object-cover',
          !hasBackground && 'md:hidden'
        )}
      />
      <span
        className={twMerge(
          'fixed bottom-20 left-7 z-[6] pr-20 text-lg font-semibold text-white opacity-80',
          md &&
            'top-1/2 left-auto right-1/2 max-w-[32rem] translate-x-full -translate-y-1/3 px-0 text-[2.5rem]'
        )}
      >
        {t('quotes')}
      </span>
      <div className={twMerge('sticky top-0 z-50 transition-all duration-500')}>
        <Header />
      </div>

      <LayoutAnt.Content
        className={twMerge(
          'z-10 h-full w-full rounded-2xl p-6 md:rounded-none md:p-0',
          !hasBackground && 'md:bg-white'
        )}
      >
        {children}
      </LayoutAnt.Content>
    </LayoutAnt>
  );
}
