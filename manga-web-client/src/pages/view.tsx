import Head from 'next/head';
import Layout from '@/shared/layouts/Layout';
import Slider from '@/shared/components/home/Slider';
import Section from '@/shared/components/common/Section';
import { Row } from 'antd';
import ComicViewer from './../shared/components/common/ComicViewer/index';
export default function ViewComic() {
  return (
    <Layout>
      <Head key="head">a</Head>
      <ComicViewer />
    </Layout>
  );
}
