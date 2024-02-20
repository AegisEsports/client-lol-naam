import { Scoreboard } from '@/app/match/[matchId]/components/Scoreboard';
import { ChampIcon } from '@/components/riotIcons/ChampIcon';
import { Rune } from '@/components/riotIcons/Rune';

export async function generateStaticParams() {
  return ['4421881781', '4456011940'].map((matchId) => ({ matchId: matchId }));
}

export default async function Page({
  params,
}: {
  params: { matchId: string };
}) {
  const data = (await fetch(
    `https://api.brycenaddison.com/m/NA1_${params.matchId}`,
  ).then((res) => res.json())) as Riot.MatchV5.Match;

  return (
    <div className='flex flex-col p-4'>
      MatchID : {params.matchId}
      Large:
      <Scoreboard matchData={data} size='lg' />
      Medium:
      <Scoreboard matchData={data} size='md' />
      Small:
      <Scoreboard matchData={data} size='sm' />
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
}

// 404 for matches not in data
export const dynamic = 'force-static';
export const dynamicParams = false;
