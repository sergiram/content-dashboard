import { formatNumber } from '../../services/youtubeService';
import type { YouTubeVideo } from '../../types';
import { useTranslation } from 'react-i18next';

interface VideoModalProps {
  video: YouTubeVideo;
  onClose: () => void;
}

export const VideoModal = ({ video, onClose }: VideoModalProps) => {
  const { t } = useTranslation();

  const handleBackDropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackDropClick}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {video.title}
          </h2>
          {/* Contenedor de estadísticas con línea superior completa */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-gray-100 dark:border-gray-700 pt-6 mt-6 gap-6">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p className="font-medium">{t('video_modal.published_at')}</p>
              <p className="text-gray-900 dark:text-white">
                {video.publishedAt.slice(0, 10)}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 w-full md:w-auto">
              <div className="text-center">
                <span className="text-2xl mb-1 block">👁️</span>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                  {t('video_modal.stats.views')}
                </p>
                <p className="font-bold text-lg dark:text-white">
                  {formatNumber(video.viewCount)}
                </p>
              </div>
              <div className="text-center">
                <span className="text-2xl mb-1 block">❤️</span>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                  {t('video_modal.stats.likes')}
                </p>
                <p className="font-bold text-lg dark:text-white">
                  {formatNumber(video.likeCount)}
                </p>
              </div>
              <div className="text-center">
                <span className="text-2xl mb-1 block">💬</span>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                  {t('video_modal.stats.comments')}
                </p>
                <p className="font-bold text-lg dark:text-white">
                  {formatNumber(video.commentCount)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
