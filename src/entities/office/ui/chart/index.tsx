import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Загруженность отделения',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export type OfficeLoadChartProps = {
  openHours: {
    days: string;
    hours: string;
    averageLoad: number[];
  }[];
  day: string;
};

const OfficeLoadChart: React.FC<OfficeLoadChartProps> = ({
  openHours,
  day,
}) => {
  const openHoursByDay = openHours.find((item) => item.days === day);
  const begin = openHoursByDay?.hours.split('-')[0].split(':')[0];
  const end = openHoursByDay?.hours.split('-')[1].split(':')[0];
  if (!openHoursByDay) return null;

  console.log(begin, end);

  const data = {
    labels: Array.from(
      { length: Number(end) - Number(begin) + 1 },
      (_, i) => Number(begin) + i,
    ),
    datasets: [
      {
        label: 'Загруженность',
        data: openHoursByDay.averageLoad,
        backgroundColor: 'rgb(255, 99, 132)',
      },
    ],
  };

  console.log(data);

  return <Bar options={options} data={data} />;
};

export default OfficeLoadChart;
