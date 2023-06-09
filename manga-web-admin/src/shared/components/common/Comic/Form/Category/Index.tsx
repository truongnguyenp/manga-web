import useTypeSafeTranslation from '@/shared/hooks/useTypeSafeTranslation';
import { Form, Input } from 'antd';
import type { FormInstance } from 'antd';
interface CategoryFormProps {
  form: FormInstance;
}
function CategoryForm({ form }: CategoryFormProps) {
  const { t } = useTypeSafeTranslation();
  return (
    <Form form={form}>
      <Form.Item label={t('commonFields.name')} name="name">
        <Input></Input>
      </Form.Item>
      <Form.Item label={t('comic.description')} name="description">
        <Input></Input>
      </Form.Item>
    </Form>
  );
}

export default CategoryForm;
