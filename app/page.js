'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export default function Page() {
  const [emissionsData, setEmissionsData] = useState([]);

  useEffect(() => {
    // Replace this URL with your Azure Function when ready
    axios.get('https://example.azurewebsites.net/api/emissions')
      .then((response) => {
        const details = response.data.details;
        setEmissionsData([
          { name: 'VM Hours', value: details['VM Hours'][0] },
          { name: 'Storage GB', value: details['Storage GB'][0] },
        ]);
      })
      .catch((error) => {
        console.warn('Using fallback mock data.');
        setEmissionsData([
          { name: 'VM Hours', value: 120 },
          { name: 'Storage GB', value: 420 },
        ]);
      });
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-green-600 mb-6">GreenIT Analytics Dashboard</h1>

      <PieChart width={400} height={300}>
        <Pie
          data={emissionsData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#22c55e"
          label
        >
          {emissionsData.map((_, index) => (
            <Cell key={`cell-${index}`} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      <p className="mt-8 text-sm text-gray-500">
        Estimated carbon emissions from compute and storage resources.
      </p>
    </main>
  );
}
