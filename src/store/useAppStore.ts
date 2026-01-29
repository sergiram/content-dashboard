import { create } from 'zustand';
import type { Video } from '../types';
import { mockVideos } from '../data/videos';

interface AppState {
  // state
  isDarkMode: boolean;
  videos: Video[];
  categoryFilter: string;

  // actions
  toggleDarkMode: () => void;
  addVideo: (video: Video) => void;
  setCategoryFilter: (category: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  isDarkMode: false,
  videos: mockVideos,
  categoryFilter: 'all',

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
}));
