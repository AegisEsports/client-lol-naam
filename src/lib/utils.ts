import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge with clsx full feature. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format time duration (s) to human-readable format. */
export function formatSeconds(duration: number) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${+seconds < 10 ? '0' : ''}${seconds}`;
}

/** Fetcher function for useSWR. */
export function fetcher(...args: Parameters<typeof fetch>) {
  return fetch(...args).then((res) => res.json());
}

/** Get patch from match data. */
export function getPatch(data: Riot.MatchV5.Match) {
  return data.info.gameVersion.split('.').slice(0, 2).join('.');
}
