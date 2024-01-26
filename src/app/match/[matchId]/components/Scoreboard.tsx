import { PlayerScoreboard } from '@/app/match/[matchId]/components/PlayerScoreboard';

export type ScoreboardProps = {
  matchData: Riot.MatchV5.Match;
};

export const Scoreboard = ({ matchData }: ScoreboardProps): JSX.Element => {
  return (
    <div className='flex flex-col'>
      Large:
      <PlayerScoreboard participant={matchData.info.participants[4]} />
      Small:
      <PlayerScoreboard
        participant={matchData.info.participants[1]}
        size='sm'
      />
    </div>
  );
};
