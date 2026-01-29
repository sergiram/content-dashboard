import { useAppStore } from '../../store/useAppStore';

export const Header = () => {
  const { isDarkMode, toggleDarkMode } = useAppStore();

  return (
    <header className="bg-white dark:bg-gray-800 p-4 shadow">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Content Analytics
        </h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
};
