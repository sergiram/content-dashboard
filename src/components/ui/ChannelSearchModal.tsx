import { useEffect, useState } from 'react';
import { Search, X, Youtube } from 'lucide-react';
import { searchChannels } from '../../services/youtubeService';
import { Thumbnail } from './Thumbnail';

interface Channel {
  id: {
    channelId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
      };
      medium?: {
        url: string;
      };
      high?: {
        url: string;
      };
    };
  };
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectChannel: (channelId: string) => void;
}
export const ChannelSearchModal = ({
  isOpen,
  onClose,
  onSelectChannel,
}: Props) => {
  const [query, setQuery] = useState('');
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // debounce
  useEffect(() => {
    if (query.length < 2) {
      setChannels([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      setError('');

      try {
        const results = await searchChannels(query);
        setChannels(results);
      } catch (err) {
        setError('Error al buscar canales');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal Container (handles backdrop clicks) */}
      <div
        className="fixed inset-0 z-50 flex items-start justify-center pt-20"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar canal de YouTube..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="max-h-96 overflow-y-auto">
            {error && (
              <div className="p-4 text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            {isLoading && (
              <div className="p-8 text-center text-gray-500">
                <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-2" />
                Buscando canales...
              </div>
            )}

            {query.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <Youtube className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="font-medium mb-1">Busca un canal de YouTube</p>
                <p className="text-sm">
                  Escribe el nombre para ver estadísticas reales
                </p>
              </div>
            )}

            {!isLoading &&
              query.length > 0 &&
              channels.length === 0 &&
              !error && (
                <div className="p-8 text-center text-gray-500">
                  No se encontraron canales
                </div>
              )}

            {!isLoading && channels.length > 0 && (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {channels.map((channel) => (
                  <button
                    key={channel.id.channelId}
                    onClick={() => {
                      onSelectChannel(channel.id.channelId);
                      onClose();
                      setQuery('');
                    }}
                    className="w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left flex items-start gap-4"
                  >
                    <Thumbnail
                      key={channel.id.channelId}
                      src={
                        channel.snippet.thumbnails.high?.url ||
                        channel.snippet.thumbnails.medium?.url ||
                        channel.snippet.thumbnails.default.url
                      }
                      alt={channel.snippet.title}
                      className="w-16 h-16 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                          {channel.snippet.title}
                        </h3>
                        <Youtube className="w-4 h-4 text-red-600 flex-shrink-0" />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-500 line-clamp-2">
                        {channel.snippet.description.substring(0, 100)}...
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 text-center">
              Presiona{' '}
              <kbd className="px-2 py-1 bg-white dark:bg-gray-800 rounded border">
                ESC
              </kbd>{' '}
              para cerrar
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
