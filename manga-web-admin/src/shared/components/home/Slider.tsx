import React from 'react';
import { Carousel } from 'antd';
import Image from 'next/image';
import bgSlide from '@/assets/images/bgSlide.jpg';

interface SliderProps {
  className?: string;
}
export default function Slider({ className }: SliderProps) {
  return (
    <Carousel autoplay className={className}>
     <div className="overflow-hidden justify-center items-center">
        <Image
          alt="slider"
          className="aspect-square object-cover w-full"
          src={bgSlide}
        />
      </div>
      <div className="overflow-hidden justify-center items-center">
        <Image
          alt="slider"
          className="aspect-square object-cover w-full"
          src={bgSlide}
        />
      </div>
    </Carousel>
  );
}
