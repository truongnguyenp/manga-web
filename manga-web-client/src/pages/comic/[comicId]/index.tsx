import { getComicChaptersByIdApi } from '@/api/comic';
import Comic from '@/shared/components/common/Comic';
import Layout from '@/shared/layouts/Layout';
import { useQuery } from 'react-query';
import router, { useRouter } from 'next/router';
function C() {
  const { comicId } = router.query;
  const { data: comics, refetch } = useQuery([comicId], () =>
    getComicChaptersByIdApi(comicId as string)
  );
  return (
    <Layout>
      <Comic data={comics?.data} />
    </Layout>
  );
}

export default C;
