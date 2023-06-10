import '@/components/common/Comic/Heading';
import '@/components/common/Comic/ChapterList';
import Heading from '@/components/common/Comic/Heading';
import ChapterList from '@/shared/components/common/Comic/ChapterList';
function Comic({ data }) {
  // const data = {
  //   heading: {
  //     title: 'Đồ án của Trường',
  //     image:
  //       'https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_thumbnails/tgctvc_thumb_640x960-772c4751a41d-1669704605211-KmcIfsor.jpg?v=0&maxW=420&format=jpg',
  //     viewerCount: 9999,
  //     likesCount: 9999,
  //     numberOfChapter: 9999,
  //     author: 'Truong',
  //     genres: 'Dev',
  //     rated: '13+',
  //     description: 's',
  //   },
  //   chapters: [
  //     {
  //       title: 'FE',
  //       dateUpdated: '1/10/2023',
  //       price: 'FREE',
  //     },
  //     {
  //       title: 'FE',
  //       dateUpdated: '1/10/2023',
  //       price: 'FREE',
  //     },
  //     {
  //       title: 'FE',
  //       dateUpdated: '1/10/2023',
  //       price: 'FREE',
  //     },
  //     {
  //       title: 'FE',
  //       dateUpdated: '1/10/2023',
  //       price: 'FREE',
  //     },
  //   ],
  // };
  console.log(data);
  return (
    <>
      <Heading
        data={{
          ...data?.story,
          numberOfChapter: data?.chapters?.length,
          recentRead: data?.chapters?.[0]?.id,
          newestChapter: data?.chapters?.[data?.chapters?.length - 1]?.id,
        }}
      ></Heading>
      <ChapterList data={data?.chapters} />
    </>
  );
}

export default Comic;
