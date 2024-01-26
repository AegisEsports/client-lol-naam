import { ChampIcon } from '@/components/riotIcons/ChampIcon';
import { Item } from '@/components/riotIcons/Item';
import { Role } from '@/components/riotIcons/Role';
import { Rune } from '@/components/riotIcons/Rune';
import { SummonerSpell } from '@/components/riotIcons/SummonerSpell';
import { getSummonerName } from '@/lib/getSummonerName';
import { cn } from '@/lib/utils';

export type PlayerScoreboardProps = {
  participant: Riot.MatchV5.Participant;
  size?: 'sm' | 'md' | 'lg';
};

export const PlayerScoreboard = async ({
  participant,
  size = 'md',
}: PlayerScoreboardProps): Promise<JSX.Element> => {
  const summonerName = await getSummonerName(participant.puuid);
  const champId = participant.championId;

  const kda =
    participant.deaths === 0
      ? 'Perfect'
      : Math.round(
          ((participant.kills + participant.assists) * 100) /
            participant.deaths,
        ) / 100;

  return (
    <div className='flex items-center'>
      <Role role={participant.teamPosition} size={size} />
      {size === 'sm' && (
        <div className='mb-0.5 ml-1 font-semibold'>
          {participant.champLevel}
        </div>
      )}
      <div className='relative ml-2'>
        <ChampIcon champId={champId} size={size} />
        {size !== 'sm' && (
          <div
            className={cn(
              'absolute bottom-0 right-0 bg-black/50 text-center h-6 w-6 rounded-tl-lg rounded-br-lg',
              {
                'text-xs h-4 w-4': size === 'md',
                'text-base h-6 w-6': size === 'lg',
              },
            )}
          >
            {participant.champLevel}
          </div>
        )}
      </div>
      <div
        className={cn('flex flex-col shrink-0', {
          'ml-1 gap-0.5': size === 'sm',
          'ml-1.5 gap-0.5': size === 'md',
          'ml-2 gap-1': size === 'lg',
        })}
      >
        <SummonerSpell spellId={participant.summoner1Id} size={size} />
        <SummonerSpell spellId={participant.summoner2Id} size={size} />
      </div>
      <div
        className={cn('flex flex-col items-center justify-between shrink-0', {
          'ml-0.5 gap-0.5': size === 'sm',
          'ml-[3px] gap-0.5': size === 'md',
          'ml-1 gap-1': size === 'lg',
        })}
      >
        <Rune runeData={participant.perks} type='keystone' size={size} />
        <Rune
          runeData={participant.perks}
          type='secondary'
          size={size}
          className={cn({
            'p-1': size === 'lg',
            'p-[3px]': size === 'md',
            'p-0.5': size === 'sm',
          })}
        />
      </div>
      <div
        className={cn('font-semibold', {
          'text-2xl mb-1 ml-3': size === 'lg',
          'text-xl mb-[3px] ml-[9px]': size === 'md',
          'text-lg mb-0.5 ml-1.5': size === 'sm',
        })}
      >
        {summonerName}
      </div>
      <div
        className={cn(
          'flex flex-col text-gray-200 items-center whitespace-nowrap',
          {
            'ml-2 text-xl': size === 'lg',
            'ml-[9px] text-md]': size === 'md',
            'ml-1.5 text-xs': size === 'sm',
          },
        )}
      >
        <div
          className={cn('flex mt-auto font-semibold', {
            'gap-1': size === 'lg',
            'gap-[3px]': size === 'md',
            'gap-0.5': size === 'sm',
          })}
        >
          <span>{participant.kills}</span>
          <span className='text-gray-500 font-normal'>/</span>
          <span>{participant.deaths}</span>
          <span className='text-gray-500 font-normal'>/</span>
          <span>{participant.assists}</span>
        </div>
        <div className='mb-auto'>
          <span
            className={cn('font-semibold', {
              'text-orange-400': kda === 'Perfect' || kda >= 5,
              'text-blue-400': kda !== 'Perfect' && kda >= 3 && kda < 5,
              'text-white': kda !== 'Perfect' && kda < 3,
            })}
          >
            {kda === 'Perfect' ? kda : `${kda.toFixed(2)}`}
          </span>
          <span className='text-gray-300'> KDA</span>
        </div>
      </div>
      <div
        className={cn('flex ml-4 shrink-0', {
          'gap-1': size === 'lg',
          'gap-[3px]': size === 'md',
          'gap-0.5': size === 'sm',
        })}
      >
        <Item item={participant.item0} size={size} />
        <Item item={participant.item1} size={size} />
        <Item item={participant.item2} size={size} />
        <Item item={participant.item3} size={size} />
        <Item item={participant.item4} size={size} />
        <Item item={participant.item5} size={size} />
        <Item item={participant.item6} size={size} />
      </div>
    </div>
  );
};
