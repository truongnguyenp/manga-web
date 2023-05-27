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
} from 'antd';
import { t } from 'i18next';
import DefaultImage from '@/assets/images/defaultImage.png';
import Image from 'next/image';
import { ChapterForm } from '@/pages/comic/[comicId]/chapter/[chapterId]';
import { useState } from 'react';
import { RcFile, UploadFile, UploadProps } from 'antd/es/upload';
import { uploadImageApi } from '@/api/upload';

interface ComicFormProps {
  initialValues: ChapterForm;
  onSubmit: () => void;
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
    const response = await uploadImageApi(event.target.files[0], 1);
    form.setFieldValue('image', response?.data?.imagePath);
  };
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
              <Form.Item label={t('comic.chapterNumber')} name="chapterNumber">
                <Input.TextArea />
              </Form.Item>
            ) : (
              <>
                <Form.Item label={t('comic.anotherTitle')} name="alias">
                  <Input />
                </Form.Item>
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
              src={form.getFieldValue('image') || initialValues?.image}
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
            <Form.Item label={t('comic.author')} name="author">
              <Input />
            </Form.Item>
            <Form.Item label={t('comic.categories')} name="categories">
              <Input />
            </Form.Item>
            <Form.Item label={t('comic.status')} name="status">
              <Select options={statusOptions} />
            </Form.Item>
            <Form.Item label={t('comic.tags')} name="tags">
              <Input />
            </Form.Item>
          </>
        )}
      </Form>
    </>
  );
}
