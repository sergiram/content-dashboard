import { useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { useAppStore } from './store/useAppStore';
import { ChannelSearchModal } from './components/ui/ChannelSearchModal';

function App() {
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const isSearchModalOpen = useAppStore((state) => state.isSearchModalOpen);
  const setSearchModalOpen = useAppStore((state) => state.setSearchModalOpen);
  const loadChannel = useAppStore((state) => state.loadChannel);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  });

  const handleSelectChannel = async (channelId: string) => {
    await loadChannel(channelId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <Dashboard />

      {/* Modal de búsqueda */}
      <ChannelSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectChannel={handleSelectChannel}
      />
    </div>
  );
}

export default App;
