import { getComicRoute } from '@/shared/utils/tool';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';
interface CardProps {
  data: any;
  imgWidth?: number;
  imgHeight?: number;

  className?: string;
}
export default function Card({
  data,
  imgWidth = 237,
  imgHeight = 355,
  className,
}: CardProps) {
  const { push } = useRouter();
  return (
    <div
      onClick={() => {
        push(getComicRoute(data?.story.id));
      }}
      className={twMerge(
        'cursor-pointer laptop:w-auto text-center font-medium text-2xl',
        className
      )}
    >
      <img
        src={data?.story?.image}
        alt={data?.story?.name}
        object-fit="cover"
        className="h-72 w-72"
      />
      <h3 className="text-ellipsis">{data?.story?.name}</h3>
    </div>
  );
}
