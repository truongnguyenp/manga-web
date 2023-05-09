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
import ProfileTabs from '../components/common/Profile';
import { useRef, useState } from 'react';
interface HeaderProps {
  isAuthenticated?: boolean;
  hiddenOnScroll?: boolean;
}

import { useOnClickOutside } from 'usehooks-ts';
import { PATH_URL } from '@/shared/utils/constants';
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
export default function Header({ isAuthenticated = false }: HeaderProps) {
  const router = useRouter;
  const push = router().push;
  const { t } = useTypeSafeTranslation();

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
  const profileRef = useRef(null);
  const [isProfileDropdownOpen, setProfileDropDownOpen] = useState(false);
  useOnClickOutside(profileRef, () => setProfileDropDownOpen(false));
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
              <Button className="btn-primary" onClick={() => push('/login')}>
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
            <div
              className="relative"
              onMouseOver={() => setProfileDropDownOpen(true)}
              ref={profileRef}
              itemRef="profileRef"
            >
              <div className="rounded-full bg-primary p-2">
                <AvatarOutlinedSVG className="w-6 h-6" />
              </div>
              {isProfileDropdownOpen &&
                !router().asPath.includes(PATH_URL.profile.index) && (
                  <ProfileTabs className="absolute top-14 rounded-xl right-8 bg-secondary w-96" />
                )}
            </div>
          )}
        </div>
      </div>
    </StyledDiv>
  );
}
