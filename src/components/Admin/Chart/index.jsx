import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";


const Chart = ({ genderStatistic }) => {

  const data = [
    { id: 0, value: genderStatistic?.maleCount, label: "Male" },
    { id: 1, value: genderStatistic?.femaleCount, label: "Female" },
    { id: 2, value: genderStatistic?.otherCount, label: "None" },
  ];

  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      height={200}
    />
  );
};

export default Chart;
