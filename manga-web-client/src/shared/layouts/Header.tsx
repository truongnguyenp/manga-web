import { useRouter } from 'next/router';
import Link from 'next/link';
import useTypeSafeTranslation from '@/hooks/useTypeSafeTranslation';
import {
  Button,
  Dropdown,
  Input,
  Typography,
  MenuProps,
  Row,
  Space,
} from 'antd';
import {
  DownOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import AvatarOutlinedSVG from '@/assets/svgs/avatar-outlined.svg';
import styled from '@emotion/styled';
import { twMerge } from 'tailwind-merge';
import { useLogout } from '../hooks/useLogout';
interface HeaderProps {
  isAuthenticated?: boolean;
  hiddenOnScroll?: boolean;
}

export default function Header({ isAuthenticated = false }: HeaderProps) {
  const { push } = useRouter();
  const { t } = useTypeSafeTranslation();
  const { logout } = useLogout();

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
  const StyledDiv = styled.div`
    .ant {
      &-typography,
      &-input-group-addon {
        color: #fff;
      }
    }
  `;
  const StyledInput = styled(Input)`
    .ant-input {
      background-color: #333;
    }
  `;
  return (
    <StyledDiv className={twMerge('w-full bg-black-light text-white')}>
      <div className="mx-auto flex max-w-container items-center justify-between py-2.5 laptop:px-8 flex-wrap">
        <Link className="pl-4 font-medium text-primary text-4xl" href="/">
          {t('appInfo.name')}
        </Link>
        <Link href={'/'}></Link>
        <Row className="flex-1 justify-around hidden laptop:flex">
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
        </Row>
        <Dropdown
          menu={{ items }}
          trigger={['click']}
          className="laptop:hidden mr-6 ml-4"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <UnorderedListOutlined />
              Menu
            </Space>
          </a>
        </Dropdown>
        <div className="flex items-center space-x-2 mx-auto">
          <StyledInput
            className="bg-dark-bg border-black"
            placeholder={t('placeholder.searchComic')}
            addonBefore={<SearchOutlined />}
          />
          {!isAuthenticated && (
            <>
              <Button className="text-primary" onClick={() => push('/login')}>
                {t('button.login')}
              </Button>
              <Button
                className="text-primary"
                onClick={() => push('/register')}
              >
                {t('button.register')}
              </Button>
            </>
          )}
          {isAuthenticated && (
            <Dropdown menu={{ items: PROFILE_ITEMS }}>
              <div className="rounded-full bg-primary p-2">
                <AvatarOutlinedSVG className="w-6 h-6" />
              </div>
            </Dropdown>
          )}
        </div>
      </div>
    </StyledDiv>
  );
}
