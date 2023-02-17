import { useTranslation } from 'react-i18next';
import LanguageSelector from '@/components/selector/LanguageSelector';
import { setLocale } from '../utils/locale';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useTypeSafeTranslation from '@/hooks/useTypeSafeTranslation';
import { Button, Dropdown, Input, Typography, MenuProps } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import AvatarOutlinedSVG from '@/assets/svgs/avatar-outlined.svg';

export default function Header() {
  const { replace } = useRouter();
  const { t } = useTypeSafeTranslation();
  const { i18n } = useTranslation();
  const onChangeLanguage = (value: string) => {
    i18n.changeLanguage(value || 'en');
    setLocale(value || 'en');
  };
  const PROFILE_ITEMS: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="">
          {t('button.logout')}
        </a>
      ),
    },
  ];
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="">
          1st menu item
        </a>
      ),
    },
  ];
  return (
    <div className="w-full bg-white">
      <div className="mx-auto flex max-w-container items-center justify-between py-2.5 px-8">
        <div>{t('appInfo.name')}</div>
        <Link href={true ? '/' : '/sign-in'}></Link>
        <Dropdown menu={{ items }} className="flex gap-x-1">
          <a onClick={(e) => e.preventDefault()}>
            <Typography>{t('header.categories')}</Typography>
            <DownOutlined />
          </a>
        </Dropdown>
        <Dropdown menu={{ items }} className="flex gap-x-1">
          <a onClick={(e) => e.preventDefault()}>
            <Typography>{t('header.newest')}</Typography>
            <DownOutlined />
          </a>
        </Dropdown>
        <Dropdown menu={{ items }} className="flex gap-x-1">
          <a onClick={(e) => e.preventDefault()}>
            <Typography>{t('header.chart')}</Typography>
            <DownOutlined />
          </a>
        </Dropdown>
        <div className="flex items-center space-x-2">
          <LanguageSelector
            className="flex h-9 w-9 items-center rounded-full"
            onChange={onChangeLanguage}
            value={i18n.language}
          />
          <Input
            placeholder={t('button.search')}
            addonBefore={<SearchOutlined />}
          />
          <Button>{t('button.signIn')}</Button>
          <Button>{t('button.signUp')}</Button>
          <Dropdown menu={{ items: PROFILE_ITEMS }}>
            <div className="rounded-full bg-primary p-2">
              <AvatarOutlinedSVG className="w-6 h-6" />
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
