'use client';

import { UseQueryResult, useQuery } from '@tanstack/react-query';

export const useMatch = (
  matchId: string,
): UseQueryResult<RiotGamesAPI.Match.MatchDetail> =>
  useQuery({
    queryKey: ['match', matchId],
    queryFn: async (): Promise<RiotGamesAPI.Match.MatchDetail> => {
      const response = await fetch(
        `https://api.brycenaddison.com/m/NA1_${matchId}`,
      );
      const data = await response.json();
      return data;
    },
  });
