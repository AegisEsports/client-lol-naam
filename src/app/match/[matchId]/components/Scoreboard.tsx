import { CarouselController } from '@/app/match/[matchId]/components/CarouselController';
import { PlayerScoreboard } from '@/app/match/[matchId]/components/PlayerScoreboard';
import { TeamHeader } from '@/app/match/[matchId]/components/TeamHeader';

const BLUE = 100;
const RED = 200;

export type ScoreboardProps = {
  matchData: Riot.MatchV5.Match;
  size?: 'sm' | 'md' | 'lg';
  champIcon?: boolean;
  blueTeam?: string;
  redTeam?: string;
};

export const Scoreboard = ({
  matchData,
  size = 'md',
  champIcon = false,
  blueTeam = 'Blue Team',
  redTeam = 'Red Team',
}: ScoreboardProps): JSX.Element => {
  const maxDamage = Math.max(
    ...matchData.info.participants.map((p) => p.totalDamageDealtToChampions),
  );
  const maxDamageTaken = Math.max(
    ...matchData.info.participants.map((p) => p.totalDamageTaken),
  );

  const group = `${matchData.metadata.matchId}${size}${champIcon ? 'icon' : ''}`;

  const blueTeamData = matchData.info.teams.find((t) => t.teamId === BLUE);
  const redTeamData = matchData.info.teams.find((t) => t.teamId === RED);

  const blueTeamPlayers = matchData.info.participants.filter(
    (p) => p.teamId === BLUE,
  );

  const redTeamPlayers = matchData.info.participants.filter(
    (p) => p.teamId === RED,
  );

  const blueTeamStats = blueTeamPlayers.reduce(
    (acc, participant) => {
      return {
        kills: acc.kills + participant.kills,
        deaths: acc.deaths + participant.deaths,
        assists: acc.assists + participant.assists,
        gold: acc.gold + participant.goldEarned,
      };
    },
    {
      kills: 0,
      deaths: 0,
      assists: 0,
      gold: 0,
    },
  );

  const redTeamStats = redTeamPlayers.reduce(
    (acc, participant) => {
      return {
        kills: acc.kills + participant.kills,
        deaths: acc.deaths + participant.deaths,
        assists: acc.assists + participant.assists,
        gold: acc.gold + participant.goldEarned,
      };
    },
    {
      kills: 0,
      deaths: 0,
      assists: 0,
      gold: 0,
    },
  );

  if (!blueTeamData || !redTeamData) {
    return <div>Team data not found</div>;
  }

  return (
    <div className='flex flex-col'>
      <CarouselController group={`${group}-gold`} />
      <CarouselController group={`${group}-damage`} />
      <TeamHeader
        teamName={blueTeam}
        win={blueTeamData.win}
        bans={blueTeamData.bans}
        objectives={blueTeamData.objectives}
        size={size}
        kills={blueTeamStats.kills}
        deaths={blueTeamStats.deaths}
        assists={blueTeamStats.assists}
        gold={blueTeamStats.gold}
      />
      {blueTeamPlayers.map((participant) => (
        <PlayerScoreboard
          maxDamage={maxDamage}
          maxDamageTaken={maxDamageTaken}
          key={`player-${participant.puuid}`}
          participant={participant}
          size={size}
          options={{
            useChampSplash: !champIcon,
            group,
          }}
        />
      ))}
      <div className='h-4' />
      <TeamHeader
        teamName={redTeam}
        win={redTeamData.win}
        bans={redTeamData.bans}
        objectives={redTeamData.objectives}
        size={size}
        kills={redTeamStats.kills}
        deaths={redTeamStats.deaths}
        assists={redTeamStats.assists}
        gold={redTeamStats.gold}
      />
      {redTeamPlayers.map((participant) => (
        <PlayerScoreboard
          maxDamage={maxDamage}
          maxDamageTaken={maxDamageTaken}
          key={`player-${participant.puuid}`}
          participant={participant}
          size={size}
          options={{
            useChampSplash: !champIcon,
            group,
          }}
        />
      ))}
    </div>
  );
};
