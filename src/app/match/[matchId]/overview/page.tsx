import { Wrapper } from '@/app/match/[matchId]/components/Wrapper';
import { GoldChart } from '@/app/match/[matchId]/overview/components/GoldChart';
import { getMatch, getTimeline } from '@/lib/match';

export default async function Page({
  params,
}: {
  params: { matchId: string };
}): Promise<JSX.Element> {
  const match = await getMatch(`NA1_${params.matchId}`);
  const timeline = await getTimeline(`NA1_${params.matchId}`);

  return (
    <Wrapper page='overview' matchId={params.matchId}>
      <div className='w-[42rem] grow mx-auto flex'>
        <GoldChart match={match} timeline={timeline} />
      </div>
    </Wrapper>
  );
}
