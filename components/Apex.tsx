

import React from 'react';
import LineChart from './ui/LineChart';
import BarChart from './ui/BarChart';

const Apex: React.FC = () => {
  return (
    <div>
      <h1>Welcome to My Chart Dashboard</h1>
      <LineChart />
      <BarChart />
    </div>
  );
};

export default Apex;
