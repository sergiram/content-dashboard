import { create } from 'zustand';
import type { ChannelStats, YouTubeVideo } from '../types';
import { persist } from 'zustand/middleware';
import { getChannelData, getChannelVideos } from '../services/youtubeService';
import i18n from '../i18n/config';

interface AppState {
  // state
  isDarkMode: boolean;
  isSearchModalOpen: boolean;
  isVideoModalOpen: boolean;

  // YouTube Data
  selectedChannel: ChannelStats | null;
  youtubeVideos: YouTubeVideo[];
  selectedVideo: YouTubeVideo | null;

  // Loading y errores
  isLoadingChannel: boolean;
  isLoadingVideos: boolean;
  error: string | null;

  // actions
  toggleDarkMode: () => void;
  setSearchModalOpen: (isOpen: boolean) => void;
  loadChannel: (channelId: string) => Promise<void>;
  clearChannel: () => void;
  setSelectedVideo: (video: YouTubeVideo | null) => void;
  setVideoModalOpen: (isOpen: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isDarkMode: false,

      selectedChannel: null,
      youtubeVideos: [],
      isLoadingChannel: false,
      isLoadingVideos: false,
      error: null,
      isSearchModalOpen: false,
      isVideoModalOpen: false,
      selectedVideo: null,

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
        set({
          isLoadingChannel: true,
          isLoadingVideos: true,
          error: null,
        });

        try {
          const channelData = await getChannelData(channelId);
          set({
            selectedChannel: channelData,
            isLoadingChannel: false,
          });
          const videosData = await getChannelVideos(channelId, 20);
          set({ youtubeVideos: videosData, isLoadingVideos: false });
        } catch (err) {
          const errorKey = err instanceof Error ? err.message : 'unknown';
          const errorMessage = i18n.t(`common.errors.${errorKey}`, {
            defaultValue: i18n.t('common.errors.unknown'),
          });
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
      setSelectedVideo: (video) => set({ selectedVideo: video }),
      setVideoModalOpen: (isOpen) => set({ isVideoModalOpen: isOpen }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
      }),
    },
  ),
);
