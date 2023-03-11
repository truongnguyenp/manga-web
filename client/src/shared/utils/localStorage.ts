import { appConfig } from "@/configs/config";

const LOCAL_STORAGE_TOKEN_KEY = `${appConfig.name}_access_token`;

export const setToken = (accessToken: string) => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, accessToken);
};
export const getToken = () => localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
export const clearToken = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
};