import { Tooltip } from '@/components/Tooltip';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const ITEMS_URL =
  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json';
const ITEMS_DIR =
  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/';
const TOOLTIPS_URL =
  'https://ddragon.leagueoflegends.com/cdn/14.3.1/data/en_US/item.json';

const USE_DDRAGON = false;

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

  const tooltipLookup = USE_DDRAGON
    ? ((await fetch(TOOLTIPS_URL).then((res) =>
        res.json(),
      )) as Riot.DDragon.ItemLookup)
    : undefined;

  const item = itemLookup.find((item) => item.id === itemId);

  const itemDetails = tooltipLookup?.data[itemId.toString()];

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

  const name = itemDetails ? itemDetails?.name : item.name;

  const description = (itemDetails ? itemDetails.description : item.description)
    .replaceAll(/<br>(<br>)+/g, '<br><br>')
    .replaceAll('<attention', '<attention style="font-weight: bold;"')
    .replaceAll('<status', '<status style="color: rgb(156, 39, 176);"')
    .replaceAll('keywordStealth', 'keyword')
    .replaceAll('<keyword>', '<keyword style="color: rgb(156, 39, 176);">')
    .replaceAll('<passive', '<passive style="color: white; font-weight: bold;"')
    .replaceAll(
      '<active',
      '<active style="color: rgb(255, 245, 157); font-weight: bold;"',
    )
    .replaceAll(
      '<scaleMana',
      '<scaleMana style="color: lightblue; font-weight: bold;"',
    )
    .replaceAll(
      '<shield',
      '<shield style="color: lightblue; font-weight: bold;"',
    );

  const price = itemDetails
    ? `${itemDetails.gold.total} (${itemDetails.gold.sell})`
    : item.priceTotal;

  return (
    <Tooltip
      tooltip={
        <div className='flex flex-col font-normal text-gray-300'>
          <div className='font-bold text-blue-200'>{name}</div>
          <div
            dangerouslySetInnerHTML={{
              __html: description
                .replaceAll(
                  '<attention',
                  '<attention style="font-weight: bold;"',
                )
                .replaceAll(
                  '<status',
                  '<status style="color: rgb(156, 39, 176);"',
                )
                .replaceAll(
                  '<keyword',
                  '<keyword style="color: rgb(156, 39, 176);"',
                )
                .replaceAll(
                  '<passive',
                  '<passive style="color: white; font-weight: bold;"',
                )
                .replaceAll(
                  '<active',
                  '<active style="color: rgb(255, 245, 157); font-weight: bold;"',
                )
                .replaceAll(
                  '<scaleMana',
                  '<scaleMana style="color: lightblue; font-weight: bold;"',
                )
                .replaceAll(
                  '<shield',
                  '<shield style="color: lightblue; font-weight: bold;"',
                ),
            }}
          />
          <div className='mt-2'>
            Cost: <span className='text-yellow-400'>{price}</span>
          </div>
        </div>
      }
    >
      <Image
        className={iconClass}
        src={`${ITEMS_DIR}${path.toLowerCase()}`}
        height={sizePx}
        width={sizePx}
        alt={`Item ${item.name}`}
      />
    </Tooltip>
  );
};
