export const getTimeline = async (
  matchId: string,
): Promise<Riot.MatchV5.Timeline> =>
  fetch(
    `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline?api_key=${process.env.RIOT_TOKEN}`,
  ).then((res) => res.json());
