'use client';

import { useCarousel } from '@/components/Carousel/hooks';

export type CarouselControllerProps = {
  group?: string;
};

export const CarouselController = ({
  group,
}: CarouselControllerProps): JSX.Element => {
  const { scrollLeft, scrollRight } = useCarousel(group);

  return (
    <div className='flex justify-between'>
      <button className='btn btn-primary' onClick={() => scrollLeft()}>
        Left
      </button>
      <button className='btn btn-primary' onClick={() => scrollRight()}>
        Right
      </button>
    </div>
  );
};
