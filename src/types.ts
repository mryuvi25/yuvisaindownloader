export type PlatformType = 'instagram-reels' | 'instagram-stories' | 'youtube-shorts' | 'unknown';

export interface MediaFormat {
  id: string;
  label: string;
  quality: string;
  format: 'mp4' | 'mp3' | 'jpg';
  fileSize: string;
  fps?: number;
  bitrate?: string;
  downloadUrl: string;
  directDownloadFilename: string;
  isAudioOnly?: boolean;
}

export interface MediaMetadata {
  id: string;
  originalUrl: string;
  platform: PlatformType;
  title: string;
  author: {
    name: string;
    handle: string;
    avatarUrl?: string;
    verified?: boolean;
  };
  duration: string;
  durationSeconds: number;
  thumbnailUrl: string;
  videoPreviewUrl: string;
  viewsCount?: string;
  likesCount?: string;
  uploadedAt?: string;
  formats: MediaFormat[];
  isPrivate?: boolean;
  hasAudioRestriction?: boolean;
  restrictionNotice?: string;
}

export interface HistoryItem {
  id: string;
  url: string;
  title: string;
  platform: PlatformType;
  thumbnailUrl: string;
  downloadedAt: string;
  formatDownloaded: string;
  fileSize: string;
  videoPreviewUrl: string;
}

export interface PlatformRestriction {
  platform: string;
  type: string;
  allowed: boolean;
  title: string;
  description: string;
  workaround?: string;
}
