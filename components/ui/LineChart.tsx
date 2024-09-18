"use client"

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the Chart component
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { ApexOptions } from 'apexcharts';

const LineChart: React.FC = () => {
  const options: ApexOptions = {
    chart: {
      id: 'line-chart'
    },
    xaxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
    },
    stroke: {
      curve: 'smooth' as 'smooth'
    },
    title: {
      text: 'Monthly Sales Data',
      align: 'left'
    },
    markers: {
      size: 5
    }
  };

  const series = [
    {
      name: 'Sales',
      data: [30, 40, 35, 50, 49, 60, 70]
    }
  ];

  return (
    <div>
      <h2>Line Chart</h2>
      <Chart
        options={options}
        series={series}
        type="line"
        height={320}
      />
    </div>
  );
};

export default LineChart;
