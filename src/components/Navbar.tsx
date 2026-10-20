import React from 'react';
import { YuvrajLogo } from './YuvrajLogo';
import { ShieldCheck, HelpCircle } from 'lucide-react';

interface NavbarProps {
  onOpenRestrictions: () => void;
  onOpenFaq: () => void;
  onScrollToDownloader: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRestrictions,
  onOpenFaq,
  onScrollToDownloader,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070b14]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single element brand wordmark with premium Yuvraj logo */}
        <button
          onClick={onScrollToDownloader}
          className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg group"
        >
          <YuvrajLogo size="sm" showText={true} />
        </button>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={onScrollToDownloader}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Downloader
          </button>
          <a
            href="#platforms"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Platforms
          </a>
          <a
            href="#how-it-works"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            How It Works
          </a>
          <button
            onClick={onOpenFaq}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            FAQ
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenRestrictions}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-700/80 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:border-indigo-500/60 hover:bg-slate-800/90 transition-all duration-200 whitespace-nowrap shrink-0 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>Platform Rules</span>
          </button>
        </div>
      </div>
    </header>
  );
};
