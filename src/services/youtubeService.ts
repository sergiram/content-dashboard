import type {
  ChannelStats,
  YouTubeChannelResponse,
  YouTubeVideo,
  YouTubeSearchResponse,
  YouTubeVideosResponse,
  YouTubeSearchChannelItem,
  YouTubeSearchChannelResponse,
} from '../types';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const searchChannels = async (
  query: string,
): Promise<YouTubeSearchChannelItem[]> => {
  const url = `${BASE_URL}/search?part=snippet&type=channel&q=${encodeURIComponent(
    query,
  )}&maxResults=5&key=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error('channels_search');

  const data: YouTubeSearchChannelResponse = await response.json();
  return data.items || [];
};

export const getChannelData = async (
  channelId: string,
): Promise<ChannelStats> => {
  const url = `${BASE_URL}/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error('channel_data');

  const data: YouTubeChannelResponse = await response.json();
  if (!data.items || data.items.length === 0)
    throw new Error('channel_not_found');

  const channel = data.items[0];
  return {
    id: channel.id,
    title: channel.snippet.title,
    description: channel.snippet.description,
    thumbnail:
      channel.snippet.thumbnails.high?.url ||
      channel.snippet.thumbnails.medium?.url ||
      channel.snippet.thumbnails.default?.url ||
      '',
    subscriberCount: parseInt(channel.statistics.subscriberCount),
    viewCount: parseInt(channel.statistics.viewCount),
    videoCount: parseInt(channel.statistics.videoCount),
  };
};

export const getChannelVideos = async (
  channelId: string,
  maxResults: number = 20,
): Promise<YouTubeVideo[]> => {
  const searchUrl = `${BASE_URL}/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&type=video&key=${API_KEY}`;

  const searchResponse = await fetch(searchUrl);
  if (!searchResponse.ok) throw new Error('videos_fetch');

  const searchData: YouTubeSearchResponse = await searchResponse.json();
  if (!searchData.items || searchData.items.length === 0) return [];

  const videoIds = searchData.items.map((item) => item.id.videoId).join(',');

  const statsUrl = `${BASE_URL}/videos?part=statistics,snippet&id=${videoIds}&key=${API_KEY}`;

  const statsResponse = await fetch(statsUrl);
  if (!statsResponse.ok) throw new Error('stats_fetch');

  const statsData: YouTubeVideosResponse = await statsResponse.json();

  return statsData.items.map((video) => ({
    id: video.id,
    title: video.snippet.title,
    thumbnail:
      video.snippet.thumbnails.high?.url ||
      video.snippet.thumbnails.medium?.url ||
      video.snippet.thumbnails.default?.url ||
      '',
    publishedAt: video.snippet.publishedAt,
    viewCount: parseInt(video.statistics.viewCount || '0'),
    likeCount: parseInt(video.statistics.likeCount || '0'),
    commentCount: parseInt(video.statistics.commentCount || '0'),
  }));
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};
