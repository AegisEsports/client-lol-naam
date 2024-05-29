export const getSummonerName = async (puuid: string) => {
  return `p_${puuid.slice(0, 8)}`;
};
