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

export interface AuthorData {
  id: string;
  name: string;
  alias: string;
  national: string;
  createdDate: string;
  lastModified: string;
}
export interface CategoryData {
  id: string;
  name: string;
  description: string;
  alias: string;
  keyword: string;
  created: string;
  lastModified: string;
}

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
export const getCategoriesApi = async (): Promise<AxiosResponse<any>> => {
  return await request.get<any>(`/category/all`);
}
export const postCategoryApi = async (data: CategoryData): Promise<AxiosResponse<any>> => {
  const payload = {
    ...data,
  };

  return await request.post<any>(`/category/new`, payload);
}
export const updateCategoryApi = async (id: string, data: CategoryData): Promise<AxiosResponse<any>> => {

  const payload = {
    ...data,
  };
  return await request.put<any>(`/category/update/${id}`, payload);
}
export const deleteCategoryApi = async (id: string): Promise<AxiosResponse<any>> => {
  return await request.delete<any>(`/category/delete/${id}`);
}
// get author
export const getAuthorsApi = async (): Promise<AxiosResponse<any>> => {
  return await request.get<any>(`/author/all`);
}
export const postAuthorApi = async (data: AuthorData): Promise<AxiosResponse<any>> => {

  const payload = {
    ...data,
  };

  return await request.post<any>(`/author/new`, payload);
}
export const updateAuthorApi = async (id: string, data: AuthorData): Promise<AxiosResponse<any>> => {

  const payload = {
    ...data,
  };
  return await request.put<any>(`/author/update/${id}`, payload);
}
export const deleteAuthorApi = async (id: string): Promise<AxiosResponse<any>> => {
  return await request.delete<any>(`/author/delete/${id}`);
}
export const searchStoriesApi = async (searchString: string, page = 1, nStories = 10): Promise<AxiosResponse<any>> => {
  try {
    const response = await request.get(`/story/search/${encodeURIComponent(searchString)}/${page}/${nStories}`);
    return response;
  } catch (error) {
    // Handle any errors here
    throw error;
  }
};