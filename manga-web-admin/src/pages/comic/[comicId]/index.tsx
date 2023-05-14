import Layout from '@/shared/layouts/Layout';
import ComicChapterTable from '@/shared/components/common/Comic';
import withGuardRoute from '@/shared/hocs/withGuardRoute';

function Index() {
  return (
    <Layout>
      <ComicChapterTable isChapter />
    </Layout>
  );
}

export default withGuardRoute(Index, true);
