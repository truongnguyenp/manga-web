import useTypeSafeTranslation from '@/shared/hooks/useTypeSafeTranslation';
import { Button, Result, Typography } from 'antd';
import { useRouter } from 'next/router';

function NotFoundPage() {
  const { t } = useTypeSafeTranslation();
  const { replace } = useRouter();

  return (
    <div>
      <Result
        extra={
          <Button
            type="primary"
            className="bg-black"
            onClick={() => replace('/')}
          >
            {t('button.backHome')}
          </Button>
        }
        status="404"
        subTitle={t('empty')}
        title={
          <Typography.Title className="" level={1}>
            404
          </Typography.Title>
        }
      />
    </div>
  );
}

export default NotFoundPage;
