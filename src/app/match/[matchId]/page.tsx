export async function generateStaticParams() {
  return [{ matchId: '4421881781' }];
}

export default async function Page({
  params,
}: {
  params: { matchId: string };
}) {
  const data = await fetch(
    `https://api.brycenaddison.com/m/NA1_${params.matchId}`,
  ).then((res) => res.json());

  return (
    <div>
      MatchID : {params.matchId}{' '}
      <pre> {<>{JSON.stringify(data, null, 4)}</>}</pre>
    </div>
  );
}

// 404 for matches not in data
export const dynamic = 'force-static';
export const dynamicParams = false;
