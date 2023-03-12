import { AxiosResponse } from 'axios';
import request from './request';

export const loginApi = async ({
    username,
    password,
}: any): Promise<AxiosResponse<any>> => {
    let payload = { username, password };

    return await request.post<any>(`/Authenticate/login/`, payload);
};
