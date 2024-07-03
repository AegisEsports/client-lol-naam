const handleResponse = async (response: Response): Promise<unknown> => {
  if (!response.ok) {
    await response
      .json()
      .then((data: { status: { message: string; status_code: number } }) => {
        throw new Error(`${data.status.status_code}: ${data.status.message}`);
      });
  }
  return response.json();
};

const get = async (url: string): Promise<unknown> =>
  fetch(url).then(handleResponse);

export const getTimeline = async (
  matchId: string,
): Promise<Riot.MatchV5.Timeline> =>
  get(
    `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline?api_key=${process.env.RIOT_TOKEN}`,
  ) as Promise<Riot.MatchV5.Timeline>;

export const getMatch = async (matchId: string): Promise<Riot.MatchV5.Match> =>
  get(
    `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.RIOT_TOKEN}`,
  ) as Promise<Riot.MatchV5.Match>;

export const getRecentMatches = async (puuid: string): Promise<string[]> =>
  get(
    `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${process.env.RIOT_TOKEN}`,
  ) as Promise<string[]>;
