import { PlayerScoreboard } from '@/app/match/[matchId]/components/PlayerScoreboard';

const team1 = [0, 1, 2, 3, 4];
const team2 = [5, 6, 7, 8, 9];

export type ScoreboardProps = {
  matchData: Riot.MatchV5.Match;
};

export const Scoreboard = ({ matchData }: ScoreboardProps): JSX.Element => {
  const maxDamage = Math.max(
    ...matchData.info.participants.map((p) => p.totalDamageDealtToChampions),
  );

  return (
    <div className='flex flex-col'>
      Large:
      {team1.map((index) => (
        <PlayerScoreboard
          maxDamage={maxDamage}
          key={`player-${index}`}
          participant={matchData.info.participants[index]}
          size='lg'
        />
      ))}
      <div className='h-4' />
      {team2.map((index) => (
        <PlayerScoreboard
          maxDamage={maxDamage}
          key={`player-${index}`}
          participant={matchData.info.participants[index]}
          size='lg'
        />
      ))}
      Medium:
      {team1.map((index) => (
        <PlayerScoreboard
          maxDamage={maxDamage}
          key={`player-${index}`}
          participant={matchData.info.participants[index]}
          size='md'
        />
      ))}
      <div className='h-4' />
      {team2.map((index) => (
        <PlayerScoreboard
          maxDamage={maxDamage}
          key={`player-${index}`}
          participant={matchData.info.participants[index]}
          size='md'
        />
      ))}
      Small:
      {team1.map((index) => (
        <PlayerScoreboard
          maxDamage={maxDamage}
          key={`player-${index}`}
          participant={matchData.info.participants[index]}
          size='sm'
        />
      ))}
      <div className='h-4' />
      {team2.map((index) => (
        <PlayerScoreboard
          maxDamage={maxDamage}
          key={`player-${index}`}
          participant={matchData.info.participants[index]}
          size='sm'
        />
      ))}
      IconLarge:
      {team1.map((index) => (
        <PlayerScoreboard
          maxDamage={maxDamage}
          key={`player-${index}`}
          participant={matchData.info.participants[index]}
          size='lg'
          options={{ useChampSplash: false }}
        />
      ))}
      <div className='h-4' />
      {team2.map((index) => (
        <PlayerScoreboard
          maxDamage={maxDamage}
          key={`player-${index}`}
          participant={matchData.info.participants[index]}
          size='lg'
          options={{ useChampSplash: false }}
        />
      ))}
      IconMedium:
      {team1.map((index) => (
        <PlayerScoreboard
          maxDamage={maxDamage}
          key={`player-${index}`}
          participant={matchData.info.participants[index]}
          size='md'
          options={{ useChampSplash: false }}
        />
      ))}
      <div className='h-4' />
      {team2.map((index) => (
        <PlayerScoreboard
          maxDamage={maxDamage}
          key={`player-${index}`}
          participant={matchData.info.participants[index]}
          size='md'
          options={{ useChampSplash: false }}
        />
      ))}
      IconSmall:
      {team1.map((index) => (
        <PlayerScoreboard
          maxDamage={maxDamage}
          key={`player-${index}`}
          participant={matchData.info.participants[index]}
          size='sm'
          options={{ useChampSplash: false }}
        />
      ))}
      <div className='h-4' />
      {team2.map((index) => (
        <PlayerScoreboard
          maxDamage={maxDamage}
          key={`player-${index}`}
          participant={matchData.info.participants[index]}
          size='sm'
          options={{ useChampSplash: false }}
        />
      ))}
    </div>
  );
};
