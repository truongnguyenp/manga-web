import type { ImageProps } from 'antd';
import { Image as AntdImage } from 'antd';
import NotHaveImage from '@/assets/images/defaultImage.png';
import { StaticImageData } from 'next/image';

interface ImageValueProps {
  defaultSrc?: StaticImageData;
}

function Image({
  defaultSrc = NotHaveImage,
  src,
  alt,
  preview,
  ...rest
}: ImageProps & ImageValueProps) {
  return (
    <AntdImage
      alt={alt || 'anubis image'}
      preview={
        preview !== false
          ? {
              ...(typeof preview !== 'boolean' && preview),
              transitionName: '',
            }
          : preview
      }
      src={src || String(defaultSrc)}
      {...rest}
    />
  );
}

export default Image;
