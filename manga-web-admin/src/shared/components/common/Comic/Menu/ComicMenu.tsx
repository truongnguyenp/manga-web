import { Col, Row, Typography, Button } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';

import useTypeSafeTranslation from '@/shared/hooks/useTypeSafeTranslation';
interface ITableProps {
  data?: any;
  className?: string;
  onMenuDelete: () => void;
}
function ComicMenu({ data, className, onMenuDelete }: ITableProps) {
  const { t } = useTypeSafeTranslation();
  const router = useRouter();
  const { comicId } = router.query;
  return (
    <>
      <div className="h-28"></div>

      <Row className="fixed left-0 bottom-0 w-full z-100 bg-red-500 py-8 px-6">
        <Col xs={8}>
          <Button className="btn-primary">
            {t('button.update', { name: 'v' })}
          </Button>
        </Col>
        <Col xs={6} className="flex flex-col gap-y-3 self">
          <Button className="btn-primary">
            {t('button.update', { name: 'v' })}
          </Button>
          <Button className="btn-primary" onClick={onMenuDelete}>
            {t('button.deleteChapter')}
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default ComicMenu;
