'use client';

import {
  CategoryScale,
  type ChartData,
  Chart as ChartJS,
  type ChartOptions,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { ceil } from 'lodash-es';
import { useTheme } from 'next-themes';
import { useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import colors from 'tailwindcss/colors';
import {
  type ViewOption,
  ViewSelector,
} from '@/app/match/[matchId]/overview/components/GoldChart/ViewSelector';
import { getGoldInfo } from '@/lib/timeline';
import { formatSeconds } from '@/lib/utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export type GameChartProps = {
  match: Riot.MatchV5.Match;
  timeline: Riot.MatchV5.Timeline;
};

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

const roundBound = (value: number): number => {
  // Needed to ensure 0 is included in the ticks; there is likely a better approach
  return (
    [
      0, 1000, 2000, 3000, 4000, 5000, 6000, 8000, 10000, 12000, 14000, 16000,
      18000, 20000, 300000, 40000, 50000, 100000,
    ].find((n) => n > Math.abs(value)) ?? 0
  );
};

export const GoldChart = ({ match, timeline }: GameChartProps): JSX.Element => {
  const [view, setView] = useState<ViewOption>('Team Gold Advantage');
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
  } = useMemo(() => getGoldInfo(match, timeline), [match, timeline]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    parsing: false,
    plugins: {
      filler: {
        propagate: false,
      },
      legend: {
        display: view !== 'Team Gold Advantage',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => {
            const { x: ms, y: gold } = context.parsed;

            return `${gold.toLocaleString()} at ${formatSeconds(Math.round(ms / 1000))}`;
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
                        (timestamps) => timestamps[timestamps.length - 1].gold,
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
            },
            {
              label: 'Red Team',
              data: redTeam.map(goldTimestampToPoint),
              borderColor: red,
              backgroundColor: red,
              showLine: true,
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
              pointRadius: 0,
            },
          ],
        };
      case 'Champion Gold':
        return {
          datasets: Object.entries(participants).map(
            ([puuid, timestamps], index) => ({
              label: puuid,
              data: timestamps.map(goldTimestampToPoint),
              borderColor: `hsl(${(index / 10) * 360}, 100%, 50%)`,
              backgroundColor: `hsla(${(index / 10) * 360}, 100%, 50%)`,
              showLine: true,
            }),
          ),
        };
    }
  }, [blue, blueTeam, difference, participants, red, redTeam, view]);

  return (
    <div className='flex flex-col mt-2 grow px-4'>
      <ViewSelector view={view} onSelectView={setView} />

      <Line options={options} data={data} />
    </div>
  );
};
