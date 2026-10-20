import React, { useState, useEffect } from 'react';
import { PlatformType } from '../types';
import { SAMPLE_LINKS, detectPlatform } from '../utils/mediaProcessor';
import {
  Link as LinkIcon,
  Clipboard,
  X,
  Search,
  Loader2,
  Film,
  Camera,
  PlaySquare,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface DownloaderInputProps {
  onProcessUrl: (url: string) => Promise<void>;
  isLoading: boolean;
  errorMessage: string | null;
  onOpenRestrictions: () => void;
}

export const DownloaderInput: React.FC<DownloaderInputProps> = ({
  onProcessUrl,
  isLoading,
  errorMessage,
  onOpenRestrictions,
}) => {
  const [url, setUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | PlatformType>('all');
  const [pasteStatus, setPasteStatus] = useState<string | null>(null);

  // Auto-detect platform icon / type as user types or pastes
  const detected = detectPlatform(url);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim() && !isLoading) {
      onProcessUrl(url.trim());
    }
  };

  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrl(text.trim());
          setPasteStatus('Pasted from clipboard!');
          setTimeout(() => setPasteStatus(null), 2000);
        } else {
          setPasteStatus('Clipboard is empty');
          setTimeout(() => setPasteStatus(null), 2000);
        }
      } else {
        setPasteStatus('Clipboard access denied');
        setTimeout(() => setPasteStatus(null), 2000);
      }
    } catch {
      setPasteStatus('Please press Ctrl+V to paste');
      setTimeout(() => setPasteStatus(null), 2500);
    }
  };

  const handleClear = () => {
    setUrl('');
  };

  const handleSelectSample = (sampleUrl: string) => {
    setUrl(sampleUrl);
    onProcessUrl(sampleUrl);
  };

  const platformTabs = [
    { id: 'all', label: 'Auto Detect', icon: Sparkles },
    { id: 'instagram-reels', label: 'Instagram Reels', icon: Film },
    { id: 'instagram-stories', label: 'Instagram Stories', icon: Camera },
    { id: 'youtube-shorts', label: 'YouTube Shorts', icon: PlaySquare },
  ] as const;

  return (
    <div id="downloader-box" className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      {/* Outer Card with dark navy surface and purple-blue hairline border */}
      <div className="relative rounded-2xl bg-[#0d1527] border border-slate-800/90 p-5 sm:p-7 shadow-2xl shadow-indigo-950/30 backdrop-blur-xl">
        {/* Platform Selection Tabs (Segmented Control) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-5 border-b border-slate-800/80 scrollbar-none">
          {platformTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/70'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Link Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative flex flex-col sm:flex-row items-stretch gap-2.5">
            {/* Input Field Container */}
            <div className="relative flex-1 flex items-center">
              <div className="pointer-events-none absolute left-4 flex items-center text-slate-400">
                <LinkIcon className="w-5 h-5" />
              </div>

              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={
                  activeTab === 'instagram-reels'
                    ? 'Paste Instagram Reel link (e.g. instagram.com/reel/...)'
                    : activeTab === 'instagram-stories'
                    ? 'Paste Instagram Story link (e.g. instagram.com/stories/...)'
                    : activeTab === 'youtube-shorts'
                    ? 'Paste YouTube Shorts link (e.g. youtube.com/shorts/...)'
                    : 'Paste Instagram Reel, Story, or YouTube Shorts link...'
                }
                className="w-full rounded-xl bg-slate-900/90 border border-slate-700/80 pl-12 pr-24 py-3.5 text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                disabled={isLoading}
              />

              {/* Action buttons inside the input box */}
              <div className="absolute right-3 flex items-center gap-1.5">
                {url ? (
                  <button
                    type="button"
                    onClick={handleClear}
                    title="Clear input"
                    className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePaste}
                    title="Paste from clipboard"
                    className="inline-flex items-center gap-1 rounded-lg bg-slate-800/90 border border-slate-700/70 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition"
                  >
                    <Clipboard className="w-3.5 h-3.5 text-sky-400" />
                    <span className="hidden sm:inline">Paste</span>
                  </button>
                )}
              </div>
            </div>

            {/* Submit / Fetch Button */}
            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap min-h-[48px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing Link...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Fetch Video</span>
                </>
              )}
            </button>
          </div>

          {/* Paste Status Toast */}
          {pasteStatus && (
            <p className="text-xs text-sky-400 font-medium pl-1 animate-pulse">
              {pasteStatus}
            </p>
          )}

          {/* Error & Platform Restrictions Explanation Banner */}
          {errorMessage && (
            <div className="rounded-xl bg-rose-950/40 border border-rose-800/60 p-4 text-left">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-semibold text-rose-200">
                    Unable to fetch media
                  </p>
                  <p className="text-xs text-rose-300/90 leading-relaxed">
                    {errorMessage}
                  </p>
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={onOpenRestrictions}
                      className="text-xs font-semibold text-sky-400 hover:text-sky-300 underline underline-offset-2"
                    >
                      View Platform Restrictions Guide →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Interactive Sample Links for instant testing */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <span className="text-xs font-semibold text-slate-400 tracking-wide">
              Quick Test Links (Click to test instantly):
            </span>
            <button
              onClick={onOpenRestrictions}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition text-left sm:text-right"
            >
              Why are some videos blocked?
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {SAMPLE_LINKS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(sample.url)}
                className="group flex flex-col items-start p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/60 transition text-left"
              >
                <div className="flex items-center gap-1.5 w-full justify-between">
                  <span className="text-xs font-medium text-slate-200 group-hover:text-white truncate">
                    {sample.label}
                  </span>
                  <span className="text-[10px] text-sky-400 font-mono">Test</span>
                </div>
                <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                  {sample.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
