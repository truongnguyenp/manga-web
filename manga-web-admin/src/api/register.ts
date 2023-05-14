import { AxiosResponse } from 'axios';
import request from './request';

export const registerApi = async ({
    username,
    email,
    password,
}: any): Promise<AxiosResponse<any>> => {
    let payload = { username, email, password };

    return await request.post<any>(`/Authenticate/admin/register`, payload);
};
