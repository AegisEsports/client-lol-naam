import { cn } from '@/lib/utils';
import Image from 'next/image';

const ITEMS_URL =
  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json';
const ITEMS_DIR =
  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/';

export type ItemProps = {
  item?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export const Item = async ({
  item: itemId = 0,
  size = 'md',
  className = '',
}: ItemProps): Promise<JSX.Element | null> => {
  const itemLookup = (await fetch(ITEMS_URL).then((res) =>
    res.json(),
  )) as CDragon.Item[];

  const item = itemLookup.find((item) => item.id === itemId);

  const iconClass = cn(className, 'shadow-tile', {
    'rounded-lg': size === 'lg',
    'rounded-md': size === 'md',
    rounded: size === 'sm',
  });

  if (item === undefined)
    return (
      <div
        className={cn(
          'bg-white/5',
          {
            'w-6 h-6': size === 'sm',
            'w-8 h-8': size === 'md',
            'w-12 h-12': size === 'lg',
          },
          iconClass,
        )}
      />
    );

  const path = item.iconPath.slice(item.iconPath.lastIndexOf('/') + 1);

  const sizePx = size === 'sm' ? 24 : size === 'md' ? 32 : 48;

  return (
    <Image
      className={iconClass}
      src={`${ITEMS_DIR}${path.toLowerCase()}`}
      height={sizePx}
      width={sizePx}
      alt={`Item ${item.name}`}
    />
  );
};
