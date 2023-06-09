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
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from '@ant-design/icons';
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
import {
  ComicData,
  getComicChaptersByIdApi,
  postComicApi,
  updateComicApi,
} from '@/api/comic';
import { v4 as uuid } from 'uuid';
import {
  getNewestComicsApi,
  deleteComicApi,
  getCategoriesApi,
} from '@/api/comic';
import { Popover } from 'antd';
import styled from '@emotion/styled';

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
const StyledPopover = styled(Popover)`
  .ant-popover-inner-content {
    color: #333;
  }
`;
function ComicChapterTable({ isChapter = false }: ComicChapterTableProps) {
  const { t } = useTypeSafeTranslation();
  const router = useRouter;
  const [tableData, setTableData] = useState<DataType[]>([]);
  const { data: comics, refetch } = useQuery(['newestComics'], () => {
    return isChapter
      ? getComicChaptersByIdApi(router.query.comicId as string)
      : getNewestComicsApi();
  });

  const [chapterToDelete, setChapterToDelete] = useState<string | null>('');
  const [deleteChapterModal, setShowDeleteChapterModal] = useState(false);
  const [addComicModal, toggleAddComicModal] = useToggle();
  const [updateComicModal, toggleUpdateComicModal] = useToggle();
  const [updateComicInitialValues, setUpdateComicInitialValues] = useState();
  const { mutate: deleteChapter } = useMutation(
    isChapter ? deleteChapterApi : deleteComicApi,
    {
      onSuccess: () => {
        showSuccess(
          isChapter
            ? t('message.deleteChapterSuccess')
            : t('message.deleteComicSuccess')
        );
        refetch();
      },
      onError: (error) => {
        showError(error);
        // Do something on error, e.g. show an error message or log the error
      },
    }
  );
  const [form] = Form.useForm();
  const [updateComicForm] = Form.useForm();

  useEffect(() => {
    if (updateComicForm) {
      const values = updateComicForm.getFieldsValue();
      setUpdateComicInitialValues(values);
    }
  }, [updateComicForm]);
  useEffect(() => {
    const fetchedData = isChapter ? comics?.data?.chapters : comics?.data;
    if (Array.isArray(fetchedData)) {
      const stories = fetchedData?.map((item, index) => ({
        index: index + 1,
        key: item?.story?.id,
        name: item?.story?.name,
        author: item?.author,
        category: item?.category,
        image: (
          <img
            src={
              isChapter
                ? item?.image
                : item?.story?.image || 'https://picsum.photos/150/300'
            }
            className="aspect-square w-24 h-24"
            alt={t('commonFields.avatar')}
          />
        ),
        dateModified: getFormattedTime(item?.lastModified),
        deleteChapter: (
          <>
            <Button
              onClick={() => {
                toggleUpdateComicModal();
                updateComicForm.setFieldsValue({
                  ...item?.story,
                  image: item?.story?.image,
                  categoryId: item.category?.id,
                  authorId: item.author?.id,
                });
                console.log(updateComicForm.getFieldsValue());
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setShowDeleteChapterModal(true);
                setChapterToDelete({
                  id: isChapter ? item?.id : item?.story?.id,
                  name: isChapter ? item.name : item?.story?.name,
                });
              }}
            >
              <DeleteOutlined />
            </Button>
          </>
        ),
      }));
      const chapters = fetchedData?.map((item, index) => ({
        index: isChapter ? item?.chapterNumber : index + 1,
        key: isChapter ? item.id : item?.story?.id,
        name: isChapter ? item.name : item?.story?.name,
        image: (
          <img
            src={
              isChapter
                ? item?.image
                : item?.story?.image || 'https://picsum.photos/150/300'
            }
            className="aspect-square w-24 h-24"
            alt={t('commonFields.avatar')}
          />
        ),
        dateModified: getFormattedTime(item?.lastModified),
        deleteChapter: (
          <>
            <Button
              onClick={() => {
                toggleUpdateComicModal();
                updateComicForm.setFieldsValue({
                  ...item?.story,
                  image: item?.story?.image,
                  categoryId: item.category?.id,
                  authorId: item.author?.id,
                });
                console.log(updateComicForm.getFieldsValue());
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setShowDeleteChapterModal(true);
                setChapterToDelete({
                  id: isChapter ? item?.id : item?.story?.id,
                  name: isChapter ? item.name : item?.story?.name,
                });
              }}
            >
              <DeleteOutlined />
            </Button>
          </>
        ),
      }));
      if (isChapter) setTableData(chapters ?? []);
      else setTableData(stories ?? []);
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

  const { mutate: updateComic } = useMutation(
    ({ id, comicData }) => updateComicApi(id, comicData),
    {
      onError: (error) => {
        showError(error);
      },
      onSuccess: (data) => {
        refetch();
        showSuccess(t('message.updateComicSuccess'));
      },
    }
  );
  const handleDeleteChapter = () => {
    deleteChapter(chapterToDelete.id);
    setChapterToDelete(null);
    setShowDeleteChapterModal(false);
  };
  const chapterColumns: ColumnsType<DataType> = [
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
  const comicColumns: ColumnsType<DataType> = [
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
      title: t('comic.author'),
      dataIndex: ['author'],
      render: (author) => (
        <StyledPopover
          content={`${author?.name} - ${author?.national}`}
          className="bg-dark-bg text-dark-bg"
        >
          <span className="text-white">{author?.name}</span>
        </StyledPopover>
      ),
    },
    {
      title: t('comic.categories'),
      dataIndex: ['category', 'name'],
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
    else router.push(getComicRoute(record?.key));
  };

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
          columns={isChapter ? chapterColumns : comicColumns}
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
            const comicData = form.getFieldsValue();
            if (!!comicData?.dateCreated)
              comicData.dateCreated = getNowFormattedTime();
            if (!!comicData?.dateUpdate)
              comicData.dateUpdated = getNowFormattedTime();

            console.log({
              ...comicData,

              id: form.getFieldValue('id'),
            });
            postComic({ id: form.getFieldValue('id'), ...comicData });
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

      <StyledModal
        title={t('button.editComic')}
        className="bg-dark-bg"
        open={updateComicModal}
        onOk={() => {
          if (!!form) {
            const comicData = updateComicForm?.getFieldsValue();
            if (!!comicData?.dateCreated)
              comicData.dateCreated = getNowFormattedTime();
            if (!!comicData?.dateUpdate)
              comicData.dateUpdated = getNowFormattedTime();
            updateComic({
              id: updateComicForm.getFieldValue('id'),
              comicData: {
                ...comicData,
                id: updateComicForm.getFieldValue('id'),
              },
            });

            toggleUpdateComicModal();
          } else {
            showError('noform');
            return;
          }
        }}
        closable
        onCancel={toggleUpdateComicModal}
      >
        <ComicForm form={updateComicForm} id="updateComicForm" />
      </StyledModal>
      <div className="h-28"></div>
    </div>
  );
}

export default ComicChapterTable;
