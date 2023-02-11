import { useLocation } from 'react-router-dom';
import { Grid, Layout as LayoutAnt } from 'antd';
import { twMerge } from 'tailwind-merge';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import Header from './Header';
import Image from '#/shared/components/common/Image';
import backgroundImage from '#/assets/images/background-layout.png';
import backgroundImageMobile from '#/assets/images/background-layout-mobile.png';
import {
  getCaseName,
  getContactData,
  getEmail,
  setContactData,
} from '#/shared/utils/localStorage';
import { useMeQuery } from '#/generated/schemas';
import { inboxVar, contactDataVar } from '#/graphql/cache';
import {
  PATH_URL,
  REFETCH_GET_ME_INTERVAL_TIME,
} from '#/shared//utils/constant';
import { useScrollDirection } from '#/shared/hooks/useScrollDirection';
import Wave from '#/assets/images/wave.png';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { getContactApi } from '#/api/contact';
import { SectionId } from '#/shared/utils/type';

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const email = getEmail();
  const caseName = getCaseName();
  const { pathname } = useLocation();
  const { t } = useTypeSafeTranslation();
  const hasBackground =
    pathname === PATH_URL.home || pathname === PATH_URL.signIn;

  const { md } = Grid.useBreakpoint();

  const scrollDirection = useScrollDirection();

  useEffect(() => {
    // get the cached data from localStorage when API takes too long to fetch
    const contactData = getContactData();

    if (contactData) {
      contactDataVar(JSON.parse(contactData));
    }
  }, []);

  useMeQuery({
    fetchPolicy: 'network-only',
    onCompleted(data) {
      inboxVar({ ...data.me });
    },
    onError() {
      window.navigator.onLine && inboxVar({});
    },
    pollInterval: REFETCH_GET_ME_INTERVAL_TIME,
    skip: !email || !caseName,
    variables: {
      email: String(email),
      username: String(caseName),
    },
  });

  useQuery({
    enabled: !!email && !!caseName,
    onSettled(data) {
      if (data) {
        contactDataVar(data.data);
        setContactData(data.data);
      }
    },
    queryFn: () =>
      getContactApi({ email: String(email), name: String(caseName) }),
    queryKey: [SectionId.Contacts],
  });

  return (
    <LayoutAnt
      className={twMerge(
        'relative z-0 flex h-screen w-screen overflow-x-hidden object-cover',
      )}
      id="layout"
    >
      <Image
        className="fixed -bottom-2 z-[5] h-[10rem] w-screen object-cover object-[48%_0]"
        src={Wave}
      />
      <Image
        className={twMerge(
          'absolute z-[1] h-screen w-screen object-cover',
          !hasBackground && 'md:hidden',
        )}
        src={md ? backgroundImage : backgroundImageMobile}
      />
      <span
        className={twMerge(
          'fixed bottom-20 left-7 z-[6] pr-20 text-lg font-semibold text-white opacity-80',
          md &&
            'top-1/2 left-auto right-1/2 max-w-[32rem] translate-x-full -translate-y-1/3 px-0 text-[2.5rem]',
        )}
      >
        {t('quotes')}
      </span>
      <div
        className={twMerge(
          'sticky top-0 z-50 transition-all duration-500',
          scrollDirection === 'down' && '-top-32',
        )}
      >
        <Header />
      </div>

      <LayoutAnt.Content
        className={twMerge(
          'z-10 h-full w-full rounded-2xl p-6 md:rounded-none md:p-0',
          !hasBackground && 'md:bg-white',
        )}
      >
        {children}
      </LayoutAnt.Content>
    </LayoutAnt>
  );
}
