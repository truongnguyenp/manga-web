import Layout from '@/shared/layouts/Layout';
import ComicChapterTable from '@/shared/components/common/Comic';
import { getNewestComicsApi } from '@/api/comic';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import withGuardRoute from '@/shared/hocs/withGuardRoute';

function Index() {
  const { t } = useTranslation();

  return (
    <Layout>
      <ComicChapterTable />
    </Layout>
  );
}

export default withGuardRoute(Index, true);
