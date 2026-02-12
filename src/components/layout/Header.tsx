import { Search, Languages } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const {
    isDarkMode,
    toggleDarkMode,
    setSearchModalOpen,
    selectedChannel,
    clearChannel,
  } = useAppStore();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
  };

  return (
    <header className="bg-white dark:bg-gray-800 p-4 shadow">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('header.title')}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg cursor-pointer"
          >
            <Search className="w-4 h-4" />
            {selectedChannel
              ? t('header.buttons.change_channel')
              : t('header.buttons.search_channel')}
          </button>

          {selectedChannel && (
            <button
              onClick={clearChannel}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg cursor-pointer"
            >
              {t('common.clear_button')}
            </button>
          )}

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 cursor-pointer"
            title={
              i18n.language === 'es' ? 'Switch to English' : 'Cambiar a Español'
            }
          >
            <Languages className="w-5 h-5" />
            <span className="text-xs font-bold uppercase">
              {i18n.language.split('-')[0]}
            </span>
          </button>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer "
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
};
