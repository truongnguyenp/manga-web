import Image from 'next/image';
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
        push(data.path);
      }}
      className={twMerge(
        'cursor-pointer laptop:w-auto text-center font-medium text-2xl',
        className
      )}
    >
      <Image
        src={data.image}
        alt={data.title}
        object-fit="cover"
        width={imgWidth}
        height={imgHeight}
      />
      <h3 className="text-ellipsis">{data.title}</h3>
    </div>
  );
}
