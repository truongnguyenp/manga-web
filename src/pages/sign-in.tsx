import { useMutation } from 'react-query';
import { Button, Form, Input, Typography } from 'antd';
import Layout from '@/shared/layouts/Layout';
import withGuardRoute from '@/shared/hocs/withGuardRoute';
import useTypeSafeTranslation from '@/shared/hooks/useTypeSafeTranslation';
import { useRouter } from 'next/router';
import { showError, showSuccess } from '@/configs/configTools/notification';

interface SignInFormValues {
  email: string;
  name: string;
}

function SignIn() {
  const { t } = useTypeSafeTranslation();
  const { replace } = useRouter();

  const { isLoading } = useMutation({
    onError: showError,
    onSuccess(data) {
      showSuccess(t('message.loginSuccess'));
      replace('/');
    },
  });
  const onSubmit = (values: SignInFormValues) => {
    console.log(values);
  };
  return (
    <Layout isSignInLayout>
      <div className="sticky flex h-full w-full items-center justify-center">
        <Form<SignInFormValues>
          className="w-[30.5rem] rounded-2x"
          layout="vertical"
          onFinish={onSubmit}
          scrollToFirstError
        >
          <div className="mb-6 flex flex-col gap-y-2">
            <Typography.Text className="text-base text-grey-primary-500">
              {t('signIn.description')}
            </Typography.Text>
          </div>

          <Form.Item
            label={t('commonFields.email')}
            name="username"
            rules={[
              {
                message: t('validateMessage.required', {
                  name: t('commonFields.email'),
                }),
                required: true,
              },
              {
                message: t('validateMessage.invalid', {
                  name: t('commonFields.email'),
                }),
                whitespace: true,
              },
              {
                message: t('validateMessage.invalid', {
                  name: t('commonFields.email'),
                }),
                type: 'email',
              },
            ]}
            validateFirst
          >
            <Input placeholder={t('placeholder.enterEmail')} />
          </Form.Item>

          <Form.Item
            className="mb-6"
            label={t('commonFields.name')}
            name="name"
            rules={[
              {
                message: t('validateMessage.required', {
                  name: t('commonFields.name'),
                }),
                required: true,
              },
              {
                message: t('validateMessage.required', {
                  name: t('commonFields.name'),
                }),
                whitespace: true,
              },
            ]}
          >
            <Input placeholder={t('placeholder.enterLastNameDecreased')} />
          </Form.Item>

          <Button
            block
            className="mt-4 rounded-3xl text-sm sm:mt-0"
            htmlType="submit"
            loading={isLoading}
            type="primary"
          >
            {t('button.signIn')}
          </Button>
        </Form>
      </div>
    </Layout>
  );
}

export default withGuardRoute(SignIn);
