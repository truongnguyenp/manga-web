import type { AliasToken, OverrideToken } from 'antd/es/theme/interface';

export const TOKEN: Partial<AliasToken> = {
  colorBgMask: 'rgba(7, 6, 50, 0.4)',
  colorError: '#f74360',
  colorPrimary: '#0d8e8b',
  colorSuccess: '#00c48c',
  colorWarning: '#ff934b',
};

export const BUTTON: Partial<OverrideToken['Button']> = {
  controlHeight: 48,
  colorBorderSecondary: '#0d8e8b',
  colorPrimary: '#0d8e8b',
  colorBorder: '#0d8e8b',
};
export const INPUT: Partial<OverrideToken['Input']> = {
  controlHeight: 48,
  colorBgBase: '#fff',
  colorText: '#333',
};
export const IMAGE: Partial<OverrideToken['Image']> = {
  colorBgMask: 'rgba(0, 0, 0, 0.92)',
};
export const SELECT: Partial<OverrideToken['Select']> = {
  colorText: '#333',
};
export const TABLE: Partial<OverrideToken['Table']> = {
  colorBgContainer: 'var(--secondary-color)',
};
export const MODAL: Partial<OverrideToken['Modal']> = {
  colorText: 'var(--primary-color)',
  colorTextSecondary: 'var(--primary-color)',
  colorBgBase: 'var(--secondary-color)',
  colorBgContainer: 'var(--secondary-color)',
};