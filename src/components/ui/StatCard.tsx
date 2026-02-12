import { formatNumber } from '../../services/youtubeService';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: string;
}

export const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {typeof value === 'number' ? formatNumber(value) : value}
          </p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
};
