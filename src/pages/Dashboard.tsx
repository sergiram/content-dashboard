import { useMemo } from 'react';
import { SimpleChart } from '../components/charts/SimpleChart';
import { ViewsTimeChart } from '../components/charts/ViewsTimeChart';
import { EngagementChart } from '../components/charts/EngagementChart';
import { StatCard } from '../components/ui/StatCard';
import { Thumbnail } from '../components/ui/Thumbnail';
import { VideoModal } from '../components/ui/VideoModal';
import { useAppStore } from '../store/useAppStore';
import { transformYouTubeVideosForCharts } from '../utils/dataTransform';
import { Youtube } from 'lucide-react';
import { formatNumber } from '../services/youtubeService';
import { useTranslation } from 'react-i18next';

export const Dashboard = () => {
  const selectedChannel = useAppStore((state) => state.selectedChannel);
  const youtubeVideos = useAppStore((state) => state.youtubeVideos);
  const isLoadingChannel = useAppStore((state) => state.isLoadingChannel);
  const isLoadingVideos = useAppStore((state) => state.isLoadingVideos);
  const error = useAppStore((state) => state.error);
  const setSearchModalOpen = useAppStore((state) => state.setSearchModalOpen);
  const setVideoModalOpen = useAppStore((state) => state.setVideoModalOpen);
  const setSelectedVideo = useAppStore((state) => state.setSelectedVideo);
  const isVideoModalOpen = useAppStore((state) => state.isVideoModalOpen);
  const selectedVideo = useAppStore((state) => state.selectedVideo);

  const { t } = useTranslation();

  const transformedVideos = useMemo(() => {
    return transformYouTubeVideosForCharts(youtubeVideos);
  }, [youtubeVideos]);

  if (!selectedChannel && !isLoadingChannel) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Youtube className="w-24 h-24 mx-auto mb-6 text-gray-400" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('dashboard.hero.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('dashboard.hero.description')}
          </p>
          <button
            onClick={() => setSearchModalOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg cursor-pointer"
          >
            {t('common.search_button')}
          </button>
        </div>
      </div>
    );
  }

  if (isLoadingChannel && !selectedChannel) {
    return (
      <div className="p-8 flex justify-center items-center min-h-screen">
        <div>
          <div className="animate-spin w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            {t('common.loading_channel')}
          </p>
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
            {t('common.retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-8 transition-opacity duration-300 ${isLoadingChannel ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center gap-6">
          <Thumbnail
            key={selectedChannel!.id}
            src={selectedChannel!.thumbnail}
            alt={selectedChannel!.title}
            className="w-24 h-24 rounded-full bg-gray-200"
            loading="eager"
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title={t('dashboard.stats.subscribers')}
          value={formatNumber(selectedChannel!.subscriberCount)}
          icon="👥"
        />
        <StatCard
          title={t('dashboard.stats.total_views')}
          value={formatNumber(selectedChannel!.viewCount)}
          icon="👁️"
        />
        <StatCard
          title={t('dashboard.stats.videos')}
          value={selectedChannel!.videoCount.toString()}
          icon="🎬"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <SimpleChart videos={transformedVideos} />
        <ViewsTimeChart videos={transformedVideos} />
        <EngagementChart videos={transformedVideos} />
      </div>
      {isLoadingVideos ? (
        <div className="text-center py-12">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            {t('common.loading_videos')}
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold dark:text-white mb-4">
            {t('dashboard.recent_videos.title')} ({youtubeVideos.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {youtubeVideos.map((video) => (
              <div
                key={video.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => {
                  setVideoModalOpen(true);
                  setSelectedVideo(video);
                }}
              >
                <Thumbnail
                  key={video.id}
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 bg-gray-200"
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
      {isVideoModalOpen && selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setVideoModalOpen(false)}
        />
      )}
    </div>
  );
};
