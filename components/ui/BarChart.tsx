"use client"

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the Chart component
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { ApexOptions } from 'apexcharts';

const BarChart: React.FC = () => {
  const options: ApexOptions = {
    chart: {
      id: 'bar-chart'
    },
    xaxis: {
      categories: ['Apples', 'Oranges', 'Bananas', 'Grapes', 'Strawberries']
    },
    title: {
      text: 'Fruit Sales Data',
      align: 'left'
    },
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1
    }
  };

  const series = [
    {
      name: 'Sales',
      data: [30, 40, 35, 50, 49]
    }
  ];

  return (
    <div>
      <h2>Bar Chart</h2>
      <Chart
        options={options}
        series={series}
        type="bar"
        height={320}
        className="bg-gradient-to-br from-purple-600 to-[aqua]"
      />
    </div>
  );
};

export default BarChart;
