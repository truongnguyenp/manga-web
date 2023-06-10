import { Divider, Row, Typography } from 'antd';
import Card from '@/components/common/Card';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import lodash from 'lodash';
import { twMerge } from 'tailwind-merge';
import { getNewestComicsApi } from '@/api/comic';
import { useQuery } from 'react-query';

interface SectionProps {
  data?: any[];
}

export default function Section({ data }: SectionProps) {
  const { Title } = Typography;
  const [currentPage, setCurrentPage] = useState(1);
  const PAGINATION_SIZE = 5;
  const QUANTITY = 10;
  const [list, setList] = useState<any[]>([]);
  useEffect(() => {
    // Fetch data from the API based on the current page

    const startIndex = 0;
    const endIndex = startIndex + PAGINATION_SIZE;
    const processedData = data?.slice(0, endIndex);

    setList(processedData);
  }, [currentPage]);

  return (
    <Row className="flex-wrap gap-y-3 w-full laptop:px-8 px-3 text-white">
      <Row className="w-full flex-wrap">
        <Divider type="vertical" className="bg-primary w-2 h-16" />
        <Title className="text-white text-6xl font-medium">Mới cập nhật</Title>
        <Pagination
          className="sm:ml-auto flex-nowrap flex basis-full sm:basis-auto justify-center items-center"
          current={currentPage}
          pageSize={PAGINATION_SIZE}
          total={QUANTITY}
          onChange={(page) => setCurrentPage(page)}
        />
      </Row>
      <Row
        className={twMerge(
          'flex gap-x-1 mx-2 laptop:gap-x-4 laptop:mx-auto w-full justify-center laptop:flex-nowrap'
        )}
      >
        {data?.map((item) => {
          return (
            <Card
              data={item}
              key={item.id}
              className="laptop:basis-1/6 w-[30%] laptop:w-auto"
            ></Card>
          );
        })}
      </Row>
    </Row>
  );
}
