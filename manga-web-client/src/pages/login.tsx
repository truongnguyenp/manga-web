import { useMutation } from 'react-query';
import { Button, Divider, Form, Input, Row, Typography } from 'antd';
import useTypeSafeTranslation from '@/shared/hooks/useTypeSafeTranslation';
import { useRouter } from 'next/router';
import { showError, showSuccess } from '@/configs/configTools/notification';
import AuthLayout from '@/shared/layouts/AuthLayout';
import withGuardRoute from '@/shared/hocs/withGuardRoute';
import Link from 'next/link';
import Head from 'next/head';
import { setToken } from '@/shared/utils/localStorage';
import { loginApi } from '@/api/login';
export interface LoginFormValues {
  username: string;
  password: string;
}

function Login() {
  const { t } = useTypeSafeTranslation();
  const { replace } = useRouter();

  const { mutate: getLogin, isLoading } = useMutation(loginApi, {
    onError: showError,
    onSuccess({ data }) {
      setToken(data?.token);
      console.log(data?.token);
      replace('/');
      showSuccess(t('message.loginSuccess'));
    },
  });
  const onSubmit = ({ username, password }: LoginFormValues) => {
    getLogin({ username, password });
  };
  return (
    <AuthLayout>
      <Head>
        <title>{t('button.login')}</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div className="sticky flex h-full w-full items-center justify-center">
        <Form<LoginFormValues>
          className="w-[34rem] bg-black-light rounded-2xl p-10"
          layout="vertical"
          onFinish={onSubmit}
          scrollToFirstError
        >
          <div className="mb-6 flex flex-col gap-y-2 text-center text-white">
            <Typography.Text className="text-xl font-medium text-white">
              {t('button.login')}
            </Typography.Text>

            <Typography.Text className="text-base text-white">
              {t('login.description')}
            </Typography.Text>
          </div>

          <Form.Item
            label={<p className="text-white">{t('commonFields.email')}</p>}
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
              placeholder={t('placeholder.enterEmail')}
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
              placeholder={t('placeholder.enterPassword')}
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
            {t('button.login')}
          </Button>
          <Divider className="border-border-light block" type="horizontal" />
          <Row className="gap-x-1 justify-center">
            <Typography.Text className="text-white">
              {t('login.notHavingAccount')}
            </Typography.Text>
            <Link href="/register" className="text-primary">
              {t('button.register')}
            </Link>
          </Row>
        </Form>
      </div>
    </AuthLayout>
  );
}

export default withGuardRoute(Login);
