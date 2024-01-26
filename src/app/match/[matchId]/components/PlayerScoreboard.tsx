import { ChampIcon } from '@/components/riotIcons/ChampIcon';
import { Item } from '@/components/riotIcons/Item';
import { Role } from '@/components/riotIcons/Role';
import { Rune } from '@/components/riotIcons/Rune';
import { SummonerSpell } from '@/components/riotIcons/SummonerSpell';
import { getSummonerName } from '@/lib/getSummonerName';
import { cn } from '@/lib/utils';

export type PlayerScoreboardProps = {
  participant: Riot.MatchV5.Participant;
  size?: 'sm' | 'lg';
};

export const PlayerScoreboard = ({
  participant,
  size = 'lg',
}: PlayerScoreboardProps): JSX.Element => {
  const champId = participant.championId;
  const isLg = size === 'lg';

  const kda = `${participant.kills}/${participant.deaths}/${participant.assists}`;

  return (
    <div className='flex items-center'>
      <Role role={participant.teamPosition} size={size} />
      {!isLg && (
        <div className='mb-0.5 ml-1 font-semibold'>
          {participant.champLevel}
        </div>
      )}
      <div className='relative ml-2'>
        <ChampIcon champId={champId} size={size} />
        {isLg && (
          <div className='absolute bottom-0 right-0 bg-black/50 text-center h-6 w-6 rounded-tl-lg rounded-br-lg'>
            {participant.champLevel}
          </div>
        )}
      </div>
      <div
        className={cn('flex flex-col', {
          'ml-1 gap-0.5': !isLg,
          'ml-2 gap-1': isLg,
        })}
      >
        <SummonerSpell spellId={participant.summoner1Id} size={size} />
        <SummonerSpell spellId={participant.summoner2Id} size={size} />
      </div>
      <div
        className={cn('flex flex-col items-center justify-between', {
          'ml-0.5': !isLg,
          'ml-1': isLg,
        })}
      >
        <Rune
          runeData={participant.perks}
          type='keystone'
          size={isLg ? 32 : 16}
        />
        <Rune
          runeData={participant.perks}
          type='secondary'
          size={isLg ? 32 : 16}
          className={cn({
            'p-1': isLg,
            'p-0.5': !isLg,
          })}
        />
      </div>
      <div
        className={cn({
          'text-2xl mb-1 ml-3': isLg,
          'text-lg mb-0.5 ml-1.5': !isLg,
        })}
      >
        {getSummonerName(participant.puuid)}
      </div>
      <div
        className={cn('flex ml-4', {
          'gap-1': isLg,
          'gap-0.5': !isLg,
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
