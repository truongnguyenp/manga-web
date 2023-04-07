import { LazyLoadImage } from 'react-lazy-load-image-component';
const comicPages = [
  {
    key: '1',
    original:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
    thumbnail:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
  },
  {
    key: '2',
    original:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
    thumbnail:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
  },
  {
    key: '3',
    original:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
    thumbnail:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
  },
  {
    key: '4',
    original:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
    thumbnail:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
  },
  {
    key: '3',
    original:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
    thumbnail:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
  },
  {
    key: '3',
    original:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
    thumbnail:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
  },
  {
    key: '3',
    original:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
    thumbnail:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
  },
  {
    key: '3',
    original:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
    thumbnail:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
  },
  {
    key: '3',
    original:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
    thumbnail:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
  },
  {
    key: '3',
    original:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
    thumbnail:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
  },
  {
    key: '3',
    original:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
    thumbnail:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
  },
  {
    key: '3',
    original:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
    thumbnail:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
  },
  {
    key: '3',
    original:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
    thumbnail:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
  },
  {
    key: '3',
    original:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
    thumbnail:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
  },
  {
    key: '3',
    original:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
    thumbnail:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
  },
  {
    key: '3',
    original:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
    thumbnail:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
  },
  {
    key: '3',
    original:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
    thumbnail:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
  },

  {
    key: '3',
    original:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
    thumbnail:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
  },
  {
    key: '3',
    original:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
    thumbnail:
      'https://pops-comic-vn.akamaized.net/api/v2/containers/file4/cms_comic/6385abc1e00350005a48f6d4/6385b08be00350005a48f6d8/CHAP1__1__1675675890340-parts-00.jpg?format=webp',
  },
  // ... and so on
];

export default function ComicViewer() {
  return (
    <div className="px-4 bg-center flex flex-col">
      {comicPages.map((page) => (
        <LazyLoadImage src={page.original} key={page.key} />
      ))}
    </div>
  );
}
