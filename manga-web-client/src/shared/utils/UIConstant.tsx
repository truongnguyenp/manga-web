import Link from 'next/link';
import { useLogout } from '@/hooks/useLogout';
import i18n from '../i18n';

const { logout } = useLogout;

export const PROFILE_ITEMS: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Link href="/profile" className="text-dark-title">
        {i18n.t('button.profile')}
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <a onClick={logout} className="text-dark-title">
        {i18n.t('button.logout')}
      </a>
    ),
  },
];
