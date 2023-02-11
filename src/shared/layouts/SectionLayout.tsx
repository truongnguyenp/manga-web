import { Row, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import StatusLegend from '../common/StatusLegend';
import LoadingScreen from '../common/LoadingScreen';
import type { TranslationKeys } from '#/generated/translationKeys';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

interface SectionLayoutProps {
  title?: TranslationKeys;
  children?: React.ReactElement | React.ReactElement[];
  loading?: boolean;
  hasStatusLegend?: boolean;
  backgroundColor?: string;
  closable?: boolean;
  headerClass?: string;
}

export default function SectionLayout({
  headerClass,
  children,
  title,
  loading,
  hasStatusLegend = true,
  backgroundColor = 'bg-white',
  closable = true,
}: SectionLayoutProps) {
  const { t } = useTypeSafeTranslation();
  const navigate = useNavigate();

  if (loading) return <LoadingScreen />;

  return (
    <>
      {closable && (
        <div
          className={twMerge(
            'hidden justify-between px-2 pt-6 pb-5 md:flex md:bg-gray-100 md:pb-1',
            headerClass,
          )}
        >
          <Typography.Title className="mb-0 text-2xl font-semibold text-grey">
            {!!title && t(title)}
          </Typography.Title>

          <div className="flex">
            {hasStatusLegend && (
              <div className="flex h-8 w-10 items-center justify-center">
                <StatusLegend />
              </div>
            )}

            <CloseOutlined
              className="flex h-8 w-8 items-center justify-center"
              onClick={() => navigate('/')}
            />
          </div>
        </div>
      )}

      <Row
        className={twMerge(
          'relative mx-auto flex h-full w-full max-w-container items-center justify-center rounded-2xl p-3 md:h-max md:flex-col md:rounded-none md:p-0',
          backgroundColor,
          closable && 'p-6',
        )}
      >
        {closable && (
          <div
            className="absolute -right-[0.938rem] -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md md:hidden"
            onClick={() => navigate('/')}
          >
            <CloseOutlined />
          </div>
        )}
        {hasStatusLegend && closable && (
          <div className="absolute -left-5 top-[1.563rem] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-md md:hidden">
            <StatusLegend />
          </div>
        )}

        <>{children}</>
      </Row>
    </>
  );
}
