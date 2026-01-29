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
import { useAppStore } from '../../store/useAppStore';
import { useMemo } from 'react';

export const EngagementChart = () => {
  const videos = useAppStore((state) => state.videos);
  const categoryFilter = useAppStore((state) => state.categoryFilter);

  const chartData = useMemo(() => {
    const filtered =
      categoryFilter === 'all'
        ? videos
        : videos.filter((v) => v.category === categoryFilter);
    return filtered.map((video) => ({
      name: video.title.substring(0, 10) + '...',
      likes: video.likes,
      comments: video.comments,
    }));
  }, [videos, categoryFilter]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Interacción: Likes vs Comentarios
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
              name="Likes"
              fill="#8b5cf6"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="comments"
              name="Comentarios"
              fill="#ec4899"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
