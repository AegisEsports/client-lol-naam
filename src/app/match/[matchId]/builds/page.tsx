import { Selector } from '@/app/match/[matchId]/builds/components/Selector';
import { Wrapper } from '@/app/match/[matchId]/components/Wrapper';
import { getMatch, getTimeline } from '@/lib/match';

export default async function Builds({
  params,
}: {
  params: { matchId: string };
}) {
  const match = (await fetch(
    `https://api.brycenaddison.com/m/NA1_${params.matchId}`,
  ).then((res) => res.json())) as Riot.MatchV5.Match;
  // const match = await getMatch(`NA1_${params.matchId}`);
  const timeline = await getTimeline(`NA1_${params.matchId}`);

  return (
    <Wrapper page='builds' matchId={params.matchId}>
      <Selector match={match} timeline={timeline} />
    </Wrapper>
  );
}
