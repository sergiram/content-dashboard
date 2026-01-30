import type { Video, YouTubeVideo } from '../types';

export function transformYouTubeVideosForCharts(
  videos: YouTubeVideo[],
): Video[] {
  return videos.map((video) => ({
    id: video.id,
    title: video.title,
    thumbnail: video.thumbnail,
    views: video.viewCount,
    likes: video.likeCount,
    comments: video.commentCount,
    uploadDate: video.publishedAt,
  }));
}
