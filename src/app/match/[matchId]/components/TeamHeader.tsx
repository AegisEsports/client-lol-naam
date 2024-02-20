'use client';

import { useScoreboardControls } from '@/app/match/[matchId]/hooks';
import { cn } from '@/lib/utils';

export type TeamHeaderProps = {
  teamName: string;
  win: boolean;
  kills: number;
  deaths: number;
  assists: number;
  gold: number;
  size: 'sm' | 'md' | 'lg';
  objectives: Riot.MatchV5.Objective;
  bans: Riot.MatchV5.Ban[];
  group: string;
};

/** Header stats and controllers for each team scoreboard. */
export const TeamHeader = ({
  win,
  size,
  teamName,
  kills,
  deaths,
  assists,
  gold,
  group,
}: TeamHeaderProps): JSX.Element => {
  const { moveLeft: left1, moveRight: right1 } = useScoreboardControls(
    `${group}-dmg`,
  );
  const { moveLeft: left2, moveRight: right2 } = useScoreboardControls(
    `${group}-gold`,
  );

  const buttonClassName =
    'cursor-pointer select-none text-gray-400 hover:text-white transition-all duration-300';

  return (
    <div
      className={cn('flex font-semibold shrink-0', {
        'text-2xl p-2 gap-2 w-[82.25rem]': size === 'lg',
        'text-lg p-1.5 gap-1.5 w-[60.57rem]': size === 'md',
        'text-sm p-1 gap-1 w-[42.62rem]': size === 'sm',
        'text-blue-500': win,
        'text-red-500': !win,
      })}
    >
      <div className='font-bold'>{win ? 'Victory' : 'Defeat'}</div>
      <div className='font-normal text-gray-500'>({teamName})</div>
      <div className='text-gray-600'>·</div>
      <div>
        {kills} / {deaths} / {assists}
      </div>
      <div className='text-gray-600'>·</div>
      <div>{gold.toLocaleString()}</div>
      <div
        className={cn('ml-auto items-center', {
          'w-32': size === 'lg',
          'w-24': size === 'md',
          'w-16': size === 'sm',
        })}
      >
        fighticon
      </div>
      <div
        className={cn('justify-between flex', {
          'w-32 px-4': size === 'lg',
          'w-24 px-3': size === 'md',
          'w-16 px-2': size === 'sm',
        })}
      >
        <div className={buttonClassName} onClick={left1}>
          {'<'}
        </div>
        i
        <div className={buttonClassName} onClick={right1}>
          {'>'}
        </div>
      </div>
      <div
        className={cn('justify-between flex', {
          'w-32 px-4': size === 'lg',
          'w-24 px-3': size === 'md',
          'w-16 px-2': size === 'sm',
        })}
      >
        <div className={buttonClassName} onClick={left2}>
          {'<'}
        </div>
        i
        <div className={buttonClassName} onClick={right2}>
          {'>'}
        </div>
      </div>
    </div>
  );
};
