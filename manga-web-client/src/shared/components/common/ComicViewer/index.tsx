import { LazyLoadImage } from 'react-lazy-load-image-component';
const comicPages = [
  {
    key: '1',
    original: 'https://example.com/comic/01.jpg',
    thumbnail: 'https://example.com/comic/thumbnails/01.jpg',
  },
  {
    key: '2',
    original: 'https://example.com/comic/02.jpg',
    thumbnail: 'https://example.com/comic/thumbnails/02.jpg',
  },
  {
    key: '3',
    original: 'https://example.com/comic/03.jpg',
    thumbnail: 'https://example.com/comic/thumbnails/03.jpg',
  },
  // ... and so on
];

export default function ComicViewer() {
  return (
    <div>
      {comicPages.map((page) => (
        <LazyLoadImage src={page.original} key={page.key} />
      ))}
    </div>
  );
}
