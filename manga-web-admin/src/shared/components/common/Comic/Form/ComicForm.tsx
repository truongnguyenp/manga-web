import useTypeSafeTranslation from '@/shared/hooks/useTypeSafeTranslation';
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
  FormInstance,
  DatePicker,
  Table,
} from 'antd';
import { t } from 'i18next';
import DefaultImage from '@/assets/images/defaultImage.png';
import Image from 'next/image';
import { ChapterForm } from '@/pages/comic/[comicId]/chapter/[chapterId]';
import { useState } from 'react';
import { RcFile, UploadFile, UploadProps } from 'antd/es/upload';
import { uploadImageApi } from '@/api/upload';
import { AutoComplete } from 'antd';
import { getAuthorsApi, getCategoriesApi } from '@/api/comic';
import { useQuery } from 'react-query';
import useToggle from '@/shared/hooks/useToggle';
interface ComicFormProps {
  initialValues?: ChapterForm;
  onSubmit?: () => void;
  isChapter?: boolean;
  id?: string;
  form: FormInstance;
}
export default function ComicForm({
  initialValues,
  onSubmit,
  id,
  isChapter = false,
  form,
}: ComicFormProps) {
  console.log(initialValues);
  const { t } = useTypeSafeTranslation();

  const onFinish = (values) => {
    onSubmit(values);
  };
  const statusOptions = [
    {
      label: t('comic.statusOptions.published'),
      value: true,
    },
    {
      label: t('comic.statusOptions.publishing'),
      value: false,
    },
  ];

  const handleFileInputChange = async (event) => {
    if (!event.target.files[0]) return;
    const response = await uploadImageApi(event.target.files[0], 1);
    form.setFieldValue('image', response?.data?.imagePath);
  };
  const { data: authorData } = useQuery(['getAuthors'], () => getAuthorsApi());
  const { data: categoryData } = useQuery(['getCategories'], () =>
    getCategoriesApi()
  );
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const [isShowAddAuthor, toggleShowAddAuthor] = useToggle(false);
  const initialCategory = categoryData?.data.find(
    (category) => category.id === form.getFieldValue('categoryId')
  );
  const initialAuthor = authorData?.data.find(
    (author) => author.id === form.getFieldValue('authorId')
  );
  console.log(initialAuthor);
  return (
    <>
      <Typography.Text className="">
        {t('button.addComic')}:{t('button.editComic')}
      </Typography.Text>
      <Form
        form={form}
        id={id}
        className="bg-dark-bg"
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Row>
          <Col xs={24} xl={16}>
            <Form.Item label={t('comic.title')} name="name">
              <Input className="text-dark-title" />
            </Form.Item>
            {isChapter ? (
              <>
                <Form.Item
                  label={t('comic.chapterNumber')}
                  name="chapterNumber"
                >
                  <Input.TextArea />
                </Form.Item>
                {/* <Form.Item label={t('comic.anotherTitle')} name="alias">
                  <Input />
                </Form.Item> */}
              </>
            ) : (
              <>
                <Form.Item label={t('comic.description')} name="description">
                  <Input.TextArea />
                </Form.Item>
              </>
            )}
          </Col>
          <Col className="justify-center flex" xs={24} xl={8}>
            <Form.Item name="image" />
            <img
              className="h-20 w-20"
              src={form.getFieldValue('image')}
              alt={t('commonFields.avatar')}
            />
            <input
              type="file"
              onChange={handleFileInputChange}
              accept="image/*"
            />
          </Col>
        </Row>
        {/* <Form.Item label={t('comic.numberOfChapters')} name="numberOfChapter">
        <Input/>
        </Form.Item>
        <Form.Item label={t('commonFields.datePublished')} name="datePublished">
        <Input/>
        </Form.Item> */}
        {!isChapter && (
          <>
            <Form.Item label={t('comic.author')}>
              <AutoComplete
                style={{ width: 200 }}
                options={authorData?.data.map((author) => ({
                  label: author?.name, // Displayed label
                  id: author?.id, // Unique value for the item
                  value: author?.name, // Actual value
                }))}
                defaultValue={{
                  label: initialAuthor?.name, // Displayed label
                  id: initialAuthor?.id, // Unique value for the item
                  value: initialAuthor?.name, // Actual value
                }}
                onSelect={(value, option) => {
                  form.setFieldValue('authorId', option.id);
                  console.log(form.getFieldsValue());
                }} // Update the selected author
                notFoundContent={
                  <Button className="btn-primary_transparent">
                    Add author
                  </Button>
                }
                placeholder="try to type `b`"
                filterOption={(inputValue, option) =>
                  option?.label
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            </Form.Item>
            <Form.Item label={t('comic.categories')}>
              <AutoComplete
                style={{ width: 200 }}
                options={categoryData?.data?.map((category) => ({
                  label: category?.name,
                  id: category?.id,
                  value: category?.name,
                }))}
                defaultValue={{
                  label: initialCategory?.name, // Displayed label
                  id: initialCategory?.id, // Unique value for the item
                  value: initialCategory?.name, // Actual value
                }}
                onSelect={(value, option) =>
                  form.setFieldValue('categoryId', option.id)
                }
                placeholder="try to type `b`"
                filterOption={(inputValue, option) =>
                  option?.label
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            </Form.Item>
            {!isChapter && (
              <>
                <Form.Item name="authorId" className="hidden"></Form.Item>
                <Form.Item
                  name="categoryId"
                  className="hidden"
                ></Form.Item>{' '}
              </>
            )}

            {/* <Form.Item label={t('comic.status')} name="status">
              <Select options={statusOptions} />
            </Form.Item> */}
            {/* <Form.Item label={t('comic.tags')} name="tags">
              <Input />
            </Form.Item> */}
          </>
        )}
      </Form>
    </>
  );
}
