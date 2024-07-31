'use client';

import { usePathname } from 'next/navigation';
import { type ReactNode, Suspense } from 'react';
import Loading from '@/app/loading';
import { navStyles } from '@/components/NavBar';
import { MenuButton } from '@/components/ui/MenuButton';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { cn } from '@/lib/utils';

/** A nav header for the scoreboard page. */
export default function Layout({
  children,
  params: { matchId },
}: {
  children: ReactNode;
  params: { matchId: string };
}): JSX.Element {
  // This just cannot be the best way to do this but w/e
  const pathname = usePathname();

  const pathParts = pathname.split('/');
  const lastPath = pathParts[pathParts.length - 1];
  const page =
    lastPath === 'builds'
      ? 'builds'
      : lastPath === 'overview'
        ? 'overview'
        : 'scoreboard';

  return (
    <>
      <div
        className={cn(
          navStyles,
          'top-[57px] border-b overflow-y-scroll scrollbar-hidden',
        )}
      >
        <div className='flex mx-auto w-fit'>
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
          <MenuButton
            href={`/match/${matchId}/overview`}
            selected={page === 'overview'}
          >
            Overview
          </MenuButton>
        </div>
      </div>
      <Suspense key={page} fallback={<Loading />}>
        <ScrollArea orientation='both' className='flex grow'>
          <div className='flex flex-col overflow-hidden mt-3 max-w-screen-2xl mx-auto'>
            {children}
          </div>
        </ScrollArea>
      </Suspense>
    </>
  );
}
