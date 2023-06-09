import ChapterImages from '@/shared/components/common/Comic/Chapter/ChapterImages';
import ComicForm from '@/shared/components/common/Comic/Form/ComicForm';
import ComicMenu from '@/shared/components/common/Comic/Menu/ComicMenu';
import useTypeSafeTranslation from '@/shared/hooks/useTypeSafeTranslation';
import Layout from '@/shared/layouts/Layout';
import { Form } from 'antd';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { showError, showSuccess } from '@/configs/configTools/notification';
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
    getChapterApi(chapterId), {onSuccess: (data) => {
      form.setFieldsValue({...data.data.chapter});
    }}
  );
  const [form] = Form.useForm();
  const created = !!data?.data;

  const { mutate: postChapter } = useMutation(postChapterApi, {
    onSuccess: () => {
      showSuccess(t('message.createChapterSuccess'));
      router.push(getComicRoute(comicId as string));
    },
    onError: (error) => showError(error),
  });

  const { mutate: updateChapter } = useMutation(
    ({ id, chapterData }) => updateChapterApi(id, chapterData),
    {
      onSuccess: () => {
        showSuccess(t('message.updateChapterSuccess'));
      },
      onError: (error) => showError(error),
    }
  );
  const { mutate: deleteChapter } = useMutation(deleteChapterApi, {
    onSuccess: () => {
      showSuccess(t('message.deleteChapterSuccess'));
      router.push(getComicRoute(comicId as string));
    },
    onError: (error) => showError(error),
  });
  return (
    <Layout>
      <ComicForm
        form={form}
        isChapter
        onSubmit={() => console.log('v')}
      />
      <ChapterImages
        chapterImages={data?.data?.chapterImagesList}
        form={form}
        created
        className="bg-dark-bg"
        chapterId={chapterId}
        comicId={comicId}
      />
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
              chapter: {
                id: chapterId,
                ...form.getFieldsValue(),
                storyId: comicId,
              },
              chapterImagesList: form  
                .getFieldValue('images')?
                .map((image: any, index) => ({
                  ...image,
                  order: index,
                })) || data?.data?.chapterImagesList,
            },
          });
        }}
        created={created}
        onSubmit={() => {
          const chapterImages = form
            .getFieldValue('images')
            ?.map((image: any, index: string) => ({
              ...image,
              order: index,
            }));
          postChapter({
            chapter: {
              id: chapterId,
              ...form.getFieldsValue(),
              storyId: comicId,
            },
            chapterImagesList: chapterImages,
          });
        }}
      />
    </Layout>
  );
}
export default withGuardRoute(Index, true);
