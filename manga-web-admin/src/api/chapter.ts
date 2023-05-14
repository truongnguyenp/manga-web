import { AxiosResponse } from 'axios';
import request from './request';
import { v4 as uuid } from 'uuid';

interface Chapter {
  id: string;
  story: {
    id: string;
    name: string;
    description: string;
    alias: string;
    image: {
      id: string;
      name: string;
      storage: string;
    };
    keyword: string;
    status: boolean;
    createdDate: string; // ISO string
    lastModified: string; // ISO string
  };
  chapterNumner: number;
  name: string;
  cost: number;
  image: string;
  views: number;
  created: string; // ISO string
  lastModified: string; // ISO string
}


export const getChapterApi = async (id: string): Promise<AxiosResponse<any>> => {
  return await request.get<any>(`/chapter/${id}`);
};
export const deleteChapterApi = async (id: string): Promise<AxiosResponse<any>> => {
  return await request.delete<any>(`/chapter/delete/${id}`);
};
export const postChapterApi = async (data: ChapterData): Promise<AxiosResponse<any>> => {
  const payload = {
    ...data,
  };

  return await request.post<any>(`/chapter/new`, payload);
};
export const updateChapterApi = async (id: string, data: ChapterData): Promise<AxiosResponse<any>> => {

  const payload = {
    ...data,
  };
  return await request.put<any>(`/chapter/update/${id}`, payload);
};
