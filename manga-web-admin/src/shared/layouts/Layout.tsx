import { Layout as LayoutAnt, Menu } from 'antd';
import { twMerge } from 'tailwind-merge';
import { useEffect } from 'react';
import Header from './Header';
import Head from 'next/head';
import { appConfig } from '@/configs/config';
import { getToken } from '@/utils/localStorage';
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  PieChartOutlined,
  BookOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type MenuItem from 'antd/es/menu/MenuItem';
interface LayoutProps {
  children?: React.ReactNode;
}
const { Sider } = LayoutAnt;
function GetItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  navigate?: () => void,
  activeRoutes?: string[]
): MenuItem {
  const router = useRouter();

  const isActive =
    activeRoutes?.some((route) => router.pathname.startsWith(route)) ||
    key == router.pathname;
  return {
    key,
    icon,
    children,
    label,
    //navigate to the route
    onClick: () => {
      if (navigate) {
        navigate(); // Invoke the navigate callback
      }
    },
    className: isActive ? 'ant-menu-item-selected' : '',
  } as MenuItem;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const activeRoutes = ['/cms/category', '/cms/author', '/comic/'];
  const items: MenuItem[] = [
    GetItem(
      'Truyện',
      '/',
      <BookOutlined />,
      undefined,
      () => {
        router.push('/'); // Handle navigation in the component
      },
      ['/comic']
    ),

    GetItem(
      'Thể loại',
      '/cms/category',
      <PieChartOutlined />,
      undefined,
      () => {
        router.push('/cms/category'); // Handle navigation in the component
      }
    ),
    GetItem('Tác giả', '/cms/author', <UserOutlined />, undefined, () => {
      router.push('/cms/author'); // Handle navigation in the component
    }),
    // getItem('User', 'sub1', <UserOutlined />, [
    //   getItem('Tom', '3'),
    //   getItem('Bill', '4'),
    //   getItem('Alex', '5'),
    // ]),
    // getItem('Team', 'sub2', <TeamOutlined />, [
    //   getItem('Team 1', '6'),
    //   getItem('Team 2', '8'),
    // ]),
    // getItem('Files', '9', <FileOutlined />),
  ];
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(!!token);
  }, []);
  useEffect(() => {
    // get the cached data from localStorage when API takes too long to fetch
  }, []);
  const [collapsed, setCollapsed] = useState(false);
  return (
    <LayoutAnt>
      <div className={twMerge('sticky top-0 z-50 transition-all duration-500')}>
        <Header isAuthenticated={isAuthenticated} />
      </div>

      <LayoutAnt
        className={twMerge(
          'relative z-0 flex h-screen w-screen overflow-x-hidden object-cover bg-dark-bg'
        )}
        id="layout"
      >
        <Head>
          <title>{appConfig.title}</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            activeKey={'1'}
            items={items}
            selectedKeys={activeRoutes.filter((route) =>
              router.pathname.startsWith(route)
            )}
          />
        </Sider>

        <LayoutAnt.Content className={twMerge('z-10 h-full w-full')}>
          {children}
        </LayoutAnt.Content>
      </LayoutAnt>
    </LayoutAnt>
  );
}
