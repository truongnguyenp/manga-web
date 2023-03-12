import { Col, Row, Typography } from 'antd';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
interface ITableProps {
  data?: any;
  className?: string;
}
function Chapter({ data, className }: ITableProps) {
  console.log(data);
  return (
    <Row className={twMerge('items-center flex-1 content-center', className)}>
      <Image
        className="rounded-xl object-fit w-32 h-32"
        alt={data.title}
        width={128}
        height={128}
        src={
          'https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_thumbnails/tgctvc_thumb_640x960-772c4751a41d-1669704605211-KmcIfsor.jpg?v=0&maxW=420&format=jpg'
        }
      />

      <Col className="px-6 flex flex-col flex-1 gap-2">
        <Typography.Text className="text-white text-2xl desktop:text-3xl font-bold">
          {data.title}
        </Typography.Text>
        <Typography.Text className="text-gray-400">
          {data.dateUpdated}
        </Typography.Text>
      </Col>
      <Col className="text-right text-primary font-bold">{data.price}</Col>
    </Row>
  );
}

export default Chapter;
