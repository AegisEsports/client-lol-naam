export type ItemBuild = {
  minute: number;
  items: {
    id: number;
    sold: boolean;
    quantity: number;
  }[];
}[];

const getItemBuilds = (
  timeline: Riot.MatchV5.Timeline,
): {
  [puuid: string]: ItemBuild;
} => {
  const builds: {
    [participantId: number]: ItemBuild;
  } = Object.fromEntries(
    timeline.info.participants.map(({ participantId }) => [participantId, []]),
  );

  const transactions = timeline.info.frames
    .map((frame) =>
      frame.events.filter((event) =>
        ['ITEM_PURCHASED', 'ITEM_SOLD', 'ITEM_UNDO'].includes(event.type),
      ),
    )
    .flat();

  transactions.forEach((t) => {
    if (t.type === 'ITEM_UNDO') {
      // TODO: filter out undid transactions
      return;
    }

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
        minute: minute,
        items: [],
      };

      builds[participantId].push(buildThisMinute);
    }

    if (t.type === 'ITEM_PURCHASED') {
      const item = buildThisMinute.items.find((i) => i.id === t.itemId);

      if (item) item.quantity = item.quantity ? item.quantity + 1 : 1;
      else
        buildThisMinute.items.push({ id: t.itemId, sold: false, quantity: 1 });
    }

    if (t.type === 'ITEM_SOLD') {
      const item = buildThisMinute.items.find((i) => i.id === t.itemId);

      if (item) item.quantity = item.quantity ? item.quantity + 1 : 1;
      else
        buildThisMinute.items.push({ id: t.itemId, sold: true, quantity: 1 });
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

export const getBuilds = (
  match: Riot.MatchV5.Match,
  timeline: Riot.MatchV5.Timeline,
): {
  [puuid: string]: {
    puuid: string;
    summonerName: string;
    championId: number;
    build: ItemBuild;
  };
} => {
  const builds = getItemBuilds(timeline);

  const participants = match.info.participants.map((participant) => ({
    puuid: participant.puuid,
    summonerName: participant.summonerName,
    championId: participant.championId,
  }));

  return Object.fromEntries(
    participants.map((participant) => [
      participant.puuid,
      {
        ...participant,
        build: builds[participant.puuid],
      },
    ]),
  );
};
