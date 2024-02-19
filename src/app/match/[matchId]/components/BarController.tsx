'use client';

import { useScoreboardControls } from '@/app/match/[matchId]/hooks';

export type BarControllerProps = {
  group: string;
};

export const BarController = ({ group }: BarControllerProps): JSX.Element => {
  const { moveLeft, moveRight } = useScoreboardControls(group);

  return (
    <div className='flex justify-between'>
      <button className='btn btn-primary' onClick={() => moveLeft()}>
        Left
      </button>
      <button className='btn btn-primary' onClick={() => moveRight()}>
        Right
      </button>
    </div>
  );
};
