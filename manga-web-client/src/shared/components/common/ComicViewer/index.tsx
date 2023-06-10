import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function ComicViewer({ data }) {
  return (
    <div className="px-4 bg-center flex flex-col">
      {data?.map((page) => (
        <LazyLoadImage src={page?.imagePath} key={page?.key} />
      ))}
    </div>
  );
}
