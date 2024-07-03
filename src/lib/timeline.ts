import { groupBy } from 'lodash-es';

/** Represents one shop visit. */
export type ItemBuild = {
  /** The time of the shop visit. */
  minute: number;
  /** The transactions in the visit. */
  items: {
    /** The item id. */
    id: number;
    /** Whether the item was sold or not. */
    sold: boolean;
    /** How many of the item were purchased or sold. */
    quantity: number;
  }[];
}[];

/**
 * Removes ITEM_UNDO events from a list of events, along with the corresponding
 * ITEM_PURCHASED and ITEM_SOLD events.
 *
 * @param events The list of timeline events
 * @returns An updated list of timeline events with events removed
 */
const removeUndos = (
  events: Riot.MatchV5.TimelineEvent[],
): Riot.MatchV5.TimelineEvent[] => {
  const transactions: Riot.MatchV5.TimelineEvent[] = [];

  events.forEach((event) => {
    if (event.type === 'ITEM_UNDO') {
      const index = transactions.findLastIndex(
        (t) =>
          (t.type === 'ITEM_PURCHASED' || t.type === 'ITEM_SOLD') &&
          event.participantId === t.participantId,
      );

      transactions.splice(index, 1);
    } else {
      transactions.push(event);
    }
  });

  return transactions;
};

/**
 * Returns the complete list of shop transactions for each player in a game.
 *
 * @param timeline A match timeline
 * @returns A record of each player in the match's puuid, mapped to their item
 * build.
 */
export const getItemBuilds = (
  timeline: Riot.MatchV5.Timeline,
): Record<string, ItemBuild> => {
  const builds: Record<number, ItemBuild> = Object.fromEntries(
    timeline.info.participants.map(({ participantId }) => [participantId, []]),
  );

  const transactions = timeline.info.frames
    .map((frame) =>
      frame.events.filter((event) =>
        ['ITEM_PURCHASED', 'ITEM_SOLD', 'ITEM_UNDO'].includes(event.type),
      ),
    )
    .flat();

  removeUndos(transactions).forEach((t) => {
    // always true but makes typescript happy
    if (t.type !== 'ITEM_PURCHASED' && t.type !== 'ITEM_SOLD') {
      return;
    }

    const participantId = t.participantId;

    const minute = Math.round(t.timestamp / 60000);

    let buildThisMinute = builds[participantId].find(
      (build) => build.minute === minute,
    );

    if (!buildThisMinute) {
      buildThisMinute = {
        minute,
        items: [],
      };

      builds[participantId].push(buildThisMinute);
    }

    if (t.type === 'ITEM_PURCHASED') {
      const item = buildThisMinute.items.find((i) => i.id === t.itemId);

      if (item) item.quantity = item.quantity + 1;
      else {
        buildThisMinute.items.push({ id: t.itemId, sold: false, quantity: 1 });
      }
    }

    if (t.type === 'ITEM_SOLD') {
      const item = buildThisMinute.items.find((i) => i.id === t.itemId);

      if (item) item.quantity = item.quantity + 1;
      else {
        buildThisMinute.items.push({ id: t.itemId, sold: true, quantity: 1 });
      }
    }
  });

  const puuids = Object.fromEntries(
    timeline.info.participants.map((participant) => [
      participant.participantId,
      participant.puuid,
    ]),
  );

  return Object.fromEntries(
    Object.entries(builds).map(([participantId, build]) => [
      puuids[participantId],
      build,
    ]),
  );
};

/**
 * Returns the skill max order for each player in a game.
 *
 * @param timeline A match timeline
 * @returns A record of each player in the match's puuid, mapped to an array of
 * skill slots corresponding to the skill max order.
 */
export const getSkillOrders = (
  timeline: Riot.MatchV5.Timeline,
): Record<string, number[]> => {
  const skillOrders: Record<number, number[]> = Object.fromEntries(
    timeline.info.participants.map(({ participantId }) => [participantId, []]),
  );

  timeline.info.frames.forEach((frame) => {
    frame.events
      .filter(
        (
          event,
        ): event is Riot.MatchV5.TimelineEvent & { type: 'SKILL_LEVEL_UP' } =>
          event.type === 'SKILL_LEVEL_UP',
      )
      .forEach((event) => {
        skillOrders[event.participantId].push(event.skillSlot);
      });
  });

  const puuids = Object.fromEntries(
    timeline.info.participants.map((participant) => [
      participant.participantId,
      participant.puuid,
    ]),
  );

  return Object.fromEntries(
    Object.entries(skillOrders).map(([participantId, skills]) => [
      puuids[participantId],
      skills,
    ]),
  );
};

const aggregateGoldValues = (timestamps: GoldTimestamp[]): GoldTimestamp[] =>
  Object.entries(groupBy(timestamps, 'timestamp')).map(([, goldValues]) => {
    const gold = goldValues.reduce((acc, { gold }) => acc + gold, 0);
    return { timestamp: goldValues[0].timestamp, gold };
  });

/** The total gold at a certain timestamp. */
export type GoldTimestamp = { timestamp: number; gold: number };

/**
 * Aggregates gold data for each timestamp for each player and team.
 */
export const getGoldInfo = (
  match: Riot.MatchV5.Match,
  timeline: Riot.MatchV5.Timeline,
): {
  /** Each player's total gold at each timestamp. */
  participants: Record<number, GoldTimestamp[]>;
  /** Blue team's total gold at each timestamp. */
  blue: GoldTimestamp[];
  /** Red team's total gold at each timestamp. */
  red: GoldTimestamp[];
  /** How ahead blue team is at each timestamp. */
  difference: GoldTimestamp[];
} => {
  const participantGold: Record<number, GoldTimestamp[]> = Object.fromEntries(
    timeline.info.participants.map(({ participantId }) => [participantId, []]),
  );

  // TODO: Create player util to get team, profile, etc.
  const whichTeam = Object.fromEntries(
    match.info.participants.map(({ participantId, teamId }) => [
      participantId,
      teamId,
    ]),
  );

  const blueGold: GoldTimestamp[] = [];
  const redGold: GoldTimestamp[] = [];

  timeline.info.frames.forEach(({ timestamp, participantFrames }) => {
    Object.entries(participantFrames).forEach(
      ([participantId, { totalGold: gold }]) => {
        participantGold[parseInt(participantId)].push({
          timestamp,
          gold,
        });

        if (whichTeam[parseInt(participantId)] === 100) {
          blueGold.push({ timestamp, gold });
        } else {
          redGold.push({ timestamp, gold });
        }
      },
    );
  });

  const difference = aggregateGoldValues([
    ...blueGold,
    ...redGold.map(({ timestamp, gold }) => ({ timestamp, gold: -gold })),
  ]);

  return {
    participants: participantGold,
    blue: aggregateGoldValues(blueGold),
    red: aggregateGoldValues(redGold),
    difference,
  };
};
