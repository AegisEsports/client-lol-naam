import { Scoreboard } from '@/app/match/[matchId]/components/Scoreboard';
import { getTimeline } from '@/lib/match';
import { formatSeconds } from '@/lib/utils';
import { format } from 'date-fns';

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

  // const timeline = await getTimeline(`NA1_${params.matchId}`);

  return (
    <div className='flex flex-col p-4 items-center'>
      <div className='flex gap-2'>
        {format(data.info.gameStartTimestamp, 'M/d/yyyy')}
        <div className='text-gray-600'>·</div>
        {formatSeconds(data.info.gameDuration)}
        <div className='text-gray-600'>·</div>
        Patch {data.info.gameVersion.split('.').slice(0, 2).join('.')}
        <div className='text-gray-600'>·</div>
        Game ID: {params.matchId}
      </div>
      <Scoreboard matchData={data} size='lg' />
      {/* <pre>{JSON.stringify(timeline, null, 4)}</pre>
      <pre>{JSON.stringify(data, null, 4)}</pre> */}
    </div>
  );
}

// 404 for matches not in data
export const dynamic = 'force-static';
export const dynamicParams = false;
