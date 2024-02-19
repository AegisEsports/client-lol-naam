'use client';

import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

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

const scoreboardSettings = new Map<
  string,
  {
    set: (value: string) => void;
    values: string[];
    index: number;
  }[]
>();

export const useScoreboardControls = (name?: string) => {
  const key = name || 'default';

  const add = ({
    set,
    values,
  }: {
    set: (string: string) => void;
    values: string[];
  }): void => {
    scoreboardSettings.set(key, [
      ...(scoreboardSettings?.get(key) ?? []),
      { set, values, index: 0 },
    ]);
  };

  const moveLeft = () => {
    scoreboardSettings.get(key)?.forEach((obj) => {
      obj.index = obj.index - 1 < 0 ? obj.values.length - 1 : obj.index - 1;
      obj.set(obj.values[obj.index]);
    });
  };

  const moveRight = () => {
    scoreboardSettings.get(key)?.forEach((obj) => {
      obj.index = (obj.index + 1) % obj.values.length;
      obj.set(obj.values[obj.index]);
    });
  };

  return {
    add,
    moveLeft,
    moveRight,
  };
};
