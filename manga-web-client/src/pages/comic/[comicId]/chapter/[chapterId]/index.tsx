import { getComicChaptersByIdApi } from '@/api/comic';
import Comic from '@/shared/components/common/Comic';
import Layout from '@/shared/layouts/Layout';
import { useQuery } from 'react-query';
import router, { useRouter } from 'next/router';
import { getChapterApi } from '@/api/chapter';
import ComicViewer from '@/shared/components/common/ComicViewer';
function C() {
  const { chapterId } = router.query;
  const { data: comics, refetch } = useQuery(['chapter', chapterId], () =>
    getChapterApi(chapterId)
  );
  console.log(comics)
  return (
    <Layout>
      <ComicViewer data={comics?.data?.chapterImagesList} />
    </Layout>
  );
}

export default C;
