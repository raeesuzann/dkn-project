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
      text: 'Frequently Accessed Contents',
    },
  },
};

const labels = ['2026'];

const data = {
  labels,
  datasets: [
    {
      label: 'Content 1',
      data: labels.map(() => faker.number.int({ min: 3, max: 50 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Content 2',
      data: labels.map(() => faker.number.int({ min: 3, max: 50 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Content 3',
      data: labels.map(() => faker.number.int({ min: 3, max: 50 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Content 4',
      data: labels.map(() => faker.number.int({ min: 3, max: 50 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Content 5',
      data: labels.map(() => faker.number.int({ min: 3, max: 50 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Content 6',
      data: labels.map(() => faker.number.int({ min: 3, max: 50 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Content 7',
      data: labels.map(() => faker.number.int({ min: 3, max: 50 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Content 8',
      data: labels.map(() => faker.number.int({ min: 3, max: 50 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function FrequentlyAccessedContents() {
  return <Bar options={options} data={data} />;
}
