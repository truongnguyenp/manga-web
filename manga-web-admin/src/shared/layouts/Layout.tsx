import { Layout as LayoutAnt, Menu, MenuProps } from 'antd';
import { twMerge } from 'tailwind-merge';
import { useEffect } from 'react';
import Header from './Header';
import Head from 'next/head';
import { appConfig } from '@/configs/config';
import { getToken } from '@/utils/localStorage';
import { useState } from 'react';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { createElement } from 'react';
import Sider from 'antd/lib/layout/Sider';
interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const items2: MenuProps['items'] = [
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
  ].map((icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(!!token);
  }, []);
  useEffect(() => {
    // get the cached data from localStorage when API takes too long to fetch
  }, []);
  return (
    <>
      <LayoutAnt>
        <Sider>
          <div
            style={{
              height: 32,
              margin: 16,
              background: 'rgba(255, 255, 255, 0.2)',
            }}
          />
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items2}
          />
        </Sider>
        {children}
      </LayoutAnt>
    </>
  );
}
