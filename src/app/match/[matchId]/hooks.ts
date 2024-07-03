'use client';

import { useEffect } from 'react';

const scoreboardSettings = new Map<
  string,
  {
    set: (value: string) => void;
    values: string[];
    index: number;
  }[]
>();

export const useScoreboardControls = (
  values: string[],
  set: (string: string) => void,
  name?: string,
): {
  moveLeft: () => void;
  moveRight: () => void;
} => {
  const key = name ?? 'default';

  useEffect(() => {
    scoreboardSettings.set(key, [
      ...(scoreboardSettings.get(key) ?? []),
      { set, values, index: 0 },
    ]);

    return () => {
      scoreboardSettings.set(
        key,
        scoreboardSettings.get(key)?.filter((obj) => obj.set !== set) ?? [],
      );
    };
  }, []);

  const moveLeft = (): void => {
    scoreboardSettings.get(key)?.forEach((obj) => {
      obj.index = obj.index - 1 < 0 ? obj.values.length - 1 : obj.index - 1;
      obj.set(obj.values[obj.index]);
    });
  };

  const moveRight = (): void => {
    scoreboardSettings.get(key)?.forEach((obj) => {
      obj.index = (obj.index + 1) % obj.values.length;
      obj.set(obj.values[obj.index]);
    });
  };

  return {
    moveLeft,
    moveRight,
  };
};
