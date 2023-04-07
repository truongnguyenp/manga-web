import { useRouter } from 'next/router';
import { clearToken } from '@/utils/localStorage';
import { PATH_URL } from '@/utils/constants';
export const useLogout = () => {
  const { push } = useRouter();

  const logout = () => {
    clearToken();
    push(PATH_URL.login);
  }
  return { logout }
};