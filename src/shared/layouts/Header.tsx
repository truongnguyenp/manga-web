import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import LanguageSelector from '@/components/selector/LanguageSelector';
import { setLocale } from '../utils/locale';
import NavBar from './NavBar';
export default function Header() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const onChangeLanguage = (value: string) => {
    i18n.changeLanguage(value || 'en');
    setLocale(value || 'en');
  };

  const onLogout = () => {
    navigate('/sign-in');
  };

  return (
    <div className="w-full bg-white">
      <div className="mx-auto flex max-w-container items-center justify-between py-2.5 px-4">
        <Link to={true ? '/' : '/sign-in'}>
          <Typography.Text className="text-base font-bold uppercase tracking-wide text-primary"></Typography.Text>
        </Link>

        <div className="flex items-center space-x-2">
          <LanguageSelector
            className="flex h-9 w-9 items-center rounded-full bg-primary"
            onChange={onChangeLanguage}
            value={i18n.language}
          />

          <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary text-white"></div>

          {
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white"
              onClick={onLogout}
            >
              logout
            </div>
          }
        </div>
      </div>

      {<NavBar />}
    </div>
  );
}
