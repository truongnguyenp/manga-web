import ChapterImages from '@/shared/components/common/Comic/Chapter/ChapterImages';
import ComicForm from '@/shared/components/common/Comic/Form/ComicForm';
import ComicMenu from '@/shared/components/common/Comic/Menu/ComicMenu';
import useTypeSafeTranslation from '@/shared/hooks/useTypeSafeTranslation';
import Layout from '@/shared/layouts/Layout';
import { Form } from 'antd';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { showSuccess } from '@/configs/configTools/notification';
import {
  getChapterApi,
  postChapterApi,
  updateChapterApi,
  deleteChapterApi,
} from '@/api/chapter';
import { getComicRoute, getNowFormattedTime } from '@/shared/utils/tool';
import withGuardRoute from '@/shared/hocs/withGuardRoute';

function Index() {
  const { t } = useTypeSafeTranslation();
  const router = useRouter();
  // const data = {
  //   title: 'title',
  //   description: 'description',
  //   anotherTitle: 'anotherTitle',
  //   avatar: 'https://picsum.photos/150/300',
  //   cover: 'cover',
  //   datePublished: '1/10/2003',
  //   numberOfChapter: 10,
  //   status: t('comic.statusOptions.publishing'),
  //   categories: ['categories', 'categories'],
  //   author: 'author',
  //   tags: ['tags', 'tags'],
  // };
  const { chapterId, comicId } = router.query;
  const { data } = useQuery(['chapter', chapterId], () =>
    getChapterApi(chapterId)
  );
  const [form] = Form.useForm();
  const created = !!data?.data?.id;

  const { mutate: postChapter } = useMutation(postChapterApi, {
    onSuccess: () => {
      showSuccess(t('message.createChapterSuccess'));
      router.push(getComicRoute(comicId as string));
    },
    onError: (error) => {},
  });

  const { mutate: updateChapter } = useMutation(
    ({ id, chapterData }) => updateChapterApi(id, chapterData),
    {
      onSuccess: () => {
        showSuccess(t('message.updateChapterSuccess'));
      },
      onError: (error) => {},
    }
  );
  const { mutate: deleteChapter } = useMutation(deleteChapterApi, {
    onSuccess: () => {
      showSuccess(t('message.deleteChapterSuccess'));
      router.push(getComicRoute(comicId as string));
    },
    onError: (error) => {},
  });
  return (
    <Layout>
      <ComicForm
        form={form}
        isChapter
        {...(created ? { initialValues: data.data } : {})}
        onSubmit={() => console.log('v')}
      />
      <ChapterImages created className="bg-dark-bg" />
      <ComicMenu
        onMenuDelete={() => {
          deleteChapter(chapterId);
        }}
        onUpdate={() => {
          console.log('update value');
          console.log(form.getFieldsValue());
          updateChapter({
            id: chapterId,
            chapterData: {
              ...form.getFieldsValue(),
              storyId: comicId,
              id: chapterId,
              lastModified: getNowFormattedTime(),
              chapterNumber: 0,
              cost: 0,
              views: 0,
              created: '2023-05-14T00:36:06.678Z',
            },
          });
        }}
        created={created}
        onSubmit={() => {
          postChapter({ ...form.getFieldsValue(), storyId: comicId });
        }}
      />
    </Layout>
  );
}
export default withGuardRoute(Index, true);

