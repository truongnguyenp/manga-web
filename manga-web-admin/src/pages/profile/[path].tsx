import withGuardRoute from '@/shared/hocs/withGuardRoute';
import ProfileTabs from '@/shared/components/common/Profile';
import Layout from '@/shared/layouts/Layout';
import { useRouter } from 'next/router';

function Index() {
  const router = useRouter;
  return (
    <Layout>
      <div className="flex m-8 rounded-xl border-primary bg-secondary text-white">
        <ProfileTabs
          className="w-1/4 border-r-white border-r border-solid"
          section={String(router().query.path)}
        />
        <div className="w-3/4"></div>
      </div>
    </Layout>
  );
}

export default withGuardRoute(Index);
