'use client';

import { useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export default function Page() {
  const [vmHours, setVmHours] = useState(150);
  const [storageGb, setStorageGb] = useState(500);
  const [emissionsData, setEmissionsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmissions = () => {
    setLoading(true);
    const url = `https://greenit-backend-api.azurewebsites.net/api/emissions?vm=${vmHours}&storage=${storageGb}`;

    axios.get(url)
      .then((response) => {
        const details = response.data.details;
        setEmissionsData([
          { name: 'VM Hours', value: details['VM Hours'][0] },
          { name: 'Storage GB', value: details['Storage GB'][0] },
        ]);
      })
      .catch((error) => {
        console.error('API Error:', error);
        setEmissionsData([
          { name: 'VM Hours', value: 120 },
          { name: 'Storage GB', value: 420 },
        ]);
      })
      .finally(() => setLoading(false));
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-green-600 mb-8">GreenIT Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 w-full max-w-3xl">
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">VM Hours</label>
          <input
            type="number"
            value={vmHours}
            onChange={(e) => setVmHours(e.target.value)}
            className="p-2 border rounded"
            placeholder="e.g., 300"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">Storage (GB)</label>
          <input
            type="number"
            value={storageGb}
            onChange={(e) => setStorageGb(e.target.value)}
            className="p-2 border rounded"
            placeholder="e.g., 150"
          />
        </div>

        <div className="flex flex-col justify-end">
          <button
            onClick={fetchEmissions}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {loading ? 'Loading...' : 'Calculate Emissions'}
          </button>
        </div>
      </div>

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
        Estimated CO₂ emissions based on your cloud usage.
      </p>
    </main>
  );
}
