namespace Riot {
  export namespace MatchV5 {
    export type Match = {
      metadata: Metadata;
      info: Info;
    };

    export type Metadata = {
      dataVersion: string;
      matchId: string;
      participants: string[];
    };

    export type Info = {
      gameCreation: number;
      gameDuration: number;
      gameId: number;
      gameMode: string;
      gameName: string;
      gameStartTimestamp: number;
      gameType: string;
      gameVersion: string;
      mapId: number;
      participants: Participant[];
      platformId: string;
      queueId: number;
      teams: Team[];
      tournamentCode: string;
    };

    export type Participant = {
      assists: number;
      baronKills: number;
      bountyLevel: number;
      champExperience: number;
      champLevel: number;
      championId: number;
      championName: string;
      championTransform: number;
      consumablesPurchased: number;
      damageDealtToBuildings: number;
      damageDealtToObjectives: number;
      damageDealtToTurrets: number;
      damageSelfMitigated: number;
      deaths: number;
      detectorWardsPlaced: number;
      doubleKills: number;
      dragonKills: number;
      firstBloodAssist: boolean;
      firstBloodKill: boolean;
      firstTowerAssist: boolean;
      firstTowerKill: boolean;
      gameEndedInEarlySurrender: boolean;
      gameEndedInSurrender: boolean;
      goldEarned: number;
      goldSpent: number;
      individualPosition: Role;
      inhibitorKills: number;
      inhibitorTakedowns: number;
      inhibitorsLost: number;
      item0: number;
      item1: number;
      item2: number;
      item3: number;
      item4: number;
      item5: number;
      item6: number;
      itemsPurchased: number;
      killingSprees: number;
      kills: number;
      lane: string;
      largestCriticalStrike: number;
      largestKillingSpree: number;
      largestMultiKill: number;
      longestTimeSpentLiving: number;
      magicDamageDealt: number;
      magicDamageDealtToChampions: number;
      magicDamageTaken: number;
      neutralMinionsKilled: number;
      nexusKills: number;
      nexusTakedowns: number;
      nexusLost: number;
      objectivesStolen: number;
      objectivesStolenAssists: number;
      participantId: number;
      pentaKills: number;
      perks: Perks;
      physicalDamageDealt: number;
      physicalDamageDealtToChampions: number;
      physicalDamageTaken: number;
      profileIcon: number;
      puuid: string;
      quadraKills: number;
      riotIdName: string;
      riotIdTagline: string;
      role: string;
      sightWardsBoughtInGame: number;
      spell1Casts: number;
      spell2Casts: number;
      spell3Casts: number;
      spell4Casts: number;
      summoner1Casts: number;
      summoner1Id: number;
      summoner2Casts: number;
      summoner2Id: number;
      summonerId: string;
      summonerLevel: number;
      summonerName: string;
      teamEarlySurrendered: boolean;
      teamId: number;
      teamPosition: Role;
      timeCCingOthers: number;
      timePlayed: number;
      totalDamageDealt: number;
      totalDamageDealtToChampions: number;
      totalDamageShieldedOnTeammates: number;
      totalDamageTaken: number;
      totalHeal: number;
      totalHealsOnTeammates: number;
      totalMinionsKilled: number;
      totalTimeCCDealt: number;
      totalTimeSpentDead: number;
      totalUnitsHealed: number;
      tripleKills: number;
      trueDamageDealt: number;
      trueDamageDealtToChampions: number;
      trueDamageTaken: number;
      turretKills: number;
      turretTakedowns: number;
      turretsLost: number;
      unrealKills: number;
      visionScore: number;
      visionWardsBoughtInGame: number;
      wardsKilled: number;
      wardsPlaced: number;
      win: boolean;
    };

    export type Role = 'TOP' | 'JUNGLE' | 'MIDDLE' | 'BOTTOM' | 'UTILITY';

    export type Perks = {
      statPerks: PerkStats;
      styles: PerkStyle[];
    };

    export type PerkStats = {
      defense: number;
      flex: number;
      offense: number;
    };

    export type PerkStyle = {
      description: string;
      selections: PerkStyleSelection[];
      style: number;
    };

    export type PerkStyleSelection = {
      perk: number;
      var1: number;
      var2: number;
      var3: number;
    };

    export type Team = {
      bans: Ban[];
      objectives: Objective;
      teamId: number;
      win: boolean;
    };

    export type Ban = {
      championId: number;
      pickTurn: number;
    };

    export type Objective = {
      baron: ObjectiveDetail;
      champion: ObjectiveDetail;
      dragon: ObjectiveDetail;
      inhibitor: ObjectiveDetail;
      riftHerald: ObjectiveDetail;
      tower: ObjectiveDetail;
    };

    export type ObjectiveDetail = {
      first: boolean;
      kills: number;
    };
  }

  export namespace DDragon {
    export type RuneLookup = {
      id: number;
      key: string;
      icon: string;
      name: string;
      slots: {
        runes: {
          id: number;
          key: string;
          icon: string;
          name: string;
          shortDesc: string;
          longDesc: string;
        }[];
      }[];
    };

    export type SummonerLookup = {
      type: string;
      version: string;
      data: {
        [key: string]: {
          id: string;
          name: string;
          description: string;
          tooltip: string;
          maxrank: number;
          cooldown: number[];
          cooldownBurn: string;
          cost: number[];
          costBurn: string;
          datavalues: {};
          effect: (number[] | null)[];
          effectBurn: (string | null)[];
          vars: {
            link: string;
            coeff: number;
            key: string;
          }[];
          key: string;
          summonerLevel: number;
          modes: string[];
          costType: string;
          maxammo: string;
          range: number[];
          rangeBurn: string;
          image: {
            full: string;
            sprite: string;
            group: string;
            x: number;
            y: number;
            w: number;
            h: number;
          };
          resource: string;
        };
      };
    };
  }
}
