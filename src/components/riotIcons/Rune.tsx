import { cn } from '@/lib/utils';
import Image from 'next/image';

const CDRAGON_URL =
  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/';
const RUNES_REFORGED =
  'http://ddragon.leagueoflegends.com/cdn/14.2.1/data/en_US/runesReforged.json';

export type RuneProps = {
  runeData: Riot.MatchV5.Perks;
  type?: 'keystone' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export const Rune = async ({
  runeData,
  type = 'keystone',
  size = 'lg',
  className = '',
}: RuneProps): Promise<JSX.Element> => {
  const runeDirectory = (await fetch(RUNES_REFORGED).then((res) =>
    res.json(),
  )) as Riot.DDragon.RuneLookup[];

  const rune = type === 'keystone' ? runeData.styles[0] : runeData.styles[1];

  const tree = runeDirectory.find((tree) => tree.id === rune.style);

  let path = 'runesicon.png';
  let alt = `${type} rune`;

  if (tree !== undefined) {
    if (type === 'keystone') {
      const keystone = tree.slots[0].runes.find((rune) => rune.id === rune.id);
      if (keystone !== undefined) {
        path = keystone.icon;
        alt = keystone.name;
      }
    } else {
      path = tree.icon;
      alt = tree.name;
    }
  }

  const src = `${CDRAGON_URL}${path.toLowerCase()}`;

  const sizePx = size === 'sm' ? 15 : size === 'md' ? 23 : 30;

  return (
    <Image
      src={src}
      className={cn(className, 'bg-white/5 shadow-tile', {
        'rounded-lg': size === 'lg',
        'rounded-md': size === 'md',
        rounded: size === 'sm',
      })}
      alt={alt}
      width={sizePx}
      height={sizePx}
    />
  );
};
