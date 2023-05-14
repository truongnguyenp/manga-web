import { useEffect, useState } from 'react';
import { getToken } from '@/utils/localStorage';
import Loading from '@/components/common/Loading';
import { useRouter } from 'next/router';
function withGuardRoute<T extends object>(
  WrappedComponent: React.ComponentType<T>,
  isPrivate = false
) {
  return function JSXE(props: T) {
    const { replace } = useRouter();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      (async () => {
        setLoading(true);
        const token = getToken();
        if (!token && isPrivate) {
          replace('/login');
        }

        setLoading(false);
      })();
    }, [replace]);

    if (loading) return <Loading />;
    return <WrappedComponent {...props} />;
  };
}

export default withGuardRoute;
