import { create } from 'zustand';
import type { ChannelStats, YouTubeVideo } from '../types';
import { persist } from 'zustand/middleware';
import { getChannelData, getChannelVideos } from '../services/youtubeService';

interface AppState {
  // state
  isDarkMode: boolean;
  isSearchModalOpen: boolean;

  // YouTube Data
  selectedChannel: ChannelStats | null;
  youtubeVideos: YouTubeVideo[];

  // Loading y errores
  isLoadingChannel: boolean;
  isLoadingVideos: boolean;
  error: string | null;

  // actions
  toggleDarkMode: () => void;
  setSearchModalOpen: (isOpen: boolean) => void;
  loadChannel: (channelId: string) => Promise<void>;
  clearChannel: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      isDarkMode: false,

      // Nuevo estado (YOUTUBE)
      selectedChannel: null,
      youtubeVideos: [],
      isLoadingChannel: false,
      isLoadingVideos: false,
      error: null,
      isSearchModalOpen: false,

      // Actions
      toggleDarkMode: () =>
        set((state) => {
          const newDarkMode = !state.isDarkMode;

          if (newDarkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }

          return { isDarkMode: newDarkMode };
        }),

      setSearchModalOpen: (isOpen) => set({ isSearchModalOpen: isOpen }),

      loadChannel: async (channelId: string) => {
        set({ isLoadingChannel: true, isLoadingVideos: true, error: null });

        try {
          const channelData = await getChannelData(channelId);
          set({
            selectedChannel: channelData,
            isLoadingChannel: false,
          });
          const videosData = await getChannelVideos(channelId, 20);
          set({ youtubeVideos: videosData, isLoadingVideos: false });
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : 'Error desconocido';
          set({
            error: errorMessage,
            isLoadingChannel: false,
            isLoadingVideos: false,
          });
        }
      },
      clearChannel: () =>
        set({
          selectedChannel: null,
          youtubeVideos: [],
          error: null,
        }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
      }),
    },
  ),
);
