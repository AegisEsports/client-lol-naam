export type ItemBuild = {
  minute: number;
  items: {
    id: number;
    sold: boolean;
  }[];
}[];

export const getItemBuilds = (
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
      buildThisMinute.items.push({ id: t.itemId, sold: false });
    }

    if (t.type === 'ITEM_SOLD') {
      buildThisMinute.items.push({ id: t.itemId, sold: true });
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
