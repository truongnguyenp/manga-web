import Head from 'next/head';
import Layout from '@/shared/layouts/Layout';

import ComicViewer from '@/shared/components/common/ComicViewer/index';
export default function ViewComic() {
  return (
    <Layout>
      <Head key="head">a</Head>
      <ComicViewer />
    </Layout>
  );
}
