import Head from 'next/head';
import Layout from '@/shared/layouts/Layout';
import Slider from '@/shared/components/home/Slider';
import Section from '@/shared/components/common/Section';
import { Row } from 'antd';
export default function Home() {
  return (
    <Layout>
      <Head key="head">a</Head>
      <Slider className="overflow-hidden"></Slider>
      <Row className="flex-wrap laptop:gap-y-3 laptop:mt-8">
        <Section></Section>
      </Row>
    </Layout>
  );
}
