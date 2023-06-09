import Layout from '@/shared/layouts/Layout';
import ComicChapterTable from '@/shared/components/common/Comic';
import withGuardRoute from '@/shared/hocs/withGuardRoute';
import { Button, Form, Input, Table, Typography } from 'antd';
import { useMutation, useQuery } from 'react-query';
import {
  getCategoriesApi,
  postCategoryApi,
  deleteCategoryApi,
  updateCategoryApi,
} from '@/api/comic';
import { showError, showSuccess } from '@/configs/configTools/notification';
import { v4 as uuid } from 'uuid';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import useToggle from '@/shared/hooks/useToggle';
import { StyledModal } from '@/shared/utils/constants';
import { useState, useEffect } from 'react';
import CategoryForm from '@/shared/components/common/Comic/Form/Category/Index';
import { getFormattedTime } from '@/shared/utils/tool';
import useTypeSafeTranslation from '@/shared/hooks/useTypeSafeTranslation';
function Index() {
  const { t } = useTypeSafeTranslation();
  const [isOpenUpdateCategoryModal, toggleUpdateCategoryModal] =
    useToggle(false);

  const { data, refetch } = useQuery(['getCategories'], () =>
    getCategoriesApi()
  );
  const { mutate: postCategory } = useMutation(postCategoryApi, {
    onSuccess: () => {
      refetch();
      showSuccess(t('message.createCategorySuccess'));
    },
    onError: (error) => showError(error),
  });
  const { mutate: deleteCategory } = useMutation(deleteCategoryApi, {
    onSuccess: () => {
      refetch();
      showSuccess(t('message.deleteCategorySuccess'));
    },
    onError: (error) => showError(error),
  });

  const { mutate: updateCategory } = useMutation(
    ({ id, categoryData }) => updateCategoryApi(id, categoryData),
    {
      onSuccess: () => {
        refetch();
        showSuccess(t('message.updateChapterSuccess'));
      },
      onError: (error) => showError(error),
    }
  );
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAddCategoryModalVisible, toggleAddCategoryModal] = useToggle(false);
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
      title: t('comic.description'),
      dataIndex: 'description',
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
  const [addCategoryForm] = Form.useForm();
  const [updateCategoryForm] = Form.useForm();

  return (
    <Layout>
      <div className="flex gap-x-4">
        <Typography.Text
          className="font-medium text-xl
          "
        >
          {t('commonFields.categoryList')}:
        </Typography.Text>
        <Button
          className="btn-primary"
          onClick={() => {
            toggleAddCategoryModal();
          }}
        >
          {t('button.createCategory')}
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
                    toggleUpdateCategoryModal();
                    setSelectedCategory(item.id);
                    updateCategoryForm.setFieldsValue(item);
                  }}
                >
                  <EditOutlined />
                </Button>
                <Button
                  onClick={() => {
                    deleteCategory(item.id);
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
        onCancel={toggleAddCategoryModal}
        open={isAddCategoryModalVisible}
        onOk={() => {
          toggleAddCategoryModal();
          postCategory({ ...addCategoryForm.getFieldsValue(), id: uuid() });
        }}
      >
        <CategoryForm form={addCategoryForm} />
      </StyledModal>

      <StyledModal
        closable
        onCancel={toggleUpdateCategoryModal}
        open={isOpenUpdateCategoryModal}
        onOk={() => {
          toggleUpdateCategoryModal();
          updateCategory({
            id: selectedCategory,
            categoryData: {
              id: selectedCategory,
              description: 'string',
              alias: 'string',
              keyword: 'string',
              created: '2023-06-03T05:30:36.977Z',
              lastModified: '2023-06-03T05:30:36.977Z',
              ...updateCategoryForm.getFieldsValue(),
            },
          });
        }}
      >
        <CategoryForm form={updateCategoryForm} />
      </StyledModal>
    </Layout>
  );
}

export default withGuardRoute(Index, true);
