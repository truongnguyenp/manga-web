import withGuardRoute from '@/shared/hocs/withGuardRoute';
import ProfileTabs from '@/shared/components/common/Profile';
import Layout from '@/shared/layouts/Layout';
import { useRouter } from 'next/router';
import { Button, DatePicker, Form, Input } from 'antd';
import useTypeSafeTranslation from '@/shared/hooks/useTypeSafeTranslation';

function Index() {
  const { t } = useTypeSafeTranslation();
  const router = useRouter;
  return (
    <Layout>
      <div className="flex m-8 rounded-xl border-primary bg-secondary text-white">
        <ProfileTabs
          className="w-1/4 border-r-white border-r border-solid"
          section={String(router().query.path)}
        />
        <div className="w-3/4">
          {/* <Form>
            <div className="py-4 px-8">
              <Form.Item
                label={
                  <p className="text-white">{t('commonFields.oldPassword')}</p>
                }
              >
                <Input placeholder="oldPassword" width={48}></Input>
              </Form.Item>
              <Form.Item
                label={
                  <p className="text-white">{t('commonFields.newPassword')}</p>
                }
              >
                <Input placeholder="newPassword" width={48}></Input>
              </Form.Item>
              <div className="flex gap-4">
                <Button>
                  <p className="text-white">{t('button.changePassword')}</p>
                </Button>
                <Button>
                  <p className="text-white">{t('button.cancel')}</p>
                </Button>
              </div>
            </div>
          </Form> */}
          <Form>
            <div className="py-4 px-8">
              <Form.Item
                label={
                  <p className="text-white">{t('commonFields.username')}</p>
                }
              >
                <Input placeholder="username" width={48}></Input>
              </Form.Item>
              <Form.Item
                label={
                  <p className="text-white" text>
                    {t('commonFields.dateOfBirth')}
                  </p>
                }
              >
                <DatePicker
                  placeholder="dateOfBirth"
                  className="bg-dark-bg text-dark-bg"
                ></DatePicker>
              </Form.Item>
              <Form.Item>
                <Button>
                  <p className="text-white">{t('button.update')}</p>
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  );
}

export default withGuardRoute(Index);
