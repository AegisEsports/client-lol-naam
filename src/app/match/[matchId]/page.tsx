import { Scoreboard } from '@/app/match/[matchId]/components/Scoreboard';
import { ChampIcon } from '@/components/riotIcons/ChampIcon';
import { Rune } from '@/components/riotIcons/Rune';

export async function generateStaticParams() {
  return [{ matchId: '4421881781' }];
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
      <Scoreboard matchData={data} />
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
}

// 404 for matches not in data
export const dynamic = 'force-static';
export const dynamicParams = false;
