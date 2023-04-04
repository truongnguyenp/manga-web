import { Divider, Row, Typography } from 'antd';
import Card from '@/components/common/Card';
import { Pagination } from 'antd';
import { useState } from 'react';
import lodash from 'lodash';
import { twMerge } from 'tailwind-merge';
interface SectionProps {
  d?: any;
}

export default function Section({}: SectionProps) {
  const { Title } = Typography;
  const data = {
    title: 'Title',
    items: [
      {
        title: 'AWS',
        image: 'https://picsum.photos/200/300',
        id: 'v',
      },
      {
        title: 'AWS',
        image: 'https://picsum.photos/200/300',
        id: 'v',
      },
      {
        title: 'AWS',
        image: 'https://picsum.photos/200/300',
        id: 'v',
      },
      {
        title: 'BE',
        image: 'https://picsum.photos/200/300',
        id: 'v',
      },
      {
        title: 'BE',
        image: 'https://picsum.photos/200/300',
        id: 'v',
      },
      {
        title: 'BE',
        image: 'https://picsum.photos/200/300',
        id: 'v',
      },
      {
        title: 'BE',
        image: 'https://picsum.photos/200/300',
        id: 'v',
      },
      {
        title: 'FE',
        image: 'https://picsum.photos/200/300',
        id: 'v',
      },
      {
        title: 'FE',
        image: 'https://picsum.photos/200/300',
        id: 'v',
      },
      {
        title: 'FE',
        image: 'https://picsum.photos/200/300',
        id: 'v',
      },
      {
        title: 'AWS',
        image: 'https://picsum.photos/200/300',
        id: 'v',
      },
      {
        title: 'AWS',
        image: 'https://picsum.photos/200/300',
        id: 'v',
      },
      {
        title: 'AWS',
        image: 'https://picsum.photos/200/300',
        id: 'v',
      },
      {
        title: 'AWS',
        image: 'https://picsum.photos/200/300',
        id: 'v',
      },
      {
        title: 'AWS',
        image: 'https://picsum.photos/200/300',
        id: 'v',
      },
      {
        title: 'AWS',
        image: 'https://picsum.photos/200/300',
        id: 'v',
      },
      {
        title: 'AWS',
        image: 'https://picsum.photos/200/300',
        id: 'v',
      },
      {
        title: 'AWS',
        image: 'https://picsum.photos/200/300',
        id: 'v',
      },
      {
        title: 'AWS',
        image: 'https://picsum.photos/200/300',
        id: 'v',
      },
      {
        title: 'AWS',
        image: 'https://picsum.photos/200/300',
        id: 'v',
      },
      {
        title: 'AWS',
        image: 'https://picsum.photos/200/300',
        id: 'v',
      },
    ],
  };
  let PAGINATION_SIZE = 6;
  const QUANTITY = 30;
  const [items, setList] = useState(
    lodash.chunk(data.items, PAGINATION_SIZE)[0]
  );
  return (
    <Row className="flex-wrap gap-y-3 w-full laptop:px-8 px-3 text-white">
      <Row className="w-full flex-wrap">
        <Divider type="vertical" className="bg-primary w-2 h-16" />
        <Title className="text-white text-6xl font-medium">{data.title}</Title>
        <Pagination
          className="sm:ml-auto flex-nowrap flex basis-full sm:basis-auto justify-center items-center"
          defaultCurrent={1}
          pageSize={PAGINATION_SIZE}
          total={QUANTITY}
          onChange={(index) => {
            if (data?.items?.length - index * PAGINATION_SIZE > 0) {
              setList(lodash.chunk(data.items, PAGINATION_SIZE)[index - 1]);
            }
          }}
        />
      </Row>
      <Row
        className={twMerge(
          'flex gap-x-1 mx-2 laptop:gap-x-4 laptop:mx-auto w-full justify-center laptop:flex-nowrap'
        )}
      >
        {items?.map((item) => {
          return (
            <Card
              data={{ ...item, path: `comic/${item.id}` }}
              key={item.id}
              className="laptop:basis-1/6 w-[30%] laptop:w-auto"
            ></Card>
          );
        })}
      </Row>
    </Row>
  );
}
