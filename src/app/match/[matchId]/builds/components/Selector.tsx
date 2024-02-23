'use client';

import { BuildPath } from '@/app/match/[matchId]/builds/components/BuildPath';
import { ChampIcon } from '@/components/riotIcons/ChampIcon';
import { getBuilds } from '@/lib/timeline';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export type SelectorProps = {
  builds: ReturnType<typeof getBuilds>;
  patch: string;
};

export const Selector = ({ builds, patch }: SelectorProps): JSX.Element => {
  const [selected, setSelected] = useState<string>(Object.keys(builds)[0]);

  return (
    <div className='flex flex-col p-4 items-center'>
      <div className='flex gap-2 max-w-full overflow-x-scroll pb-3'>
        {Object.values(builds).map(
          ({ championId, summonerName, puuid, build }) => {
            return (
              <div
                className={cn(
                  'flex flex-col items-center gap-2 w-36 hover:bg-white/20 rounded-lg p-2 transition-all duration-300 shrink-0',
                  {
                    'bg-white/10': selected === puuid,
                  },
                )}
                key={puuid}
                onClick={() => setSelected(puuid)}
              >
                <ChampIcon champId={championId} size='lg' />
                <div>{summonerName}</div>
              </div>
            );
          },
        )}
      </div>
      <BuildPath patch={patch} build={builds[selected]} />
    </div>
  );
};
