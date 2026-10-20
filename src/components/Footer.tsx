import React from 'react';
import { YuvrajLogo } from './YuvrajLogo';
import { Shield, Heart } from 'lucide-react';

interface FooterProps {
  onOpenRestrictions: () => void;
  onScrollToDownloader: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenRestrictions,
  onScrollToDownloader,
}) => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-[#060a12] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-slate-800/60">
          {/* Prominent Yuvraj Downloader Branding */}
          <div className="flex flex-col items-start gap-2">
            <button
              onClick={onScrollToDownloader}
              className="text-left focus:outline-none"
            >
              <YuvrajLogo
                size="md"
                showText={true}
                subtitle="High-Definition Social Video Downloader"
              />
            </button>
            <p className="max-w-md text-xs text-slate-400 mt-2 leading-relaxed">
              Fast, high-fidelity media downloader for Instagram Reels, 24-hour Stories, and YouTube Shorts. Built for personal offline backup, creators, and editors.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-300">
            <button
              onClick={onScrollToDownloader}
              className="hover:text-white transition"
            >
              Video Downloader
            </button>
            <a href="#platforms" className="hover:text-white transition">
              Platforms Matrix
            </a>
            <a href="#how-it-works" className="hover:text-white transition">
              How It Works
            </a>
            <button
              onClick={onOpenRestrictions}
              className="hover:text-white transition text-sky-400"
            >
              Platform Restrictions & Policies
            </button>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()}{' '}
            <strong className="text-slate-300">Yuvraj Downloader</strong>. All rights reserved.
            Not affiliated with Meta, Instagram, or YouTube.
          </p>

          <div className="flex items-center gap-1.5 text-slate-400">
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            <span>Fair use & personal offline playback only</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
