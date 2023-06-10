import Layout from '@/shared/layouts/Layout';
import ComicChapterTable from '@/shared/components/common/Comic';
import withGuardRoute from '@/shared/hocs/withGuardRoute';
import { Button, Form, Input, Modal, Table, Typography } from 'antd';
import { useMutation, useQuery } from 'react-query';
import {
  postAuthorApi,
  getAuthorsApi,
  deleteAuthorApi,
  updateAuthorApi,
} from '@/api/comic';
import { showError, showSuccess } from '@/configs/configTools/notification';
import { v4 as uuid } from 'uuid';
import useToggle from '@/shared/hooks/useToggle';
import { StyledModal } from '@/shared/utils/constants';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import AuthorForm from '@/shared/components/common/Comic/Form/Author/Index';
import { getFormattedTime } from '@/shared/utils/tool';
import useTypeSafeTranslation from '@/shared/hooks/useTypeSafeTranslation';
function Index() {
  const { t } = useTypeSafeTranslation();
  const [isOpenUpdateAuthorModal, toggleUpdateAuthorModal] = useToggle(false);
  const [isAddAuthorModalVisible, toggleAddAuthorModal] = useToggle(false);
  //write react query for  get Author api
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [updateAuthorInitialValue, setUpdateAuthorInitialValue] =
    useState(null);
  const { data, refetch } = useQuery(['getAuthors'], () => getAuthorsApi());
  const { mutate: postAuthor } = useMutation(postAuthorApi, {
    onSuccess: () => {
      refetch();
      showSuccess(t('message.createAuthorSuccess'));
    },
    onError: (error) => showError(error),
  });
  const { mutate: deleteAuthor } = useMutation(deleteAuthorApi, {
    onSuccess: () => {
      refetch();
      showSuccess(t('message.deleteAuthorSuccess'));
    },
    onError: (error) => showError(error),
  });
  //update Author react-query

  const { mutate: updateAuthor } = useMutation(
    ({ id, authorData }) => updateAuthorApi(id, authorData),
    {
      onSuccess: () => {
        refetch();
        showSuccess(t('message.updateChapterSuccess'));
      },
      onError: (error) => showError(error),
    }
  );
  const columns: ColumnsType<DataType> = [
    {
      title: t('commonFields.index'),
      dataIndex: 'index',
    },
    {
      title: t('commonFields.name'),
      dataIndex: 'name',
    },
    {
      title: t('commonFields.national'),
      dataIndex: 'national',
    },
    {
      title: t('commonFields.dateModified'),
      dataIndex: 'lastModified',
      sorter: {
        compare: (a, b) =>
          Date.parse(a.dateModified) - Date.parse(b.dateModified),
        multiple: 2,
      },
      render: (text, record) => {
        const lastModified = record.lastModified;
        const dateCreated = record.created;

        const displayDate = lastModified || dateCreated;

        return displayDate ? displayDate : '-';
      },
    },
    {
      title: t('commonFields.action'),
      dataIndex: 'deleteChapter',
    },
  ];
  const [addAuthorForm] = Form.useForm();
  const [updateAuthorForm] = Form.useForm();

  return (
    <Layout>
      <div className="flex gap-x-4">

      <Typography.Text
        className="font-medium text-xl
          "
      >
        {t('commonFields.authorList')}:
      </Typography.Text>
      <Button
        className="btn-primary"
        onClick={() => {
          toggleAddAuthorModal();
        }}
      >
        {t('button.createAuthor')}
      </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data?.data.map((item, index) => {
          return {
            ...item,
            index: index + 1,
            lastModified: getFormattedTime(
              item.lastModified || item.dateCreated
            ),
            deleteChapter: (
              <div className="flex justify-center">
                <Button
                  onClick={() => {
                    updateAuthorForm.setFieldsValue(item);
                    toggleUpdateAuthorModal();
                    setSelectedAuthor(item.id);
                    setUpdateAuthorInitialValue(item);
                  }}
                >
                  <EditOutlined />
                </Button>
                <Button
                  onClick={() => {
                    deleteAuthor(item.id);
                  }}
                >
                  <DeleteOutlined />
                </Button>
              </div>
            ),
          };
        })}
      ></Table>

      <StyledModal
        closable
        onCancel={toggleAddAuthorModal}
        open={isAddAuthorModalVisible}
        onOk={() => {
          toggleAddAuthorModal();
          postAuthor({ ...addAuthorForm.getFieldsValue(), id: uuid() });
        }}
      >
        <AuthorForm form={addAuthorForm} />
      </StyledModal>
      <StyledModal
        closable
        onCancel={toggleUpdateAuthorModal}
        open={isOpenUpdateAuthorModal}
        onOk={() => {
          toggleUpdateAuthorModal();
          updateAuthor({
            id: selectedAuthor,
            authorData: {
              id: selectedAuthor,
              description: 'string',
              ...addAuthorForm.getFieldsValue(),
            },
          });
        }}
      >
        <AuthorForm form={addAuthorForm} />
      </StyledModal>
      <StyledModal
        closable
        onCancel={toggleUpdateAuthorModal}
        open={isOpenUpdateAuthorModal}
        onOk={() => {
          toggleUpdateAuthorModal();
          updateAuthor({
            id: selectedAuthor,
            authorData: {
              id: selectedAuthor,
              description: 'string',
              ...form.getFieldsValue(),
            },
          });
        }}
      >
        <AuthorForm form={updateAuthorForm} />
      </StyledModal>
      <StyledModal
        closable
        onCancel={toggleUpdateAuthorModal}
        open={isOpenUpdateAuthorModal}
        onOk={() => {
          toggleUpdateAuthorModal();
          updateAuthor({
            id: selectedAuthor,
            authorData: {
              id: selectedAuthor,
              description: 'string',
              ...updateAuthorForm.getFieldsValue(),
            },
          });
        }}
      >
        <AuthorForm form={updateAuthorForm} />
      </StyledModal>
    </Layout>
  );
}

export default withGuardRoute(Index, true);
