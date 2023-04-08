import { useMutation } from 'react-query';
import { Button, Divider, Form, Input, Row, Typography } from 'antd';
import useTypeSafeTranslation from '@/shared/hooks/useTypeSafeTranslation';
import { useRouter } from 'next/router';
import { showError, showSuccess } from '@/configs/configTools/notification';
import AuthLayout from '@/shared/layouts/AuthLayout';
import withGuardRoute from '@/shared/hocs/withGuardRoute';
import Link from 'next/link';
import Head from 'next/head';
import { registerApi } from '@/api/register';
export interface RegisterFormValues {
  email: string;
  username: String;
  password: string;
}

function Register() {
  const { t } = useTypeSafeTranslation();
  const { replace } = useRouter();

  const { mutate: Register, isLoading } = useMutation(registerApi, {
    onError: showError,
    onSuccess() {
      replace('/login');
      showSuccess(t('message.registerSuccess'));
    },
  });
  const onSubmit = ({ email, username, password }: RegisterFormValues) => {
    Register({ email, username, password });
  };
  return (
    <AuthLayout>
      <Head>
        <title>{t('button.register')}</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div className="sticky flex h-full w-full items-center justify-center">
        <Form<RegisterFormValues>
          className="w-[34rem] bg-black-light py-10 px-8 rounded-2xl"
          layout="vertical"
          onFinish={onSubmit}
          scrollToFirstError
        >
          <div className="mb-6 flex flex-col gap-y-2 text-center text-white">
            <Typography.Text className="text-xl font-medium text-white">
              {t('button.register')}
            </Typography.Text>

            <Typography.Text className="text-base text-white">
              {t('register.description')}
            </Typography.Text>
          </div>

          <Form.Item
            label={<p className="text-white">{t('commonFields.email')}</p>}
            name="email"
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
                type: 'string',
              },
            ]}
            validateFirst
          >
            <Input
              className="text-dark-title"
              placeholder={t('placeholder.enterEmail')}
            />
          </Form.Item>
          <Form.Item
            label={<p className="text-white">{t('commonFields.username')}</p>}
            name="username"
            rules={[
              {
                message: t('validateMessage.required', {
                  name: t('commonFields.username'),
                }),
                required: true,
              },
              {
                message: t('validateMessage.invalid', {
                  name: t('commonFields.username'),
                }),
                whitespace: true,
              },
              {
                message: t('validateMessage.invalid', {
                  name: t('commonFields.username'),
                }),
                type: 'string',
              },
            ]}
            validateFirst
          >
            <Input
              className="text-dark-title"
              placeholder={t('placeholder.enterUsername')}
            />
          </Form.Item>

          <Form.Item
            className="mb-6"
            label={<p className="text-white">{t('commonFields.password')}</p>}
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
              placeholder={t('placeholder.enterUsername')}
              type="password"
              className="text-dark-title"
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
