import Head from 'next/head';
import Layout from '@/shared/layouts/Layout';
import Slider from '@/shared/components/home/Slider';
import Section from '@/shared/components/common/Section';
import { Row } from 'antd';
import { useQuery } from 'react-query';
import { getNewestComicsApi } from '@/api/comic';
import { useEffect } from 'react';
export default function Home() {
  const { data: fetchedData, refetch } = useQuery(['newestComics'], () =>
    getNewestComicsApi()
  );
  //   const { data: fetchedData, refetch } = useQuery(['newestComics'], () =>
  //   getCo()
  // );
  // useEffect(() => {
  //   console.log(fetchedData);
  // }, [fetchedData]);

  return (
    <Layout>
      <Head key="head">a</Head>
      <Slider className="overflow-hidden"></Slider>
      <Row className="flex-wrap laptop:gap-y-3 laptop:mt-8">
        <Section data={fetchedData?.data}></Section>
      </Row>
    </Layout>
  );
}
