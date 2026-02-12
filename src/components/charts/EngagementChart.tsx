import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useMemo } from 'react';
import type { Video } from '../../types';
import { useTranslation } from 'react-i18next';

interface EngagementChartProps {
  videos: Video[];
}

export const EngagementChart = ({ videos }: EngagementChartProps) => {
  const { t } = useTranslation();
  const chartData = useMemo(() => {
    return videos.map((video) => ({
      name: video.title.substring(0, 10) + '...',
      likes: video.likes,
      comments: video.comments,
    }));
  }, [videos]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        {t('charts.engagement.title')}
      </h3>
      <div className="w-full">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.1}
            />
            <XAxis dataKey="name" fontSize={12} stroke="#6B7280" />
            <YAxis fontSize={12} stroke="#6B7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Legend />
            {/* Usamos dos barras para comparar los dos valores en el mismo video */}
            <Bar
              dataKey="likes"
              name={t('charts.engagement.likes')}
              fill="#8b5cf6"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="comments"
              name={t('charts.engagement.comments')}
              fill="#ec4899"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
