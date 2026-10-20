import { MediaMetadata, PlatformType, PlatformRestriction } from '../types';

export const SAMPLE_LINKS = [
  {
    platform: 'instagram-reels' as PlatformType,
    label: 'Instagram Reel (Trending)',
    url: 'https://www.instagram.com/reel/C48mK11N9xP/',
    description: 'Cinematic Travel Reel - 1080p 60fps',
  },
  {
    platform: 'youtube-shorts' as PlatformType,
    label: 'YouTube Short (Tech/Viral)',
    url: 'https://www.youtube.com/shorts/qR3rK9ZqB20',
    description: 'High-Energy Tech Showcase Short',
  },
  {
    platform: 'instagram-stories' as PlatformType,
    label: 'Instagram Story (Showcase)',
    url: 'https://www.instagram.com/stories/yuvraj_creatives/3328190284719283741/',
    description: 'Public Story Broadcast (<24h active)',
  },
  {
    platform: 'instagram-reels' as PlatformType,
    label: 'Private Account (Restriction Test)',
    url: 'https://www.instagram.com/reel/private_locked_sample_9812/',
    description: 'Tests permission & restriction alert',
  },
];

export const PLATFORM_RESTRICTIONS_DATA: PlatformRestriction[] = [
  {
    platform: 'Instagram Reels',
    type: 'Private Accounts',
    allowed: false,
    title: 'Private Profiles & Protected Posts',
    description:
      'Reels posted by accounts set to Private cannot be accessed or downloaded by third-party tools due to Instagram’s OAuth privacy sandboxing and end-to-end access tokens.',
    workaround:
      'Ask the creator to share the public reel link, or check if the creator has reposted it on their public YouTube Shorts or TikTok feed.',
  },
  {
    platform: 'Instagram Stories',
    type: '24-Hour Expiration & Highlights',
    allowed: true,
    title: 'Story Expiration & Login Requirements',
    description:
      'Stories are only downloadable while actively live within the 24-hour publication window. Expired stories or Close Friends stories are strictly blocked by Meta API.',
    workaround:
      'Ensure the story is under 24 hours old and posted on a publicly visible Instagram profile without "Close Friends" access walls.',
  },
  {
    platform: 'YouTube Shorts',
    type: 'Age-Restricted & Members Only',
    allowed: false,
    title: 'Content Restrictions & YouTube Bot Guards',
    description:
      'Shorts flagged as 18+ Age Restricted, Paid Channel Members Only, or Private/Unlisted with domain restrictions are protected by YouTube signature decryption tokens.',
    workaround:
      'Public YouTube Shorts with open licensing download instantly with crystal clear 1080p and 320kbps audio.',
  },
  {
    platform: 'Instagram Reels',
    type: 'Licensed Audio Muting',
    allowed: true,
    title: 'Commercial Audio Restrictions',
    description:
      'Certain reels using regional record-label music may be muted when exported due to licensing treaties between Meta and music distributors.',
    workaround:
      'Yuvraj Downloader provides a dedicated "Extract Audio MP3" track option to grab clean sound whenever unmuted streams are available.',
  },
  {
    platform: 'All Platforms',
    type: 'Copyright & Fair Use Guidelines',
    allowed: true,
    title: 'Personal & Offline Use Only',
    description:
      'Downloaded media should only be saved for personal offline archive, reference, or fair use commentary. Re-uploading without creator credit violates copyright terms.',
  },
];

export function detectPlatform(url: string): PlatformType {
  const trimmed = url.trim().toLowerCase();
  if (!trimmed) return 'unknown';

  if (trimmed.includes('instagram.com/reel') || trimmed.includes('instagr.am/reel') || trimmed.includes('instagram.com/p/')) {
    return 'instagram-reels';
  }
  if (trimmed.includes('instagram.com/stories') || trimmed.includes('instagr.am/stories')) {
    return 'instagram-stories';
  }
  if (trimmed.includes('youtube.com/shorts') || trimmed.includes('youtu.be/') || trimmed.includes('youtube.com/watch')) {
    return 'youtube-shorts';
  }
  return 'unknown';
}

export function validateUrl(url: string): { isValid: boolean; message: string; platform: PlatformType } {
  const trimmed = url.trim();
  if (!trimmed) {
    return { isValid: false, message: 'Please enter or paste a video link.', platform: 'unknown' };
  }

  try {
    const parsed = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
    const host = parsed.hostname.toLowerCase();
    
    if (host.includes('instagram.com') || host.includes('instagr.am')) {
      if (parsed.pathname.includes('/stories/')) {
        return { isValid: true, message: 'Valid Instagram Story link detected', platform: 'instagram-stories' };
      }
      if (parsed.pathname.includes('/reel/') || parsed.pathname.includes('/reels/') || parsed.pathname.includes('/p/')) {
        return { isValid: true, message: 'Valid Instagram Reel link detected', platform: 'instagram-reels' };
      }
      return { isValid: false, message: 'Please provide a direct Instagram Reel or Story URL (e.g. instagram.com/reel/...)', platform: 'unknown' };
    }

    if (host.includes('youtube.com') || host.includes('youtu.be')) {
      if (parsed.pathname.includes('/shorts/') || host.includes('youtu.be') || parsed.pathname.includes('/watch')) {
        return { isValid: true, message: 'Valid YouTube Shorts link detected', platform: 'youtube-shorts' };
      }
      return { isValid: false, message: 'Please provide a valid YouTube Shorts URL (e.g. youtube.com/shorts/...)', platform: 'unknown' };
    }

    return {
      isValid: false,
      message: 'Supported platforms are Instagram Reels, Instagram Stories, and YouTube Shorts.',
      platform: 'unknown',
    };
  } catch {
    return { isValid: false, message: 'Invalid URL format. Please include http:// or a valid web address.', platform: 'unknown' };
  }
}

export async function processVideoLink(url: string): Promise<MediaMetadata> {
  const validation = validateUrl(url);
  if (!validation.isValid) {
    throw new Error(validation.message);
  }

  // Simulate network processing with realistic latency
  await new Promise((resolve) => setTimeout(resolve, 850));

  const trimmed = url.trim().toLowerCase();

  // Handle explicit private/restricted test scenarios
  if (trimmed.includes('private') || trimmed.includes('locked')) {
    const error = new Error('Platform Restriction: This Instagram profile is private. Third-party tools cannot access media behind private account authorization walls.');
    (error as any).restrictionCode = 'PRIVATE_ACCOUNT';
    throw error;
  }

  if (trimmed.includes('expired')) {
    const error = new Error('Platform Restriction: This Instagram Story has expired. Stories are only available for 24 hours after publishing.');
    (error as any).restrictionCode = 'STORY_EXPIRED';
    throw error;
  }

  const platform = validation.platform;

  if (platform === 'instagram-reels') {
    return {
      id: 'ig-reel-' + Math.random().toString(36).substring(2, 9),
      originalUrl: url,
      platform: 'instagram-reels',
      title: 'Cinematic Mountain Ascent & Golden Sunset Drone Shot',
      author: {
        name: 'Horizon Expeditions',
        handle: '@horizon_explores',
        verified: true,
      },
      duration: '0:34',
      durationSeconds: 34,
      thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=720&q=80',
      videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      viewsCount: '1.4M',
      likesCount: '128.5K',
      uploadedAt: 'Yesterday at 18:42',
      formats: [
        {
          id: 'mp4-1080p',
          label: 'Full HD 1080p',
          quality: '1080p',
          format: 'mp4',
          fileSize: '24.8 MB',
          fps: 60,
          bitrate: '8.4 Mbps',
          downloadUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          directDownloadFilename: 'YuvrajDownloader_IG_Reel_1080p.mp4',
        },
        {
          id: 'mp4-720p',
          label: 'Standard HD 720p',
          quality: '720p',
          format: 'mp4',
          fileSize: '12.3 MB',
          fps: 30,
          bitrate: '4.2 Mbps',
          downloadUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          directDownloadFilename: 'YuvrajDownloader_IG_Reel_720p.mp4',
        },
        {
          id: 'mp3-320',
          label: 'Crystal Audio Only',
          quality: '320kbps',
          format: 'mp3',
          fileSize: '1.8 MB',
          bitrate: '320 kbps',
          downloadUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          directDownloadFilename: 'YuvrajDownloader_Reel_Audio_320k.mp3',
          isAudioOnly: true,
        },
        {
          id: 'thumb-hd',
          label: 'High-Res Poster Frame',
          quality: 'Original JPEG',
          format: 'jpg',
          fileSize: '840 KB',
          downloadUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1280&q=90',
          directDownloadFilename: 'YuvrajDownloader_Reel_Cover.jpg',
        },
      ],
    };
  }

  if (platform === 'instagram-stories') {
    return {
      id: 'ig-story-' + Math.random().toString(36).substring(2, 9),
      originalUrl: url,
      platform: 'instagram-stories',
      title: 'Studio BTS & Acoustic Music Session Highlights',
      author: {
        name: 'Yuvraj Studio Productions',
        handle: '@yuvraj_creatives',
        verified: true,
      },
      duration: '0:15',
      durationSeconds: 15,
      thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=720&q=80',
      videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      viewsCount: 'Public Live',
      likesCount: 'Active <24h',
      uploadedAt: 'Active (Expires in 7h 14m)',
      formats: [
        {
          id: 'mp4-1080p',
          label: 'Story HD 1080p',
          quality: '1080p',
          format: 'mp4',
          fileSize: '11.2 MB',
          fps: 60,
          bitrate: '7.5 Mbps',
          downloadUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          directDownloadFilename: 'YuvrajDownloader_Story_1080p.mp4',
        },
        {
          id: 'mp3-320',
          label: 'Story Soundtrack Audio',
          quality: '320kbps',
          format: 'mp3',
          fileSize: '950 KB',
          downloadUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          directDownloadFilename: 'YuvrajDownloader_Story_Soundtrack.mp3',
          isAudioOnly: true,
        },
        {
          id: 'thumb-hd',
          label: 'Story Cover Snapshot',
          quality: 'Original JPEG',
          format: 'jpg',
          fileSize: '620 KB',
          downloadUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1280&q=90',
          directDownloadFilename: 'YuvrajDownloader_Story_Snapshot.jpg',
        },
      ],
    };
  }

  // Default: YouTube Shorts
  return {
    id: 'yt-short-' + Math.random().toString(36).substring(2, 9),
    originalUrl: url,
    platform: 'youtube-shorts',
    title: 'Mind-Blowing Camera Tricks You Can Do in 30 Seconds',
    author: {
      name: 'Tech Horizon Daily',
      handle: '@TechHorizonShorts',
      verified: true,
    },
    duration: '0:42',
    durationSeconds: 42,
    thumbnailUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=720&q=80',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    viewsCount: '2.8M',
    likesCount: '245K',
    uploadedAt: '3 days ago',
    formats: [
      {
        id: 'mp4-1080p',
        label: 'Shorts 1080p 60fps',
        quality: '1080p Ultra',
        format: 'mp4',
        fileSize: '31.4 MB',
        fps: 60,
        bitrate: '9.2 Mbps',
        downloadUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        directDownloadFilename: 'YuvrajDownloader_Shorts_1080p.mp4',
      },
      {
        id: 'mp4-720p',
        label: 'Shorts 720p HD',
        quality: '720p HD',
        format: 'mp4',
        fileSize: '15.8 MB',
        fps: 30,
        bitrate: '4.8 Mbps',
        downloadUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        directDownloadFilename: 'YuvrajDownloader_Shorts_720p.mp4',
      },
      {
        id: 'mp3-320',
        label: 'Shorts Voiceover & Audio',
        quality: '320kbps MP3',
        format: 'mp3',
        fileSize: '2.1 MB',
        downloadUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        directDownloadFilename: 'YuvrajDownloader_Shorts_Audio.mp3',
        isAudioOnly: true,
      },
      {
        id: 'thumb-hd',
        label: 'HQ Shorts Thumbnail',
        quality: 'MaxRes JPEG',
        format: 'jpg',
        fileSize: '740 KB',
        downloadUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1280&q=90',
        directDownloadFilename: 'YuvrajDownloader_Shorts_Thumb.jpg',
      },
    ],
  };
}

/**
 * Triggers a real browser file download with progress feedback
 */
export async function downloadFile(url: string, filename: string): Promise<boolean> {
  try {
    // Attempt blob fetch to guarantee direct browser save without navigating away
    const response = await fetch(url, { mode: 'cors' });
    if (!response.ok) throw new Error('Fetch failed');
    const blob = await response.blob();
    const objectUrl = window.URL.createObjectURL(blob);
    
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(objectUrl);
    return true;
  } catch {
    // Fallback if CORS prevents blob conversion: open direct link in download mode
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    return true;
  }
}
