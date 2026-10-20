import React, { useState } from 'react';
import { MediaMetadata, MediaFormat } from '../types';
import { downloadFile } from '../utils/mediaProcessor';
import {
  Download,
  Film,
  Music,
  Image as ImageIcon,
  CheckCircle2,
  Share2,
  Copy,
  ExternalLink,
  ShieldAlert,
  Loader2,
  Volume2,
  Sparkles,
} from 'lucide-react';

interface MediaResultCardProps {
  media: MediaMetadata;
  onDownloadCompleted: (media: MediaMetadata, format: MediaFormat) => void;
  onReset: () => void;
  onOpenRestrictions: () => void;
}

export const MediaResultCard: React.FC<MediaResultCardProps> = ({
  media,
  onDownloadCompleted,
  onReset,
  onOpenRestrictions,
}) => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'video' | 'audio' | 'image'>('video');

  const handleDownload = async (format: MediaFormat) => {
    setDownloadingId(format.id);
    try {
      await downloadFile(format.downloadUrl, format.directDownloadFilename);
      onDownloadCompleted(media, format);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(media.originalUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${media.title} | Yuvraj Downloader`,
          text: `Download ${media.title} with Yuvraj Downloader`,
          url: media.originalUrl,
        });
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const platformDisplayNames: Record<string, string> = {
    'instagram-reels': 'Instagram Reel',
    'instagram-stories': 'Instagram Story',
    'youtube-shorts': 'YouTube Short',
    unknown: 'Video Media',
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 px-4 sm:px-6 animate-in fade-in-50 duration-300">
      <div className="rounded-2xl bg-[#0d1527] border border-slate-800 shadow-2xl shadow-indigo-950/40 overflow-hidden">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/50">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {platformDisplayNames[media.platform]} Ready to Save
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              title="Share or Copy Link"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
            >
              {copiedLink ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Share</span>
                </>
              )}
            </button>

            <button
              onClick={onReset}
              className="text-xs font-medium text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-800 transition"
            >
              New Link
            </button>
          </div>
        </div>

        {/* Content Body: Split Grid for Video Player Preview + Download Actions */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interactive Video Preview Player */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[280px] aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-xl border border-slate-700/60 group">
              <video
                src={media.videoPreviewUrl}
                poster={media.thumbnailUrl}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />

              {/* Watermark-Free Badge */}
              <div className="pointer-events-none absolute top-3 left-3 flex items-center gap-1 rounded-md bg-black/70 backdrop-blur-md px-2 py-1 text-[11px] font-semibold text-emerald-400 border border-emerald-500/30">
                <Sparkles className="w-3 h-3" />
                <span>No Watermark</span>
              </div>
            </div>

            {/* Quick Link Info */}
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <a
                href={media.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400 inline-flex items-center gap-1 transition"
              >
                <span>View original post</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Column: Metadata Details & Working Download Options */}
          <div className="md:col-span-7 flex flex-col justify-between h-full space-y-5">
            <div>
              {/* Creator Lockup */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {media.author.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white">
                      {media.author.name}
                    </span>
                    {media.author.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    )}
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {media.author.handle}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="mt-3 text-lg font-bold text-slate-100 leading-snug">
                {media.title}
              </h3>

              {/* Unboxed Metadata (Zero-pill discipline) */}
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                <span>Duration: <strong className="text-slate-200">{media.duration}</strong></span>
                <span aria-hidden="true">·</span>
                {media.viewsCount && (
                  <>
                    <span>Views: <strong className="text-slate-200 tabular-nums">{media.viewsCount}</strong></span>
                    <span aria-hidden="true">·</span>
                  </>
                )}
                <span>1080p 60fps</span>
                <span aria-hidden="true">·</span>
                <span>MP4 / MP3</span>
              </div>
            </div>

            {/* Format Selector Tabs */}
            <div>
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-3">
                <button
                  onClick={() => setActiveTab('video')}
                  className={`flex items-center gap-1.5 text-xs font-semibold pb-1 transition ${
                    activeTab === 'video'
                      ? 'text-indigo-400 border-b-2 border-indigo-500'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Video (MP4)</span>
                </button>
                <button
                  onClick={() => setActiveTab('audio')}
                  className={`flex items-center gap-1.5 text-xs font-semibold pb-1 transition ${
                    activeTab === 'audio'
                      ? 'text-indigo-400 border-b-2 border-indigo-500'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Music className="w-3.5 h-3.5" />
                  <span>Audio (MP3)</span>
                </button>
                <button
                  onClick={() => setActiveTab('image')}
                  className={`flex items-center gap-1.5 text-xs font-semibold pb-1 transition ${
                    activeTab === 'image'
                      ? 'text-indigo-400 border-b-2 border-indigo-500'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Cover Photo</span>
                </button>
              </div>

              {/* Download Option List */}
              <div className="space-y-2.5">
                {media.formats
                  .filter((f) => {
                    if (activeTab === 'video') return f.format === 'mp4';
                    if (activeTab === 'audio') return f.format === 'mp3';
                    return f.format === 'jpg';
                  })
                  .map((fmt) => (
                    <div
                      key={fmt.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-950/60 border border-indigo-800/50 flex items-center justify-center text-indigo-400">
                          {fmt.format === 'mp4' ? (
                            <Film className="w-4 h-4" />
                          ) : fmt.format === 'mp3' ? (
                            <Music className="w-4 h-4" />
                          ) : (
                            <ImageIcon className="w-4 h-4" />
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white">
                              {fmt.label}
                            </span>
                            <span className="text-[11px] text-slate-400 uppercase font-mono">
                              .{fmt.format}
                            </span>
                          </div>
                          <span className="text-xs text-slate-400 font-mono tabular-nums">
                            {fmt.fileSize} {fmt.fps ? `· ${fmt.fps}fps` : ''} {fmt.bitrate ? `· ${fmt.bitrate}` : ''}
                          </span>
                        </div>
                      </div>

                      {/* Functional Download Button */}
                      <button
                        onClick={() => handleDownload(fmt)}
                        disabled={downloadingId === fmt.id}
                        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/25 hover:brightness-110 active:scale-95 disabled:opacity-50 transition"
                      >
                        {downloadingId === fmt.id ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            {/* Platform Restriction Explainer Callout */}
            <div className="pt-2">
              <div className="flex items-center justify-between rounded-xl bg-slate-900/60 border border-slate-800/80 p-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    Respect creator copyright. For personal & offline playback only.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onOpenRestrictions}
                  className="text-sky-400 hover:text-sky-300 font-medium shrink-0 ml-2"
                >
                  View Policies →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
