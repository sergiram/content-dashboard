import { useMemo, useState } from 'react';
import { SimpleChart } from '../components/charts/SimpleChart';
import { ViewsTimeChart } from '../components/charts/ViewsTimeChart';
import { CategoryPieChart } from '../components/charts/CategoryPieChart';
import { EngagementChart } from '../components/charts/EngagementChart';
import { StatCard } from '../components/ui/StatCard';
import { VideoList } from '../components/ui/VideoList';
import { useAppStore } from '../store/useAppStore';
import { AddVideoModal } from '../components/ui/AddVideoModal';
import { CategoryFilter } from '../components/ui/CategoryFilter';

export const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const videos = useAppStore((state) => state.videos);
  const categoryFilter = useAppStore((state) => state.categoryFilter);

  // Usamos un selector para obtener directamente los videos filtrados
  const filteredVideos = useMemo(() => {
    if (categoryFilter === 'all') return videos;
    return videos.filter((v) => v.category === categoryFilter);
  }, [videos, categoryFilter]);

  // También necesitamos el total de videos para el texto de "Mostrando X de Y"
  const totalVideosCount = useAppStore((state) => state.videos.length);

  const totalViews = filteredVideos.reduce(
    (sum, video) => sum + video.views,
    0,
  );
  const totalLikes = filteredVideos.reduce(
    (sum, video) => sum + video.likes,
    0,
  );
  const totalComments = filteredVideos.reduce(
    (sum, video) => sum + video.comments,
    0,
  );

  return (
    <div className="p-8">
      {/* CABECERA: Título y Acción Global */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Panel de Analíticas
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow-lg shadow-blue-500/30 transition-all font-medium"
        >
          + Añadir vídeo
        </button>
      </div>

      {/* OVERVIEW: Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Views" value={totalViews} icon="👁️" />
        <StatCard title="Total Likes" value={totalLikes} icon="❤️" />
        <StatCard title="Total Comments" value={totalComments} icon="💬" />
      </div>

      {/* GRÁFICOS: Grid 2x2 interactivo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <SimpleChart />
        <ViewsTimeChart />
        <CategoryPieChart />
        <EngagementChart />
      </div>

      {/* LISTADO: Gestión y Filtros */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Vídeos Publicados
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Mostrando {filteredVideos.length} de {totalVideosCount} resultados
            </p>
          </div>
          <CategoryFilter />
        </div>

        <VideoList videos={filteredVideos} />
      </div>

      <AddVideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
