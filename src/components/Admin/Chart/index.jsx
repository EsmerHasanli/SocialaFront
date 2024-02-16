import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { id: 0, value: 35, label: 'Male' },
  { id: 1, value: 40, label: 'Female' },
  { id: 2, value: 15, label: 'None' },
];

const Chart = () => (
  <PieChart
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={200}
    />
);

export default Chart;
