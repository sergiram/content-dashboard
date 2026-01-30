import { useMemo } from 'react';
import { SimpleChart } from '../components/charts/SimpleChart';
import { ViewsTimeChart } from '../components/charts/ViewsTimeChart';
import { EngagementChart } from '../components/charts/EngagementChart';
import { StatCard } from '../components/ui/StatCard';
import { useAppStore } from '../store/useAppStore';
import { transformYouTubeVideosForCharts } from '../utils/dataTransform';
import { Youtube } from 'lucide-react';
import { formatNumber } from '../services/youtubeService';

export const Dashboard = () => {
  const selectedChannel = useAppStore((state) => state.selectedChannel);
  const youtubeVideos = useAppStore((state) => state.youtubeVideos);
  const isLoadingChannel = useAppStore((state) => state.isLoadingChannel);
  const isLoadingVideos = useAppStore((state) => state.isLoadingVideos);
  const error = useAppStore((state) => state.error);
  const setSearchModalOpen = useAppStore((state) => state.setSearchModalOpen);

  const transformedVideos = useMemo(() => {
    return transformYouTubeVideosForCharts(youtubeVideos);
  }, [youtubeVideos]);

  if (!selectedChannel && !isLoadingChannel) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Youtube className="w-24 h-24 mx-auto mb-6 text-gray-400" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Busca un canal de YouTube
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Comienza buscando cualquier canal de YouTube para ver sus
            estadísticas
          </p>
          <button
            onClick={() => setSearchModalOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg"
          >
            Buscar canal de YouTube
          </button>
        </div>
      </div>
    );
  }

  if (isLoadingChannel) {
    return (
      <div className="p-8 flex justify-center items-center min-h-screen">
        <div>
          <div className="animate-spin w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Cargando canal...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
          <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
          <button
            onClick={() => useAppStore.getState().clearChannel()}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center gap-6">
          <img
            src={selectedChannel!.thumbnail}
            alt={selectedChannel!.title}
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {selectedChannel!.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {selectedChannel!.description.substring(0, 150)}...
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Suscriptores"
          value={formatNumber(selectedChannel!.subscriberCount)}
          icon="👥"
        />
        <StatCard
          title="Vistas totales"
          value={formatNumber(selectedChannel!.viewCount)}
          icon="👁️"
        />
        <StatCard
          title="Vídeos"
          value={selectedChannel!.videoCount}
          icon="🎬"
        />
      </div>
      {/* Graphics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <SimpleChart videos={transformedVideos} />
        <ViewsTimeChart videos={transformedVideos} />
        <EngagementChart videos={transformedVideos} />
      </div>
      {/* Recent videos */}
      {isLoadingVideos ? (
        <div className="text-center py-12">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Cargando vídeos...</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold dark:text-white mb-4">
            Vídeos recientes ({youtubeVideos.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {youtubeVideos.map((video) => (
              <div
                key={video.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-2">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                    <span>👁️ {formatNumber(video.viewCount)}</span>
                    <span>❤️ {formatNumber(video.likeCount)}</span>
                    <span>💬 {formatNumber(video.commentCount)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
