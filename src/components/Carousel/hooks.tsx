type Carousel = {
  refs: (HTMLDivElement | null)[];
  currentIndex: number;
};

const carousels: { [key: string]: Carousel[] } = {};

export const useCarousel = (
  key = 'default',
): {
  add: (refs: (HTMLDivElement | null)[]) => void;
  scrollRight: () => void;
  scrollLeft: () => void;
} => {
  const add = (refs: (HTMLDivElement | null)[]) => {
    if (!carousels[key]) {
      carousels[key] = [];
    }

    carousels[key].push({ refs, currentIndex: 0 });
  };

  const scrollToIndex = (carousel: Carousel, index: number) => {
    carousel.currentIndex = index;

    carousel.refs[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  };

  const scrollRight = () => {
    carousels[key].forEach((c) => {
      const nextIndex = (c.currentIndex + 1) % c.refs.length;

      scrollToIndex(c, nextIndex);
    });
  };

  const scrollLeft = () => {
    carousels[key].forEach((c) => {
      const nextIndex = (c.currentIndex - 1) % c.refs.length;

      scrollToIndex(c, nextIndex);
    });
  };

  return {
    add,
    scrollRight,
    scrollLeft,
  };
};
