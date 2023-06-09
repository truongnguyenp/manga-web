import i18n from "@/shared/i18n";
import { getToken } from "@/shared/utils/localStorage";
import { ErrorCode } from "@/shared/utils/type";
import axios, { AxiosResponse } from "axios";
import { v4 as uuid } from 'uuid';

const baseApiConfig = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    ['content-type']: 'multipart/form-data',
    ['accept']: 'application/json',
  },
  timeout: 1000000,
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
        throw new Error(String(i18n.t('error.inva')));
      case ErrorCode.ERR_NETWORK:
        throw new Error(String(i18n.t('error.lostConnection')));
      case ErrorCode.ECONNABORTED:
        throw new Error(String(i18n.t('error.requestTimeOut')));
      default:
        throw new Error(String(i18n.t('error.internalServerError')));
    }
  },
);
export const uploadImageApi = async (file: File, storyId, chapterId): Promise<AxiosResponse<any>> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('story_id', storyId);
  formData.append('chapter_id', chapterId);
  return await request.post<any>(`/images/upload`, formData);
};
