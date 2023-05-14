import { Col, Row, Typography, Button } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';

import useTypeSafeTranslation from '@/shared/hooks/useTypeSafeTranslation';
interface ITableProps {
  data?: any;
  created?: boolean;
  className?: string;
  onMenuDelete?: () => void;
  onSubmit: () => void;
  onUpdate: () => void;
}
function ComicMenu({
  data,
  className,
  onMenuDelete,
  onUpdate,
  onSubmit,
  created,
}: ITableProps) {
  const { t } = useTypeSafeTranslation();
  const router = useRouter();
  const { comicId } = router.query;
  return (
    <>
      <div className="h-28"></div>

      <Row className=" bottom-0 w-full z-100 bg-orange-300 py-8 px-6">
        <Col xs={8}>
          {!created && (
            <Button className="btn-primary" onClick={onSubmit}>
              {t('button.addChapter', { name: 'v' })}
            </Button>
          )}
        </Col>
        <Col xs={6} className="flex flex-col gap-y-3 self">
          {created && (
            <>
              <Button className="btn-primary" onClick={onUpdate}>
                {t('button.update', { name: 'v' })}
              </Button>
              <Button className="btn-primary" onClick={onMenuDelete}>
                {t('button.deleteChapter')}
              </Button>
            </>
          )}
        </Col>
      </Row>
    </>
  );
}

export default ComicMenu;
