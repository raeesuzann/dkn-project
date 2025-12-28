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
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const,
    },
    title: {
      display: true,
      text: 'Top Contributors',
    },
  },
};

const labels = ['2026'];

const data = {
  labels,
  datasets: [
    {
      label: 'User1',
      data: labels.map(() => faker.number.int({ min: 3, max: 50 })),
      backgroundColor: 'rgb(156, 45, 49)',
    },
    {
      label: 'User2',
      data: labels.map(() => faker.number.int({ min: 3, max: 50 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'User3',
      data: labels.map(() => faker.number.int({ min: 3, max: 50 })),
      backgroundColor: 'rgb(156, 45, 49)',
    },
    {
      label: 'User4',
      data: labels.map(() => faker.number.int({ min: 3, max: 50 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'User5',
      data: labels.map(() => faker.number.int({ min: 3, max: 50 })),
      backgroundColor: 'rgb(156, 45, 49)',
    },
    {
      label: 'User6',
      data: labels.map(() => faker.number.int({ min: 3, max: 50 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'User7',
      data: labels.map(() => faker.number.int({ min: 3, max: 50 })),
      backgroundColor: 'rgb(156, 45, 49)',
    },
    {
      label: 'User8',
      data: labels.map(() => faker.number.int({ min: 3, max: 50 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function TopContributors() {
  return <Bar options={options} data={data} />;
}
