import React from 'react';
import { YuvrajLogo } from './YuvrajLogo';
import { ArrowDown, Zap, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onScrollToDownloader: () => void;
  onOpenRestrictions: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToDownloader,
  onOpenRestrictions,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 text-center">
      {/* Background Ambient Purple-Blue Glows */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-[420px] w-[640px] rounded-full bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-sky-500/15 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Prominent Logo & Title Badge */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-2xl bg-slate-900/80 p-2.5 pr-5 border border-slate-800 shadow-xl shadow-indigo-950/20 backdrop-blur-sm">
            <YuvrajLogo size="md" showText={false} />
            <div className="text-left">
              <span className="text-xs font-semibold tracking-wider uppercase text-sky-400">
                Official Media Suite
              </span>
              <p className="text-sm font-bold text-slate-100">
                Yuvraj Downloader Engine v3.0
              </p>
            </div>
          </div>
        </div>

        {/* Hero Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance leading-tight">
          Download HD Reels, Stories & Shorts with{' '}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            Yuvraj Downloader
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
          The fastest and cleanest tool to save Instagram Reels, 24-hour Stories, and YouTube Shorts in pristine 1080p Full HD video or 320kbps MP3 audio without watermarks.
        </p>

        {/* Primary Action Button Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onScrollToDownloader}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:brightness-110 active:scale-[0.98] transition-all whitespace-nowrap"
          >
            <ArrowDown className="w-4 h-4" />
            <span>Paste Video Link Now</span>
          </button>

          <button
            onClick={onOpenRestrictions}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900/90 border border-slate-700/80 px-5 py-3.5 text-sm font-semibold text-slate-300 hover:text-white hover:border-slate-600 hover:bg-slate-800 active:scale-[0.98] transition-all whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Supported Formats & Rules</span>
          </button>
        </div>

        {/* Quiet Editorial Trust Indicators (Anti-slop, clean unboxed metadata) */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-400">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> Instant 1080p 60fps & MP3
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Zero Watermarks</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>No Account Required</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Mobile & Desktop Ready</span>
        </div>
      </div>
    </section>
  );
};
