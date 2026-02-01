import { describe, it, expect } from 'vitest';
import { transformYouTubeVideosForCharts } from '../dataTransform';
import type { YouTubeVideo } from '../../types';

describe('transformYouTubeVideosForCharts', () => {
  it('should transform YouTube video objects to chart-compatible objects', () => {
    const mockVideos: YouTubeVideo[] = [
      {
        id: '1',
        title: 'Video 1',
        thumbnail: 'thumb1.jpg',
        viewCount: 100,
        likeCount: 50,
        commentCount: 10,
        publishedAt: '2023-01-01',
      },
    ];

    const result = transformYouTubeVideosForCharts(mockVideos);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      id: '1',
      title: 'Video 1',
      thumbnail: 'thumb1.jpg',
      views: 100,
      likes: 50,
      comments: 10,
      uploadDate: '2023-01-01',
    });
  });

  it('should handle empty array', () => {
    expect(transformYouTubeVideosForCharts([])).toEqual([]);
  });
});
