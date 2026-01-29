import type { Video } from '../types';

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Tutorial de React para principiantes',
    views: 125000,
    likes: 8500,
    comments: 450,
    uploadDate: '2024-01-15',
    category: 'Tutorial',
  },
  {
    id: '2',
    title: 'Hooks avanzados en React',
    views: 89000,
    likes: 6200,
    comments: 380,
    uploadDate: '2024-01-20',
    category: 'Tutorial',
  },
  {
    id: '3',
    title: 'Gameplay Arc raiders',
    views: 156000,
    likes: 12000,
    comments: 680,
    uploadDate: '2024-01-22',
    category: 'Gameplay',
  },
];
