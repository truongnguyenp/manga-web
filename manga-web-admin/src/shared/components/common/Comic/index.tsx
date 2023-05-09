import '@/components/common/Comic/Heading';
import '@/components/common/Comic/ChapterList';
import DefaultImage from '@/assets/images/defaultImage.png';
import useTypeSafeTranslation from '@/shared/hooks/useTypeSafeTranslation';
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Typography,
  Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Table } from 'antd';
import { ReactNode, useState } from 'react';
import { StyledModal } from '@/shared/utils/constants';
import Image from 'next/image';
import ComicMenu from '@/components/common/Comic/Menu/ComicMenu';
import useToggle from '@/shared/hooks/useToggle';
interface DataType {
  key: React.Key;
  name: string;
  avatar: ReactNode;
  dateModified: string;
  deleteChapter: ReactNode;
}

function Comic() {
  const { t } = useTypeSafeTranslation();
  const [chapterToDelete, setChapterToDelete] = useState<string | null>('');
  const [deleteChapterModal, setShowDeleteChapterModal] = useState(false);
  const [addChapterModal, toggleAddChapterModal] = useToggle();
  const handleDeleteChapter = () => {
    // delete item here
    setChapterToDelete(null);
    setShowDeleteChapterModal(false);
  };
  const columns: ColumnsType<DataType> = [
    {
      title: t('commonFields.index'),
      dataIndex: 'key',
    },
    {
      title: t('commonFields.avatar'),
      dataIndex: 'avatar',
    },
    {
      title: t('commonFields.name'),
      dataIndex: 'name',
    },
    {
      title: t('commonFields.dateModified'),
      dataIndex: 'dateModified',
      sorter: {
        compare: (a, b) =>
          Date.parse(a.dateModified) - Date.parse(b.dateModified),
        multiple: 2,
      },
    },
    {
      title: t('commonFields.action'),
      dataIndex: 'deleteChapter',
    },
  ];

  const chapters: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      avatar: (
        <Image
          src="https://picsum.photos/150/300"
          width={100}
          height={100}
          className="aspect-square"
          alt={t('commonFields.avatar')}
        />
      ),
      dateModified: '1/1/2020',
      deleteChapter: (
        <Button
          className="btn-accent"
          onClick={() => {
            setShowDeleteChapterModal(true);
            setChapterToDelete(1);
          }}
        >
          {t('button.deleteChapter')}
        </Button>
      ),
    },
    {
      key: '4',
      name: 'Jim Red',
      avatar: (
        <Image
          src="https://picsum.photos/150/300"
          width={100}
          height={100}
          className="aspect-square"
          alt={t('commonFields.avatar')}
        />
      ),
      dateModified: '1/1/2020',
      deleteChapter: (
        <Button className="btn-accent">{t('button.deleteChapter')}</Button>
      ),
    },
  ];
  const data = {
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
    <div>
      <div className="bg-dark-bg gap-y-3 flex flex-col">
        <div className="flex gap-x-4">
          <Typography.Text
            className="font-medium text-xl
          "
          >
            {t('comic.chapterList')}:{data.numberOfChapter}
          </Typography.Text>
          <Button className="btn-primary" onClick={toggleAddChapterModal}>
            {t('button.addChapter')}
          </Button>
        </div>

        <Table columns={columns} dataSource={chapters} />
      </div>
      <StyledModal
        title={t('button.deleteChapter')}
        className="bg-dark-bg"
        open={deleteChapterModal}
        onOk={handleDeleteChapter}
        onCancel={() => setShowDeleteChapterModal(false)}
      >
        <p>
          {t('commonFields.areYouSure', {
            name: `${t('comic.chapter')} ${chapterToDelete}`,
          })}
        </p>
      </StyledModal>
      <StyledModal
        title={t('button.deleteChapter')}
        className="bg-dark-bg"
        open={addChapterModal}
        onOk={handleDeleteChapter}
        closable
        onCancel={toggleAddChapterModal}
      >
        <Comic></Comic>
      </StyledModal>
      <ComicMenu
        onMenuDelete={() => {
          setShowDeleteChapterModal(true);
          setChapterToDelete(1);
        }}
      />
      <div className="h-28"></div>
    </div>
  );
}

export default Comic;
