import axios from 'axios';
import i18n from '@/shared/i18n';
import { getToken } from '@/shared/utils/localStorage';
import { ErrorCode } from '@/shared/utils/type';

const TIME_OUT = 60000;

const baseApiConfig = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    ['content-type']: 'application/json',
    ['accept']: 'application/json',
  },
  timeout: TIME_OUT,
};

const request = axios.create(baseApiConfig);

request.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Accept = 'application/json';
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

request.interceptors.response.use(
  response => response,
  error => {
    switch (error.code) {
      case ErrorCode.ERR_BAD_REQUEST:
        throw new Error(String(i18n.t('error.inValidAccLogin')));
      case ErrorCode.ERR_NETWORK:
        throw new Error(String(i18n.t('error.lostConnection')));
      case ErrorCode.ECONNABORTED:
        throw new Error(String(i18n.t('error.requestTimeOut')));
      default:
        throw new Error(String(i18n.t('error.internalServerError')));
    }
  },
);

export default request;
