import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useMemo } from 'react';
import type { Video } from '../../types';

interface ViewsTimeChartProps {
  videos: Video[];
}

export const ViewsTimeChart = ({ videos }: ViewsTimeChartProps) => {
  const chartData = useMemo(() => {
    const dataMap = videos.reduce((acc: Record<string, number>, video) => {
      acc[video.uploadDate] = (acc[video.uploadDate] || 0) + video.views;
      return acc;
    }, {});

    return Object.entries(dataMap)
      .map(([date, views]) => ({ date, views }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [videos]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Evolución de Vistas
      </h3>
      <div className="w-full">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.1}
            />
            <XAxis
              dataKey="date"
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={(str) =>
                new Date(str).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'short',
                })
              }
            />
            <YAxis stroke="#6B7280" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
              }}
              itemStyle={{ color: '#0ea5e9' }}
            />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#0ea5e9"
              strokeWidth={3}
              dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
