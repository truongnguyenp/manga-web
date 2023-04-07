import { useLogout } from '@/shared/hooks/useLogout';

const { logout } = useLogout;
const PROFILE_ITEMS: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Link href="/profile" className="text-dark-title">
        {t('button.profile')}
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <a onClick={logout} className="text-dark-title">
        {t('button.logout')}
      </a>
    ),
  },
];
const items;
