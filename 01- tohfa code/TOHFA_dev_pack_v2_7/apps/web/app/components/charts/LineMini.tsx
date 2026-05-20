// apps/web/app/components/charts/LineMini.tsx
'use client';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function LineMini({ labels, seriesA, labelA='Series A', seriesB, labelB='Series B' } : { labels: string[], seriesA: number[], labelA?: string, seriesB?: number[], labelB?: string }) {
  const data:any = {
    labels,
    datasets: [
      { label: labelA, data: seriesA, tension: 0.3 },
    ]
  };
  if (seriesB) data.datasets.push({ label: labelB, data: seriesB, tension: 0.3 });
  const options:any = {
    responsive: true,
    plugins: { legend: { display: true } },
    scales: { x: { display: true }, y: { display: true } },
  };
  return <Line data={data} options={options} />;
}
