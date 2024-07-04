'use client';

import { create } from 'zustand';

type ScoreboardController = {
  valueMap: Map<string, Map<string, number>>;
  moveLeft: (groupKey: string, values: string[]) => void;
  moveRight: (groupKey: string, values: string[]) => void;
};

const getKey = (values: string[]): string =>
  `${values.join('-')}#${values.length}`;

const useScoreboardStore = create<ScoreboardController>((set) => ({
  valueMap: new Map(),
  moveLeft: (groupKey: string, values: string[]): void => {
    set((state) => {
      const map = new Map(state.valueMap);
      const group = map.get(groupKey) ?? new Map<string, number>();

      const key = getKey(values);
      const size = values.length;

      const index = group.get(key) ?? 0;

      map.set(groupKey, group);
      group.set(key, index - 1 < 0 ? size - 1 : index - 1);

      return { valueMap: map };
    });
  },
  moveRight: (groupKey: string, values: string[]): void => {
    set((state) => {
      const map = new Map(state.valueMap);
      const group = map.get(groupKey) ?? new Map<string, number>();

      const key = getKey(values);
      const size = values.length;

      const index = group.get(key) ?? 0;

      map.set(groupKey, group);
      group.set(key, (index + 1) % size);

      return { valueMap: map };
    });
  },
}));

export const useScoreboardControls = (
  values: string[],
  name?: string,
): {
  moveLeft: () => void;
  moveRight: () => void;
  value: string;
} => {
  const { moveLeft, moveRight, valueMap } = useScoreboardStore();

  const key = name ?? 'default';

  const index = valueMap.get(key)?.get(getKey(values));
  const value = values[index ?? 0];

  return {
    moveLeft: () => {
      moveLeft(key, values);
    },
    moveRight: () => {
      moveRight(key, values);
    },
    value,
  };
};
