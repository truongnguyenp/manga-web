import { useMutation } from 'react-query';
import { Button, Divider, Form, Input, Row, Typography } from 'antd';
import useTypeSafeTranslation from '@/shared/hooks/useTypeSafeTranslation';
import { useRouter } from 'next/router';
import { showError, showSuccess } from '@/configs/configTools/notification';
import AuthLayout from '@/shared/layouts/AuthLayout';
import withGuardRoute from '@/shared/hocs/withGuardRoute';
import Link from 'next/link';
import Head from 'next/head';
interface RegisterFormValues {
  email: string;
  name: string;
}

function Register() {
  const { t } = useTypeSafeTranslation();
  const { replace } = useRouter();

  const { isLoading } = useMutation({
    onError: showError,
    onSuccess() {
      showSuccess(t('message.registerSuccess'));
      replace('/');
    },
  });
  const onSubmit = (values: RegisterFormValues) => {
    console.log(values);
  };
  return (
    <AuthLayout>
      <Head>
        <title>{t('button.register')}</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div className="sticky flex h-full w-full items-center justify-center">
        <Form<RegisterFormValues>
          className="w-[34rem] bg-white py-10 px-8 rounded-2xl"
          layout="vertical"
          onFinish={onSubmit}
          scrollToFirstError
        >
          <div className="mb-6 flex flex-col gap-y-2 text-center">
            <Typography.Text className="text-xl font-medium">
              {t('button.register')}
            </Typography.Text>

            <Typography.Text className="text-base text-grey-primary-500">
              {t('register.description')}
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
            label={t('commonFields.password')}
            name="password"
            rules={[
              {
                message: t('validateMessage.required', {
                  name: t('commonFields.password'),
                }),
                required: true,
              },
              {
                message: t('validateMessage.required', {
                  name: t('commonFields.password'),
                }),
                whitespace: true,
              },
            ]}
          >
            <Input
              placeholder={t('placeholder.enterLastNameDecreased')}
              type="password"
            />
          </Form.Item>
          <Button
            block
            className="mt-4 rounded-3xl sm:mt-0 bg-primary font-medium"
            htmlType="submit"
            loading={isLoading}
            type="primary"
          >
            {t('button.register')}
          </Button>
          <Divider className="border-border-light block" type="horizontal" />
          <Row className="gap-x-1 justify-center">
            <Typography.Text>{t('register.havingAccount')}</Typography.Text>
            <Link href="/login" className="text-primary">
              {t('button.login')}
            </Link>
          </Row>
        </Form>
      </div>
    </AuthLayout>
  );
}

export default withGuardRoute(Register);
