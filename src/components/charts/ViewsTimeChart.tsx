import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useAppStore } from '../../store/useAppStore';
import { useMemo } from 'react';

export const ViewsTimeChart = () => {
  const videos = useAppStore((state) => state.videos);
  const categoryFilter = useAppStore((state) => state.categoryFilter);

  // PASO 2: Transformar para Recharts y ordenar
  // Recharts necesita un array de objetos [{date, views}, ...]
  const chartData = useMemo(() => {
    const filtered =
      categoryFilter === 'all'
        ? videos
        : videos.filter((v) => v.category === categoryFilter);
    const dataMap = filtered.reduce((acc: Record<string, number>, video) => {
      acc[video.uploadDate] = (acc[video.uploadDate] || 0) + video.views;
      return acc;
    }, {});
    return Object.entries(dataMap)
      .map(([date, views]) => ({ date, views }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [videos, categoryFilter]);

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
