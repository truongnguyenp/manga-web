import useTypeSafeTranslation from '@/hooks/useTypeSafeTranslation';
import useToggle from '@/shared/hooks/useToggle';
import { EyeFilled, LikeFilled, SwitcherFilled } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';
import { getChapterComicRoute, truncateText } from '@/utils/tool';
import { Chapter, ComicHeading } from '@/shared/utils/type';
import useRouter from 'next/router';
import { showSuccess } from '@/configs/configTools/notification';
interface HeadingProps {
  data: ComicHeading & { newestChapter: Chapter } & { recentRead: Chapter };
}
function Heading({ data }: HeadingProps) {
  console.log(data);
  const router = useRouter;
  const { t } = useTypeSafeTranslation();
  const [isShowDescFull, toggleShowDesc, _setShowDesc] = useToggle(false);
  return (
    <Row className="text-center gap-y-6 flex-col laptop:flex-row laptop:px-10 laptop:text-left py-10">
      <Col className="" span={24} lg={6}>
        <img
          src={data?.story?.image}
          alt={data?.story?.name}
          width="420"
          height="630"
          className="mx-auto"
        />
      </Col>
      <Col className="gap-y-3 flex flex-col laptop:ml-6" span={24} lg={17}>
        <Typography.Text className="text-3xl laptop:text-6xl font-bold">
          {data?.story?.name}
        </Typography.Text>
        <Row className="justify-center laptop:justify-start">
          <span className="flex-col flex text-center p-6 gap-y-2">
            <EyeFilled
              className="text-white mx-auto"
              style={{ fontSize: '1.5rem' }}
            />
            <span className="flex flex-row gap-x-1">
              <Typography.Text className="font-bold text-primary">
                {data?.story?.views}
              </Typography.Text>
              <Typography.Text>{t('comic.views')}</Typography.Text>
            </span>
          </span>
          <span className="flex-col flex text-center p-6 gap-y-2">
            <LikeFilled
              className="text-white mx-auto"
              style={{ fontSize: '1.5rem' }}
            />
            <span className="flex flex-row gap-x-1">
              <Typography.Text className="font-bold text-primary">
                {data?.story?.likes}
              </Typography.Text>
              <Typography.Text>{t('comic.likes')}</Typography.Text>
            </span>
          </span>
          <span className="flex-col flex text-center p-6 gap-y-2">
            <SwitcherFilled
              className="text-white mx-auto"
              style={{ fontSize: '1.5rem' }}
            />
            <span className="flex flex-row gap-x-1">
              <Typography.Text className="font-bold text-primary">
                {data?.numberOfChapter}
              </Typography.Text>
              <Typography.Text>{t('comic.chapters')}</Typography.Text>
            </span>
          </span>
        </Row>
        <Row className="justify-center gap-x-5 laptop:justify-start text-white font-bold">
          <Button
            className="btn-primary"
            onClick={() =>
              data.recentRead &&
              typeof window !== 'undefined' &&
              router.push(
                getChapterComicRoute(router.query.comicId, data.recentRead)
              )
            }
          >
            {data?.recentRead ? t('comic.readContinue') : t('comic.readNow')}
          </Button>
          <Button
            className="btn-primary_transparent"
            onClick={() =>
              data?.recentRead &&
              typeof window !== 'undefined' &&
              router.push(
                getChapterComicRoute(router.query.comicId, data.newestChapter)
              )
            }
          >
            {t('comic.latestChapter')}
          </Button>
          <Button
            className="btn-accent"
            onClick={() => showSuccess(t('message.addedToList'))}
          >
            {t('comic.myList')}
          </Button>
        </Row>
        <div className="flex-col flex mx-8 gap-y-3 laptop:mx-0">
          <Row className="gap-x-1">
            <Typography.Text>{`${t('comic.author')}:`}</Typography.Text>
            <Typography.Text>{data?.author?.name}</Typography.Text>
          </Row>
          <Row className="gap-x-1">
            <Typography.Text>{`${t('comic.genres')}:`}</Typography.Text>
            <Typography.Text>{data?.category?.name}</Typography.Text>
          </Row>
          {/* <Row className="gap-x-1">
            <Typography.Text>{`${t('comic.rated')}:`}</Typography.Text>
            <Typography.Text>{data?.rated}</Typography.Text>
          </Row> */}
          <Row className="gap-x-1 whitespace-normal text-left">
            <Typography.Text className="">{`${t('comic.description')}: ${
              isShowDescFull
                ? data?.story?.description
                : truncateText(data?.story?.description, 600)
            }`}</Typography.Text>
            <span
              onClick={() => {
                toggleShowDesc?.();
              }}
            >
              <Typography.Text className="text-gray-500 pointer underline">
                {isShowDescFull ? t('comic.seeLess') : t('comic.seeFull')}
              </Typography.Text>
            </span>
          </Row>
        </div>
      </Col>
    </Row>
  );
}

export default Heading;
