import { useRouter } from 'next/router';
import useTypeSafeTranslation from '@/hooks/useTypeSafeTranslation';
import { searchStoriesApi } from '@/api/comic';
import Head from 'next/head';
import Layout from '@/shared/layouts/Layout';
import Slider from '@/shared/components/home/Slider';
import Section from '@/shared/components/common/Section';
import { Row, Typography } from 'antd';
import { useQuery } from 'react-query';
import { twMerge } from 'tailwind-merge';
import Card from '@/shared/components/common/Card';

export default function SearchPage() {
  const router = useRouter();
  const { searchString, page, nStories } = router.query; // Extracting route parameters
  const { t } = useTypeSafeTranslation();
  const { data: comics, refetch } = useQuery(['searchStory'], () =>
    searchStoriesApi(searchString, page, nStories)
  );
  console.log(comics);
  // Call the searchStories function or perform any other necessary actions
  return (
    <Layout>
      <Head key="head">a</Head>
      <Typography.Title level={2} className="text-center">
        {`Tìm kiếm truyện: ${searchString}`}
      </Typography.Title>
      <Row
        className={twMerge(
          'flex gap-x-1 mx-2 laptop:gap-x-4 laptop:mx-auto w-full justify-center laptop:flex-nowrap'
        )}
      >
        {comics?.data?.map((item) => {
          return (
            <Card
              data={item}
              key={item.id}
              className="laptop:basis-1/6 w-[30%] laptop:w-auto"
            ></Card>
          );
        })}
      </Row>
    </Layout>
  );
}
