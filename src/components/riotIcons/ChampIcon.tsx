import Image from 'next/image';
import { cn } from '@/lib/utils';

// base 360x360
const BASE_URL =
  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/';

/** Props for {@link ChampIcon}. */
export type ChampIconProps = {
  /** The numeric id of the champion. */
  champId?: number;
  /** The size of the icon (16, 32, 48, or 64px). */
  size?: 'sm' | 'md' | 'lg' | 'xs';
};

/** A styled and wrapped icon representing a champion. */
export const ChampIcon = ({
  champId = -1,
  size,
}: ChampIconProps): JSX.Element => (
  <div
    className={cn('overflow-hidden rounded-lg shadow-tile', {
      'w-4 h-4 rounded-sm !shadow-none border border-border': size === 'xs',
      'w-8 h-8': size === 'sm',
      'w-12 h-12': size === 'md',
      'w-16 h-16': size === 'lg',
      'w-8 h-8 lg:w-12 lg:h-12 2xl:w-16 2xl:h-16': size === undefined,
    })}
  >
    <Image
      src={`${BASE_URL}${champId}.png`}
      width={360}
      height={360}
      alt={`Champion ${champId}`}
      className='object-center scale-[115%]'
      priority
    />
  </div>
);
