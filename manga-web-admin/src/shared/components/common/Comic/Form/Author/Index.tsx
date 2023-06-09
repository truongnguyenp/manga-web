import { Form, Input } from 'antd';
import type { FormInstance } from 'antd';
import useTypeSafeTranslation from '@/shared/hooks/useTypeSafeTranslation';
interface AuthorFormProps {
  form: FormInstance;
}
function AuthorForm({ form }: AuthorFormProps) {
  const { t } = useTypeSafeTranslation();
  return (
    <Form form={form}>
      <Form.Item label={t('commonFields.name')} name="name">
        <Input></Input>
      </Form.Item>
      <Form.Item label={t('commonFields.national')} name="national">
        <Input></Input>
      </Form.Item>
    </Form>
  );
}

export default AuthorForm;
