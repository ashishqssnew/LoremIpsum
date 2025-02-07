import { useMemo } from "react";
import { Bar } from "react-chartjs-2";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from "chart.js";

import { Data } from "../../../types";

// Register necessary chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

// Chart options for horizontal bar chart
const options = {
   indexAxis: "y" as const,
   elements: {
      bar: {
         borderWidth: 2,
      },
   },
};

type Props = {
   data: Data[number]["attributes"];
};

// BarChart component to display data in a horizontal bar chart
const BarChart = ({ data }: Props) => {
   // Using useMemo to prevent unnecessary recalculations of chart data
   const bar_data = useMemo(() => ({
      labels: data.map(({ name }) => name),
      datasets: [
         {
            data: data.map(({ value }) => value),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
         },
      ],
   }), [data]); // Only recalculate when 'data' changes

   return <Bar options={options} data={bar_data} height={200} />;
};

export default BarChart;
