import { StatRow } from './StatTable/StatRow';
import { StatSection } from './StatTable/StatSection';
import { ChampIcon } from '@/components/riotIcons/ChampIcon';
import { type Participants } from '@/lib/match';
import { cn } from '@/lib/utils';

/** Structure of sections/stats to show in the table. */
const statTable: Record<
  string,
  Record<string, (p: Riot.MatchV5.Participant) => string | boolean | number>
> = {
  Combat: {
    KDA: (p) => `${p.kills}/${p.deaths}/${p.assists}`,
    'Largest Killing Spree': (p) => p.largestKillingSpree,
    'Largest Multi Kill': (p) => p.largestMultiKill,
    'Crowd Control Score': (p) => p.timeCCingOthers,
    'First Blood': (p) => p.firstBloodKill,
  },
  'Damage Dealt': {
    'Total Damage to Champions': (p) => p.totalDamageDealtToChampions,
    'Physical Damage to Champions': (p) => p.physicalDamageDealtToChampions,
    'Magic Damage to Champions': (p) => p.magicDamageDealtToChampions,
    'True Damage to Champions': (p) => p.trueDamageDealtToChampions,
    'Total Damage Dealt': (p) => p.totalDamageDealt,
    'Physical Damage Dealt': (p) => p.physicalDamageDealt,
    'Magic Damage Dealt': (p) => p.magicDamageDealt,
    'True Damage Dealt': (p) => p.trueDamageDealt,
    'Largest Critical Strike': (p) => p.largestCriticalStrike,
    'Total Damage to Turrets': (p) => p.damageDealtToTurrets,
    'Total Damage to Objectives': (p) => p.damageDealtToObjectives,
  },
  'Damage Taken and Healed': {
    'Damage Healed': (p) => p.totalHeal,
    'Damage Taken': (p) => p.totalDamageTaken,
    'Physical Damage Taken': (p) => p.physicalDamageTaken,
    'Magic Damage Taken': (p) => p.magicDamageTaken,
    'True Damage Taken': (p) => p.trueDamageTaken,
    'Self Mitigated Damage': (p) => p.damageSelfMitigated,
  },
  Vision: {
    'Vision Score': (p) => p.visionScore,
    'Wards Placed': (p) => p.wardsPlaced,
    'Wards Destroyed': (p) => p.wardsKilled,
    'Control Wards Purchased': (p) => p.visionWardsBoughtInGame,
  },
  Income: {
    'Gold Earned': (p) => p.goldEarned,
    'Gold Spent': (p) => p.goldSpent,
    'Minions Killed': (p) => p.totalMinionsKilled,
    'Jungle Minions Killed': (p) => p.neutralMinionsKilled,
  },
  Misc: {
    'Towers Destroyed': (p) => p.turretKills,
    'Inhibitors Destroyed': (p) => p.inhibitorKills,
  },
};

/** Props for {@link StatTable}. */
export type StatTableProps = {
  /** The Riot API match data. */
  match: Riot.MatchV5.Match;
  /** List of players from the match. */
  players: Participants;
};

/** A stat table emulating the one in the League of Legends client. */
export const StatTable = ({ match, players }: StatTableProps): JSX.Element => {
  return (
    <table className='text-[9px] lg:text-xs 2xl:text-base [&_td]:p-1'>
      <thead>
        <tr>
          <th colSpan={2} />
          {Object.values(players).map((player, index) => {
            return (
              <th key={index} className='w-12 lg:w-[4.5rem] 2xl:w-24'>
                <div
                  className={cn(
                    'm-auto block w-fit ring-2 lg:ring-3 2xl:ring-4 rounded-lg',
                    player.teamId === 100 ? 'ring-blue-500' : 'ring-red-500',
                  )}
                >
                  <ChampIcon champId={player.championId} />
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {Object.entries(statTable).map(([label, functions]) => (
          <StatSection key={label} label={label}>
            {Array.from(Object.entries(functions)).map(([label, func]) => (
              <StatRow key={label} match={match} label={label} getter={func} />
            ))}
          </StatSection>
        ))}
      </tbody>
    </table>
  );
};