import { useLogout } from '@/shared/hooks/useLogout';
import useTypeSafeTranslation from '@/shared/hooks/useTypeSafeTranslation';
import { PATH_URL } from '@/shared/utils/constants';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
interface ProfileProps {
  className?: string;
  section?: string;
}
type ProfileItem = {
  key: string;
  label: string;
  path?: string;
  onClick?: () => void;
};
export default function ProfileTabs({ className, section }: ProfileProps) {
  const { logout } = useLogout();
  const { t } = useTypeSafeTranslation();
  const PROFILE_ITEMS: ProfileItem[] = [
    {
      key: 'account',
      label: t('button.profile'),
      path: section
        ? PATH_URL.profile.account.original
        : PATH_URL.profile.account.index,
    },
    {
      key: 'my-list',
      label: t('profile.myList'),
      path: section
        ? PATH_URL.profile.myList.original
        : PATH_URL.profile.myList.index,
    },
    {
      key: '2',
      label: t('button.logout'),
      onClick: () => {
        logout();
      },
    },
  ];
  return (
    <div className={twMerge('flex flex-col font-medium text-xl', className)}>
      {PROFILE_ITEMS.map((item) => (
        <div
          className={twMerge(
            'hover:bg-grey-primary-200 hover:bg-opacity-20 p-4 hover:border-l-4 hover:border-primary border-solid',
            section &&
              (section == item.key
                ? 'border-l-4 border-solid border-primary'
                : 'hover:border-opacity-60')
          )}
          key={item.key}
        >
          <Link
            key={item.key}
            href={String(item.path)}
            onClick={item.onClick}
            className="p-4 hover:text-primary"
          >
            {item.label}
          </Link>
        </div>
      ))}
    </div>
  );
}
