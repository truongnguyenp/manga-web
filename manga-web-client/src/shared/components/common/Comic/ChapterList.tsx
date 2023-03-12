import { Row, Tabs, TabsProps, Typography } from 'antd';
import useTypeSafeTranslation from '@/hooks/useTypeSafeTranslation';
import styled from '@emotion/styled';
import Chapter from '@/components/common/Comic/Chapter';
interface IChapterListProps {
  data?: any;
}
function ChapterList({ data }: IChapterListProps) {
  const { t } = useTypeSafeTranslation();
  const StyledTabs = styled(Tabs)`
    width: 100% !important;
    .ant-tabs {
      &-nav {
        width: 100%;
        border: 0 solid #e5e7eb;
        background-color: #242424;

        &-list {
          margin: 0 auto;
          padding: 0.5rem 0;
        }
      }
    }
  `;
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <p>{t('comic.chapter')}</p>,
      children: (
        <div className="laptop:rounded-2xl bg-black-light p-8 laptop:mt-4 laptop:mx-80">
          <Typography.Text className="font-bold text-2xl">
            {`${data.length} ${t('comic.chapters')}`}
          </Typography.Text>
          {data.map((item: any) => (
            <div className="py-6 border-b border-solid" key={item.id}>
              <Chapter data={item} className="" />
            </div>
          ))}
        </div>
      ),
    },
    {
      key: '2',
      label: <p>{t('comic.comment')}</p>,
      children: <p>Content of Tab Pane 2</p>,
    },
  ];
  return (
    <Row>
      <StyledTabs defaultActiveKey="1" items={items} />;
    </Row>
  );
}

export default ChapterList;
