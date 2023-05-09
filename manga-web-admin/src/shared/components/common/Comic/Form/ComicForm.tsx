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
} from 'antd';
import { t } from 'i18next';
import DefaultImage from '@/assets/images/defaultImage.png';
import Image from 'next/image';
import { ChapterForm } from '@/pages/comic/[comicId]/chapter/[chapterId]';
import { useState } from 'react';
import { RcFile, UploadFile, UploadProps } from 'antd/es/upload';

interface ComicFormProps {
  initialValues: ChapterForm;
  onSubmit: () => void;
  isChapter?: boolean;
}
export default function ComicForm({
  initialValues,
  onSubmit,
  isChapter = false,
}: ComicFormProps) {
  const { t } = useTypeSafeTranslation();
  const [form] = Form.useForm();
  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  const onFinish = (values) => {
    onSubmit(values);
  };
  const statusOptions = [
    {
      label: t('comic.statusOptions.publishing'),
      value: 'Đang tiến hành',
    },
    {
      label: t('comic.statusOptions.publishing'),
      value: 'Đã hoàn thành',
    },
  ];
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewAvatar(file.url || (file.preview as string));
  };
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setPreviewAvatarList(newFileList);
  const [previewAvatarList, setPreviewAvatarList] = useState<UploadFile[]>([]);
  const [previewAvatar, setPreviewAvatar] = useState('');
  return (
    <>
      <Typography.Text className="">
        {t('button.addComic')}:{t('button.editComic')}
      </Typography.Text>
      <Form
        className="bg-dark-bg"
        initialValues={initialValues}
        onFinish={onFinish}
        form={form}
      >
        <Row>
          <Col xs={24} xl={16}>
            <Form.Item label={t('comic.title')} name="title">
              <Input className="text-dark-title" />
            </Form.Item>
            <Form.Item label={t('comic.anotherTitle')} name="anotherTitle">
              <Input />
            </Form.Item>
            <Form.Item label={t('comic.description')} name="description">
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col className="justify-center flex" xs={24} xl={8}>
            <Form.Item name="avatar">
              <Image
                src={previewAvatar || initialValues.avatar}
                width={200}
                height={200}
                className="aspect-square"
                alt={t('commonFields.avatar')}
              />
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                fileList={previewAvatarList}
                multiple={false}
                onChange={handleChange}
                onPreview={handlePreview}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

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

            <Form.Item
              label={t('comic.numberOfChapters')}
              name="numberOfChapter"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t('commonFields.datePublished')}
              name="datePublished"
            >
              <Input />
            </Form.Item>
          </>
        )}
      </Form>
    </>
  );
}
