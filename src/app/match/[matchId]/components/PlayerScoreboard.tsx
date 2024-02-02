import { DamageMeter } from '@/app/match/[matchId]/components/DamageMeter';
import { ChampIcon } from '@/components/riotIcons/ChampIcon';
import { ChampScoreboard } from '@/components/riotIcons/ChampScoreboard';
import { Item } from '@/components/riotIcons/Item';
import { Role } from '@/components/riotIcons/Role';
import { Rune } from '@/components/riotIcons/Rune';
import { SummonerSpell } from '@/components/riotIcons/SummonerSpell';
import { getSummonerName } from '@/lib/getSummonerName';
import { cn } from '@/lib/utils';

export type PlayerScoreboardProps = {
  participant: Riot.MatchV5.Participant;
  maxDamage: number;
  size?: 'sm' | 'md' | 'lg';
  options?: {
    role?: boolean;
    level?: boolean;
    spells?: boolean;
    runes?: boolean;
    items?: boolean;
    name?: boolean;
    kda?: boolean;
    cs?: boolean;
    wards?: boolean;
    useChampSplash?: boolean;
  };
};

export const PlayerScoreboard = async ({
  participant,
  maxDamage,
  size = 'md',
  options = {},
}: PlayerScoreboardProps): Promise<JSX.Element> => {
  const defaults = {
    role: true,
    level: true,
    spells: true,
    runes: true,
    items: true,
    name: true,
    kda: true,
    cs: true,
    wards: true,
    useChampSplash: true,
  };

  const show = Object.assign({}, defaults, options);

  const {
    champLevel,
    championId,
    puuid,
    teamPosition,
    kills,
    deaths,
    assists,
    summoner1Id,
    summoner2Id,
    perks,
    item0,
    item1,
    item2,
    item3,
    item4,
    item5,
    item6,
    totalDamageDealtToChampions,
    win,
    timePlayed,
    totalMinionsKilled,
    neutralMinionsKilled,
  } = participant;

  const summonerName = await getSummonerName(puuid);

  const summonerNameComponent = (
    <div
      className={cn('font-semibold shrink-0', {
        'text-2xl mb-1 w-40': size === 'lg',
        'text-xl mb-[3px] w-32': size === 'md',
        'text-md mb-0.5 w-28': size === 'sm',
      })}
    >
      {summonerName}
    </div>
  );

  const itemComponent = (
    <div
      className={cn('flex shrink-0', {
        'gap-1': size === 'lg',
        'gap-[3px]': size === 'md',
        'gap-0.5': size === 'sm',
      })}
    >
      <Item item={item0} size={size} />
      <Item item={item1} size={size} />
      <Item item={item2} size={size} />
      <Item item={item3} size={size} />
      <Item item={item4} size={size} />
      <Item item={item5} size={size} />
      <Item item={item6} size={size} />
    </div>
  );

  const kda =
    deaths === 0
      ? 'Perfect'
      : Math.round(((kills + assists) * 100) / deaths) / 100;

  const csm =
    Math.round(
      ((totalMinionsKilled + neutralMinionsKilled) * 600) / timePlayed,
    ) / 10;

  return (
    <div
      className={cn('flex items-center relative border-l-2', {
        'gap-1 h-8 border-l-2': size === 'sm',
        'gap-1.5 h-12 border-l-[3px]': size === 'md',
        'gap-2 h-16 border-l-4': size === 'lg',

        'pl-2': size === 'lg' && !show.useChampSplash,
        'pl-1.5': size === 'md' && !show.useChampSplash,
        'pl-1': size === 'sm' && !show.useChampSplash,

        'border-blue-400': win,
        'border-red-400': !win,
      })}
    >
      {!show.useChampSplash && show.role && (
        <Role role={teamPosition} size={size} />
      )}

      {!show.useChampSplash && show.level && size === 'sm' && (
        <div className='font-semibold text-md'>{champLevel}</div>
      )}

      {show.useChampSplash && (
        <ChampScoreboard level={champLevel} champId={championId} size={size} />
      )}

      {!show.useChampSplash && (
        <div className='relative'>
          <ChampIcon champId={championId} size={size} />
          {size !== 'sm' && show.level && (
            <div
              className={cn(
                'absolute bottom-0 right-0 bg-black/50 text-center h-6 w-6 rounded-tl-lg rounded-br-lg',
                {
                  'text-xs h-4 w-4': size === 'md',
                  'text-base h-6 w-6': size === 'lg',
                },
              )}
            >
              {champLevel}
            </div>
          )}
        </div>
      )}

      {show.useChampSplash && show.name && summonerNameComponent}

      <div
        className={cn('flex shrink-0', {
          'gap-0.5 m-0.5': size !== 'lg',
          'gap-1 m-1': size === 'lg',
        })}
      >
        {show.spells && (
          <div
            className={cn('flex flex-col', {
              'gap-0.5': size !== 'lg',
              'gap-1': size === 'lg',
            })}
          >
            <SummonerSpell spellId={summoner1Id} size={size} />
            <SummonerSpell spellId={summoner2Id} size={size} />
          </div>
        )}

        {show.runes && (
          <div
            className={cn(
              'flex flex-col items-center justify-between shrink-0',
              {
                'gap-0.5': size !== 'lg',
                'gap-1': size === 'lg',
              },
            )}
          >
            <Rune runeData={perks} type='keystone' size={size} />
            <Rune
              runeData={perks}
              type='secondary'
              size={size}
              className={cn({
                'p-1': size === 'lg',
                'p-[3px]': size === 'md',
                'p-0.5': size === 'sm',
              })}
            />
          </div>
        )}
      </div>

      {show.useChampSplash && show.items && itemComponent}

      {!show.useChampSplash && show.name && summonerNameComponent}

      {show.kda && (
        <>
          <div
            className={cn(
              'flex flex-col text-gray-200 items-center whitespace-nowrap',
              {
                'text-xl w-32': size === 'lg',
                'text-md w-24': size === 'md',
                'text-xs w-16': size === 'sm',
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
              <span>{kills}</span>
              <span className='text-gray-500 font-normal'>/</span>
              <span>{deaths}</span>
              <span className='text-gray-500 font-normal'>/</span>
              <span>{assists}</span>
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
        </>
      )}

      <DamageMeter
        damage={totalDamageDealtToChampions}
        maxDamage={maxDamage}
        size={size}
      />

      {show.cs && (
        <div
          className={cn(
            'flex flex-col text-gray-200 items-center whitespace-nowrap',
            {
              'text-xl w-32': size === 'lg',
              'text-md w-24': size === 'md',
              'text-xs w-16': size === 'sm',
            },
          )}
        >
          <div>{totalMinionsKilled + neutralMinionsKilled}</div>
          <div>{csm}</div>
        </div>
      )}

      {!show.useChampSplash && show.items && (
        <>
          <div />
          <div />
          <div />
          {itemComponent}
        </>
      )}
    </div>
  );
};
