import { Search } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const Header = () => {
  const {
    isDarkMode,
    toggleDarkMode,
    setSearchModalOpen,
    selectedChannel,
    clearChannel,
  } = useAppStore();

  return (
    <header className="bg-white dark:bg-gray-800 p-4 shadow">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Content Analytics
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Botón para buscar otro canal */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            <Search className="w-4 h-4" />
            {selectedChannel ? 'Cambiar canal' : 'Buscar canal'}
          </button>

          {/* Botón para limpiar canal actual (opcional) */}
          {selectedChannel && (
            <button
              onClick={clearChannel}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
            >
              Limpiar
            </button>
          )}

          {/* Dark mode */}
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
