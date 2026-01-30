export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  likes: number;
  comments: number;
  uploadDate: string;
}

export interface ChannelStats {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  tags?: string[];
}

export interface ChannelStats {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

export interface YouTubeSearchItem {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    publishedAt: string;
  };
}

export interface YouTubeVideoItem {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    publishedAt: string;
  };
  statistics: {
    viewCount: string;
    likeCount?: string;
    commentCount?: string;
  };
}

export interface YouTubeSearchResponse {
  items: YouTubeSearchItem[];
}

export interface YouTubeVideosResponse {
  items: YouTubeVideoItem[];
}

export interface YouTubeChannelItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
  statistics: {
    subscriberCount: string;
    viewCount: string;
    videoCount: string;
  };
}

export interface YouTubeChannelResponse {
  items: YouTubeChannelItem[];
}

export interface YouTubeSearchChannelItem {
  id: {
    channelId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
}

export interface YouTubeSearchChannelResponse {
  items: YouTubeSearchChannelItem[];
}
