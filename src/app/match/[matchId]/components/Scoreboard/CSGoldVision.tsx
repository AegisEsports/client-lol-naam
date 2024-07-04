'use client';

import { useScoreboardControls } from '@/app/match/[matchId]/hooks';
import { Tooltip } from '@/components/ui/Tooltip';
import { cn } from '@/lib/utils';

export type CSGoldVisionProps = {
  gold: number;
  cs: number;
  timePlayed: number;
  controlWards: number;
  wardsPlaced: number;
  wardsKilled: number;
  size?: 'sm' | 'md' | 'lg';
  group?: string;
};

export const CSGoldVision = ({
  gold,
  cs,
  timePlayed,
  controlWards,
  wardsPlaced,
  wardsKilled,
  size = 'md',
  group: key,
}: CSGoldVisionProps): JSX.Element => {
  const { value: group } = useScoreboardControls(['gold', 'cs', 'vision'], key);

  return (
    <div
      className={cn(
        'flex flex-col dark:text-gray-400 text-gray-500 items-center shrink-0',
        {
          'text-lg w-32': size === 'lg',
          'text-sm w-24': size === 'md',
          'text-[.6rem] w-16 ': size === 'sm',
        },
      )}
    >
      {group === 'vision' ? (
        <Tooltip
          tooltip={
            <div className='flex flex-col text-gray-400'>
              <div>
                <span className='text-white font-semibold'>{controlWards}</span>{' '}
                wards purchased
              </div>
              <div>
                <span className='text-white font-semibold'>{wardsPlaced}</span>{' '}
                wards placed
              </div>
              <div>
                <span className='text-white font-semibold'>{wardsKilled}</span>{' '}
                wards killed
              </div>
            </div>
          }
        >
          <div className='flex flex-col items-center'>
            <div>
              <span className='dark:text-gray-200 text-gray-800 font-semibold'>
                {controlWards}
              </span>{' '}
              CW
            </div>
            <div>
              <span className='dark:text-gray-200 text-gray-800 font-semibold'>
                {wardsPlaced}
              </span>{' '}
              P /{' '}
              <span className='dark:text-gray-200 text-gray-800 font-semibold'>
                {wardsKilled}
              </span>{' '}
              K
            </div>
          </div>
        </Tooltip>
      ) : (
        <>
          <div className='font-semibold dark:text-gray-200 text-gray-800'>
            {(group === 'gold' ? gold : cs).toLocaleString()}
          </div>
          <div>
            {(((group === 'gold' ? gold : cs) * 60) / timePlayed).toFixed(
              group === 'gold' ? 0 : 1,
            )}{' '}
            / min
          </div>
        </>
      )}
    </div>
  );
};
