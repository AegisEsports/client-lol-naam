'use client';

import {
  CategoryScale,
  type ChartData,
  Chart as ChartJS,
  type ChartOptions,
  Tooltip as ChartTooltip,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
} from 'chart.js';
import { ceil } from 'lodash-es';
import { X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import colors from 'tailwindcss/colors';
import { PlayerSelector } from '@/app/match/[matchId]/overview/components/GoldChart/PlayerSelector';
import {
  type ViewOption,
  ViewSelector,
} from '@/app/match/[matchId]/overview/components/GoldChart/ViewSelector';
import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';
import { type Participants } from '@/lib/match';
import { getGoldInfo } from '@/lib/timeline';
import { formatSeconds } from '@/lib/utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  Filler,
);

/** Props for {@link GoldChart}. */
export type GoldChartProps = {
  timeline: Riot.MatchV5.Timeline;
  players: Participants;
};

/** Converts gold timestamp to a cartesian point. */
const goldTimestampToPoint = ({
  timestamp,
  gold,
}: {
  timestamp: number;
  gold: number;
}): {
  x: number;
  y: number;
} => ({ x: timestamp, y: gold });

/** Rounds the value to a specific bound. */
const roundBound = (value: number): number => {
  // Needed to ensure 0 is included in the ticks; there is likely a better approach
  return (
    [
      0, 1000, 2000, 3000, 4000, 5000, 6000, 8000, 10000, 12000, 14000, 16000,
      18000, 20000, 300000, 40000, 50000, 100000,
    ].find((n) => n > Math.abs(value)) ?? 0
  );
};

/**
 * A gold chart that emulates one from the League of Legends client.
 */
export const GoldChart = ({
  timeline,
  players,
}: GoldChartProps): JSX.Element => {
  const [view, setView] = useState<ViewOption>('Team Gold Advantage');
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const [hoveredPlayer, setHoveredPlayer] = useState<number | undefined>();

  const { resolvedTheme: theme = 'light' } = useTheme();
  const isDark = theme === 'dark';

  const tickColor = colors.gray[isDark ? 800 : 200];
  const red = colors.red[500];
  const blue = colors.blue[500];
  const xInterval = 120000;

  const {
    participants,
    red: redTeam,
    blue: blueTeam,
    difference,
  } = useMemo(() => getGoldInfo(players, timeline), [players, timeline]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    parsing: false,
    plugins: {
      legend: {
        display: false,
      },
      filler: {
        propagate: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => {
            const { x: ms, y: gold } = context.parsed;
            const name = context.dataset.label;

            return `${view === 'Champion Gold' ? `${name}: ` : ''}${gold.toLocaleString()} at ${formatSeconds(Math.round(ms / 1000))}`;
          },
          title: () => '',
        },
        displayColors: view !== 'Team Gold Advantage',
      },
    },
    scales: {
      x: {
        type: 'linear',
        grid: {
          display: false,
        },
        ticks: {
          callback: (value) => formatSeconds((value as number) / 1000),
          stepSize: xInterval,
        },
        afterBuildTicks: ({ ticks }) => {
          ticks.pop();
          ticks.push({ value: ticks[ticks.length - 1].value + xInterval });
        },
        max: difference[difference.length - 1].timestamp,
      },
      y: {
        type: 'linear',
        grid: {
          color: tickColor,
          tickColor,
          lineWidth: ({ tick }) => (tick.value === 0 ? 3 : 1),
        },
        border: {
          display: false,
        },
        ticks: {
          callback: (value) =>
            `${(value as number) / 1000}${value !== 0 ? 'k' : ''}`,
          stepSize: 1000,
        },
        max:
          view === 'Team Gold Advantage'
            ? roundBound(Math.abs(difference[difference.length - 1].gold))
            : ceil(
                view === 'Champion Gold'
                  ? Math.max(
                      ...Object.values(participants).map(
                        ({ timestamps }) =>
                          timestamps[timestamps.length - 1].gold,
                      ),
                    )
                  : Math.max(
                      redTeam[redTeam.length - 1].gold,
                      blueTeam[blueTeam.length - 1].gold,
                    ),
                -3,
              ),
        min:
          view === 'Team Gold Advantage'
            ? -1 * roundBound(Math.abs(difference[difference.length - 1].gold))
            : 0,
      },
    },
  };

  const data: ChartData<'line'> = useMemo(() => {
    switch (view) {
      case 'Team Gold':
        return {
          datasets: [
            {
              label: 'Blue Team',
              data: blueTeam.map(goldTimestampToPoint),
              borderColor: blue,
              backgroundColor: blue,
              showLine: true,
              pointRadius: 0,
              borderWidth: 2,
            },
            {
              label: 'Red Team',
              data: redTeam.map(goldTimestampToPoint),
              borderColor: red,
              backgroundColor: red,
              showLine: true,
              pointRadius: 0,
              borderWidth: 2,
            },
          ],
        };
      case 'Team Gold Advantage':
        return {
          datasets: [
            {
              label: 'Team Gold Advantage',
              data: difference.map(goldTimestampToPoint),
              showLine: true,
              fill: {
                above: blue,
                below: red,
                target: { value: 0 },
              },
              borderWidth: 0,
            },
          ],
        };
      case 'Champion Gold':
        return {
          datasets: Object.values(participants).map(
            (
              // todo: might be worth refactoring whatever lead to this point
              {
                participant: { displayName, participantId, teamId },
                timestamps,
              },
            ) => {
              const color = `${teamId === 100 ? blue : red}${hoveredPlayer !== undefined && hoveredPlayer !== participantId ? '0a' : 'FF'}`;

              return {
                label: displayName,
                data: timestamps.map(goldTimestampToPoint),
                borderColor: color,
                backgroundColor: color,
                showLine: true,
                pointRadius: 0,
                borderWidth: 2,
                hidden:
                  selectedPlayers.length !== 0 &&
                  hoveredPlayer !== participantId &&
                  !selectedPlayers.includes(participantId),
              };
            },
          ),
        };
    }
  }, [
    blue,
    blueTeam,
    difference,
    hoveredPlayer,
    participants,
    red,
    redTeam,
    selectedPlayers,
    view,
  ]);

  return (
    <div className='flex flex-col mt-2 grow px-4 gap-2'>
      <ViewSelector view={view} onSelectView={setView} />
      {view === 'Champion Gold' && (
        <div className='flex items-center justify-between gap-4'>
          <PlayerSelector
            players={players}
            selected={selectedPlayers}
            hovered={hoveredPlayer}
            onHover={setHoveredPlayer}
            onSelect={(id) => {
              if (selectedPlayers.includes(id)) {
                setSelectedPlayers((ids) =>
                  ids.filter((otherId) => otherId !== id),
                );
                return;
              }

              if (selectedPlayers.length >= Object.values(players).length - 1) {
                setSelectedPlayers([]);
                return;
              }

              setSelectedPlayers((ids) => [...ids, id]);
            }}
          />
          {selectedPlayers.length !== 0 && (
            <Tooltip tooltip='Clear selection'>
              <Button asChild className='h-12 w-12 text-background p-2'>
                <X
                  onClick={() => {
                    setSelectedPlayers([]);
                  }}
                />
              </Button>
            </Tooltip>
          )}
        </div>
      )}

      <Line options={options} data={data} />
    </div>
  );
};
