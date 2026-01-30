import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useMemo } from 'react';
import type { Video } from '../../types';

interface ChartProps {
  videos: Video[];
}

export const SimpleChart = ({ videos }: ChartProps) => {
  // Usamos un selector para obtener directamente los videos filtrados

  const chartData = useMemo(() => {
    return videos.map((video) => ({
      name: video.title.substring(0, 15) + '...',
      views: video.views,
    }));
  }, [videos]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Views por vídeo
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip />
          <Bar dataKey="views" fill="#0ea5e9" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
