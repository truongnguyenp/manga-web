import '@/components/common/Comic/Heading';
import '@/components/common/Comic/ChapterList';
import Heading from '@/components/common/Comic/Heading';
import ChapterList from '@/shared/components/common/Comic/ChapterList';
import { Comic } from '@/shared/utils/type';
function Comic() {
  const data: Comic = {
    recentRead: 1,
    heading: {
      title: 'Đồ án của Trường',
      image:
        'https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_thumbnails/tgctvc_thumb_640x960-772c4751a41d-1669704605211-KmcIfsor.jpg?v=0&maxW=420&format=jpg',
      viewerCount: 9999,
      likesCount: 9999,
      numberOfChapter: 9999,
      author: 'Truong',
      genres: 'Dev',
      rated: '13+',
      description:
        'Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer ineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend en ineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend en ineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend en ineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend engineer Frontend en',
    },
    chapters: [
      {
        chapterId: '1',
        chapterNumber: 1,
        title: 'FE',
        dateUpdated: '1/10/2023',
        price: 'FREE',
        link: 'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
      },
      {
        chapterId: '1',
        chapterNumber: 1,
        title: 'FE',
        dateUpdated: '1/10/2023',
        price: 'FREE',
        link: 'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
      },
      {
        chapterId: '1',
        chapterNumber: 1,
        title: 'FE',
        dateUpdated: '1/10/2023',
        price: 'FREE',
        link: 'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
      },
    ],
  };
  return (
    <>
      <Heading
        data={{
          ...data.heading,
          recentRead: data.chapters[data.recentRead],
          newestChapter: data.chapters[data.chapters.length - 1],
        }}
      />
      <ChapterList data={data.chapters} />
    </>
  );
}

export default Comic;
