'use client';

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useMemo, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  type ViewOption,
  ViewSelector,
} from '@/app/match/[matchId]/overview/components/GoldChart/ViewSelector';
import { getGoldInfo } from '@/lib/timeline';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
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

export const GoldChart = ({ match, timeline }: GameChartProps): JSX.Element => {
  const [view, setView] = useState<ViewOption>('Team Gold Advantage');

  const { participants, red, blue, difference } = useMemo(
    () => getGoldInfo(match, timeline),
    [],
  );

  const options = {
    responsive: false,
  };

  const data = {
    datasets: [
      {
        label: 'Blue Team',
        data: blue.map(goldTimestampToPoint),
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
      },
      {
        label: 'Red Team',
        data: red.map(goldTimestampToPoint),
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
      },
    ],
  };
  return (
    <div className='flex flex-col mt-2'>
      <ViewSelector view={view} onSelectView={setView} />

      <Scatter width='800px' height='450px' options={options} data={data} />
    </div>
  );
};
