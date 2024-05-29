import { MenuButton } from '@/components/MenuButton';
import { ReactNode } from 'react';

export type WrapperProps = {
  page: 'scoreboard' | 'builds';
  matchId: string;
  children: ReactNode;
};

export const Wrapper = ({
  children,
  page,
  matchId,
}: WrapperProps): JSX.Element => {
  return (
    <div className='flex flex-col'>
      <div className='flex mx-auto'>
        <MenuButton
          href={`/match/${matchId}/`}
          selected={page === 'scoreboard'}
        >
          Scoreboard
        </MenuButton>
        <MenuButton
          href={`/match/${matchId}/builds`}
          selected={page === 'builds'}
        >
          Builds
        </MenuButton>
      </div>
      {children}
    </div>
  );
};
