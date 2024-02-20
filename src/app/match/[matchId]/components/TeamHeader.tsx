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
  return (
    <div
      className={cn('flex font-semibold', {
        'text-2xl p-2 gap-2': size === 'lg',
        'text-lg p-1.5 gap-1.5': size === 'md',
        'text-sm p-1 gap-1': size === 'sm',
        'text-blue-500': win,
        'text-red-500': !win,
      })}
    >
      <div className='font-bold'>{win ? 'Victory' : 'Defeat'}</div>
      <div className='font-normal text-gray-500'>({teamName})</div>
      <div
        className={cn('text-center', {
          'w-60': size === 'lg',
          'w-48': size === 'md',
          'w-36': size === 'sm',
        })}
      >
        {kills} / {deaths} / {assists}
      </div>
      <div
        className={cn('text-center', {
          'w-[34rem]': size === 'lg',
          'w-96': size === 'md',
          'w-60': size === 'sm',
        })}
      >
        {gold.toLocaleString()}
      </div>
    </div>
  );
};
