import { Search } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const Header = () => {
  const {
    isDarkMode,
    toggleDarkMode,
    isYouTubeMode,
    switchToMockMode,
    setSearchModalOpen,
  } = useAppStore();

  return (
    <header className="bg-white dark:bg-gray-800 p-4 shadow">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Content Analytics
          {isYouTubeMode && (
            <span className="ml-2 text-sm font-normal text-red-600">
              (YouTube Mode)
            </span>
          )}
        </h1>

        <div className="flex items-center gap-4">
          {/* Botón YouTube Search */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <Search className="w-4 h-4" />
            YouTube
          </button>

          {/* Botón volver a Mock (solo si está en YouTube mode) */}
          {isYouTubeMode && (
            <button
              onClick={switchToMockMode}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Mock Data
            </button>
          )}

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
};
