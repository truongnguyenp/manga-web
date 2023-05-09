import ChapterImages from '@/shared/components/common/Comic/Chapter/ChapterImages';
import ComicForm from '@/shared/components/common/Comic/Form/ComicForm';
import ComicMenu from '@/shared/components/common/Comic/Menu/ComicMenu';
import { UploadOutlined } from '@ant-design/icons';
import {
  Typography,
  Form,
  Row,
  Col,
  Input,
  Upload,
  Button,
  Select,
} from 'antd';
import { t } from 'i18next';
import { useRouter } from 'next/router';
export interface ChapterForm {
  title: string;
  description: string;
  anotherTitle: string;
  avatar: string;
  cover: string;
  datePublished: string;
  numberOfChapter: number;
  status: string;
  categories: string[];
  author: string;
  tags: string[];
}
export default function Index() {
  const router = useRouter;
  const data: ChapterForm = {
    title: 'title',
    description: 'description',
    anotherTitle: 'anotherTitle',
    avatar: 'https://picsum.photos/150/300',
    cover: 'cover',
    datePublished: '1/10/2003',
    numberOfChapter: 10,
    status: t('comic.statusOptions.publishing'),
    categories: ['categories', 'categories'],
    author: 'author',
    tags: ['tags', 'tags'],
  };
  return (
    <div className="bg-dark-bg">
      <ComicForm initialValues={data} onSubmit={() => console.log('v')} />
      <ChapterImages
        className="text-white bg-dark-bg p-4 border-solid border"
        created={router().query.chapterId}
      />
    </div>
  );
}
