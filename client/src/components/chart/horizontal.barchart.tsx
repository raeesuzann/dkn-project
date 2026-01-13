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
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'DKN System Total Contents Overview',
    },
  },
};

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const data = {
  labels,
  datasets: [
    {
      label: 'Flagged Content',
      data: labels.map(() => faker.number.int({ min: 0, max: 50 })),
      backgroundColor: 'rgb(120, 31, 50)',
    },
    {
      label: 'Verified Content',
      data: labels.map(() => faker.number.int({ min: 0, max: 50 })),
      backgroundColor: 'rgb(53, 162, 235)',
    },
  ],
};

export function HorizontalBarChart() {
  return <Bar options={options} data={data} />;
}
