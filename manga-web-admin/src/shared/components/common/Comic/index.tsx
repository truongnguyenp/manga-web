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
import { ReactNode, use, useEffect, useState } from 'react';
import { StyledModal } from '@/shared/utils/constants';
import Image from 'next/image';
import useToggle from '@/shared/hooks/useToggle';
import ComicForm from '@/components/common/Comic/Form/ComicForm';
import { getChapterComicRoute, getNowFormattedTime } from '@/shared/utils/tool';
import { getComicRoute, getFormattedTime } from '@/shared/utils/tool';
import useRouter from 'next/router';
import { registerApi } from '@/api/register';
import { showError, showSuccess } from '@/configs/configTools/notification';
import { RegisterFormValues } from '@/pages/register';
import { replace } from 'lodash';
import { useMutation, useQuery } from 'react-query';
import { ComicData, getComicChaptersByIdApi, postComicApi } from '@/api/comic';
import { on } from 'events';
import { v4 as uuid } from 'uuid';
import { getNewestComicsApi, deleteComicApi } from '@/api/comic';
import { deleteChapterApi } from '@/api/chapter';
interface DataType {
  key: React.Key;
  name: string;
  avatar: ReactNode;
  dateModified: string;
  deleteChapter: ReactNode;
}
interface ComicChapterTableProps {
  isChapter?: boolean;
}
function ComicChapterTable({ isChapter = false }: ComicChapterTableProps) {
  const { t } = useTypeSafeTranslation();
  const router = useRouter;
  const [tableData, setTableData] = useState<DataType[]>([]);
  const { data: comics, refetch } = useQuery(['newestComics'], () => {
    return isChapter
      ? getComicChaptersByIdApi(router.query.comicId as string)
      : getNewestComicsApi();
  });
  const { mutate: deleteChapter } = useMutation(
    isChapter ? deleteChapterApi : deleteComicApi,
    {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        // Do something on error, e.g. show an error message or log the error
      },
    }
  );
  useEffect(() => {
    const fetchedData = isChapter ? comics?.data?.chapters : comics?.data;
    if (Array.isArray(fetchedData)) {
      const newData = fetchedData?.map((comic, index) => ({
        index: isChapter ? comic?.chapterNumber : index + 1,
        key: comic.id,
        name: comic.name,
        image: (
          <img
            src={comic?.image || 'https://picsum.photos/150/300'}
            className="aspect-square w-24 h-24"
            alt={t('commonFields.avatar')}
          />
        ),
        dateModified: getFormattedTime(comic?.story?.lastModified),
        deleteChapter: (
          <Button
            className="btn-accent"
            onClick={() => {
              setShowDeleteChapterModal(true);
              setChapterToDelete({
                id: comic.id,
                name: comic.name,
              });
            }}
          >
            {isChapter ? t('button.deleteChapter') : t('button.deleteComic')}
          </Button>
        ),
      }));
      setTableData(newData ?? []);
    }
    // do something with newData
  }, [comics]);

  const { mutate: postComic } = useMutation(postComicApi, {
    onError: (error) => {
      showError(error);
    },
    onSuccess: (data) => {
      refetch();
      showSuccess(t('message.createComicSuccess'));
    },
  });

  const onCreateNewComic = async (comicData: ComicData) => {
    await postComic(comicData);
  };
  const [chapterToDelete, setChapterToDelete] = useState<string | null>('');
  const [deleteChapterModal, setShowDeleteChapterModal] = useState(false);
  const [addComicModal, toggleAddComicModal] = useToggle();
  const handleDeleteChapter = () => {
    deleteChapter(chapterToDelete.id);
    setChapterToDelete(null);
    setShowDeleteChapterModal(false);
  };
  const columns: ColumnsType<DataType> = [
    {
      title: t('commonFields.index'),
      dataIndex: 'index',
    },
    {
      title: t('commonFields.avatar'),
      dataIndex: 'image',
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

  const handleRowClick = (e, record: DataType) => {
    if (e.target.closest('button')) {
      return;
    }

    if (isChapter)
      router.push(getChapterComicRoute(router.query.comicId, record.key));
    else router.push(getComicRoute(record.key));
  };
  const handleAddComic = (values) => {
    onCreateNewComic(values);
  };
  const [form] = Form.useForm();

  return (
    <div>
      <div className="bg-dark-bg gap-y-3 flex flex-col">
        <div className="flex gap-x-4">
          <Typography.Text
            className="font-medium text-xl
          "
          >
            {isChapter ? t('comic.chapterList') : t('commonFields.comicList')}:
          </Typography.Text>
          <Button
            className="btn-primary"
            onClick={() => {
              if (isChapter)
                router.push(getChapterComicRoute(router.query.comicId, uuid()));
              else toggleAddComicModal();
            }}
          >
            {isChapter ? t('button.addChapter') : t('button.addComic')}
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={tableData}
          onRow={(record) => ({
            onClick: (e) => handleRowClick(e, record),
          })}
        />
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
            name: `${
              isChapter ? t('comic.chapter') : t('commonFields.comic')
            } ${chapterToDelete?.name}`,
          })}
        </p>
      </StyledModal>
      <StyledModal
        title={t('button.addComic')}
        className="bg-dark-bg"
        open={addComicModal}
        onOk={() => {
          if (!!form) {
            const comicData = form?.getFieldsValue();
            if (!!comicData?.dateCreated)
              comicData.dateCreated = getNowFormattedTime();
            if (!!comicData?.dateUpdate)
              comicData.dateUpdate = getNowFormattedTime();
            handleAddComic({ ...comicData, id: uuid() });
            toggleAddComicModal();
          } else {
            showError('noform');
            return;
          }
        }}
        closable
        onCancel={toggleAddComicModal}
      >
        <ComicForm form={form} id="comicForm" />
      </StyledModal>
      <div className="h-28"></div>
    </div>
  );
}

export default ComicChapterTable;
