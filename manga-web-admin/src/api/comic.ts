import axios, { AxiosResponse } from 'axios';
import request from './request';
import { UseMutationResult, useMutation } from 'react-query';
export interface ComicData {
  id: string;
  name: string;
  description: string;
  alias: string;
  image: string;
  keyword: string;
  status: string;
  createdDate: number;
  updatedDate: number;
}
type ChapterData = {
  id: string;
  story: {
    id: string;
    name: string;
    description: string;
    alias: string;
    image: string;
    keyword: string;
    status: boolean;
    createdDate: string;
    lastModified: string;
  };
  chapterNumber: number;
  name: string;
  cost?: number;
  image: string;
  views: number;
  created: string;
  lastModified: string;
};


export const postComicApi = async (data: ComicData): Promise<AxiosResponse<any>> => {
  const payload = {
    ...data,

  };

  return await request.post<any>(`/story/new`, payload);
};

export const deleteComicApi = async (id: string): Promise<AxiosResponse<any>> => {
  return await request.delete<any>(`/story/delete/${id}`);
};
export const updateComicApi = async (id: string, data: ComicData): Promise<AxiosResponse<any>> => {
  const payload = {
    ...data,
    updatedDate: Date.now(),
  };

  return await request.put<any>(`/story/update/${id}`, payload);
}
export const getComicApi = async (id: string): Promise<AxiosResponse<any>> => {
  return await request.get<any>(`/story/${id}`);
}
export const getNewestComicsApi = async (page = 1, pageSize = 10): Promise<AxiosResponse<any>> => {
  return await request.get<any>(`/story/newest/${page}/${pageSize}`);
};
export const getComicChaptersByIdApi = async (storyId: string): Promise<AxiosResponse<any>> => {
  return await request.get<any>(`/story/${storyId}`);
};
