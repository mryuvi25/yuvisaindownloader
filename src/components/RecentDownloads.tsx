import React from 'react';
import { HistoryItem } from '../types';
import { downloadFile } from '../utils/mediaProcessor';
import { Download, Trash2, Film, Camera, PlaySquare, Clock } from 'lucide-react';

interface RecentDownloadsProps {
  history: HistoryItem[];
  onClearHistory: () => void;
  onSelectUrl: (url: string) => void;
}

export const RecentDownloads: React.FC<RecentDownloadsProps> = ({
  history,
  onClearHistory,
  onSelectUrl,
}) => {
  if (history.length === 0) return null;

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram-reels':
        return <Film className="w-3.5 h-3.5 text-pink-400" />;
      case 'instagram-stories':
        return <Camera className="w-3.5 h-3.5 text-amber-400" />;
      case 'youtube-shorts':
        return <PlaySquare className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <Film className="w-3.5 h-3.5 text-indigo-400" />;
    }
  };

  const handleRedownload = (item: HistoryItem) => {
    downloadFile(item.videoPreviewUrl, `YuvrajDownloader_${item.id}.mp4`);
  };

  return (
    <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-sky-400" />
          <h3 className="text-base font-bold text-white">
            Recent Download History
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            ({history.length})
          </span>
        </div>

        <button
          onClick={onClearHistory}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="space-y-2.5">
        {history.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 rounded-xl bg-[#0d1527] border border-slate-800/80 hover:border-slate-700 transition"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-12 h-14 rounded-lg bg-black overflow-hidden shrink-0 border border-slate-800">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {getPlatformIcon(item.platform)}
                  <span className="text-[11px] text-slate-400 capitalize">
                    {item.formatDownloaded}
                  </span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {item.fileSize}
                  </span>
                </div>

                <p className="text-xs font-semibold text-white truncate max-w-sm mt-0.5">
                  {item.title}
                </p>

                <span className="text-[10px] text-slate-400 font-mono">
                  {item.downloadedAt}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 ml-3">
              <button
                onClick={() => onSelectUrl(item.url)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition"
              >
                Inspect
              </button>

              <button
                onClick={() => handleRedownload(item)}
                title="Download again"
                className="p-1.5 rounded-lg text-indigo-400 hover:text-white hover:bg-indigo-600 transition"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
