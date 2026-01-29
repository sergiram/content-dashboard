import { create } from 'zustand';
import type { ChannelStats, Video, YouTubeVideo } from '../types';
import { mockVideos } from '../data/videos';
import { persist } from 'zustand/middleware';
import { getChannelData, getChannelVideos } from '../services/youtubeService';

interface AppState {
  // state
  isDarkMode: boolean;
  videos: Video[];
  categoryFilter: string;

  // YouTube
  isYouTubeMode: boolean;
  selectedChannel: ChannelStats | null;
  youtubeVideos: YouTubeVideo[];
  isLoadingChannel: boolean;
  isLoadingVideos: boolean;
  error: string | null;
  isSearchModalOpen: boolean;

  // actions
  toggleDarkMode: () => void;
  addVideo: (video: Video) => void;
  setCategoryFilter: (category: string) => void;

  // YouTube Actions
  setSearchModalOpen: (isOpen: boolean) => void;
  loadChannel: (channelId: string) => Promise<void>;
  switchToMockMode: () => void;
  switchToYouTubeMode: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      isDarkMode: false,
      videos: mockVideos,
      categoryFilter: 'all',

      // Nuevo estado (YOUTUBE)
      isYouTubeMode: false,
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

      addVideo: (newVideo) =>
        set((state) => ({
          videos: [...state.videos, newVideo],
        })),

      setCategoryFilter: (category) => set({ categoryFilter: category }),

      setSearchModalOpen: (isOpen) => set({ isSearchModalOpen: isOpen }),

      loadChannel: async (channelId: string) => {
        set({ isLoadingChannel: true, isLoadingVideos: true, error: null });

        try {
          const channelData = await getChannelData(channelId);
          set({
            selectedChannel: channelData,
            isLoadingChannel: false,
            isYouTubeMode: true,
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

      switchToMockMode: () => {
        set({
          isYouTubeMode: false,
          selectedChannel: null,
          youtubeVideos: [],
          error: null,
        });
      },

      switchToYouTubeMode: () => {
        set({ isYouTubeMode: true });
      },
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
      }),
    },
  ),
);
