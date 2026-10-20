/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DownloaderInput } from './components/DownloaderInput';
import { MediaResultCard } from './components/MediaResultCard';
import { CompatibilityMatrix } from './components/CompatibilityMatrix';
import { HowItWorks } from './components/HowItWorks';
import { RecentDownloads } from './components/RecentDownloads';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { PlatformRestrictionsModal } from './components/PlatformRestrictionsModal';
import { MediaMetadata, MediaFormat, HistoryItem } from './types';
import { processVideoLink } from './utils/mediaProcessor';

const STORAGE_KEY = 'yuvraj_downloader_history_v1';

export default function App() {
  const [currentMedia, setCurrentMedia] = useState<MediaMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isRestrictionsModalOpen, setIsRestrictionsModalOpen] = useState(false);

  // Load history from localStorage on initial render
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleProcessUrl = async (url: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const result = await processVideoLink(url);
      setCurrentMedia(result);

      // Smooth scroll to result
      setTimeout(() => {
        const resultElem = document.getElementById('media-result');
        if (resultElem) {
          resultElem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    } catch (err: any) {
      setCurrentMedia(null);
      setErrorMessage(
        err.message || 'An error occurred while fetching the video. Please check the URL and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadCompleted = (media: MediaMetadata, format: MediaFormat) => {
    const newItem: HistoryItem = {
      id: `${media.id}-${format.id}-${Date.now()}`,
      url: media.originalUrl,
      title: media.title,
      platform: media.platform,
      thumbnailUrl: media.thumbnailUrl,
      downloadedAt: 'Just now',
      formatDownloaded: format.label,
      fileSize: format.fileSize,
      videoPreviewUrl: media.videoPreviewUrl,
    };

    setHistory((prev) => {
      const updated = [newItem, ...prev.filter((i) => i.url !== media.originalUrl)].slice(0, 8);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const handleScrollToDownloader = () => {
    const el = document.getElementById('downloader-box');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleOpenFaq = () => {
    const el = document.getElementById('faq');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070b14] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* 3-zone Header Contract Navbar */}
      <Navbar
        onOpenRestrictions={() => setIsRestrictionsModalOpen(true)}
        onOpenFaq={handleOpenFaq}
        onScrollToDownloader={handleScrollToDownloader}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onScrollToDownloader={handleScrollToDownloader}
          onOpenRestrictions={() => setIsRestrictionsModalOpen(true)}
        />

        {/* Downloader Link Input Interface */}
        <DownloaderInput
          onProcessUrl={handleProcessUrl}
          isLoading={isLoading}
          errorMessage={errorMessage}
          onOpenRestrictions={() => setIsRestrictionsModalOpen(true)}
        />

        {/* Media Extracted Result Card with Video Player & Format Options */}
        {currentMedia && (
          <div id="media-result">
            <MediaResultCard
              media={currentMedia}
              onDownloadCompleted={handleDownloadCompleted}
              onReset={() => {
                setCurrentMedia(null);
                setErrorMessage(null);
              }}
              onOpenRestrictions={() => setIsRestrictionsModalOpen(true)}
            />
          </div>
        )}

        {/* Download History (if any) */}
        <RecentDownloads
          history={history}
          onClearHistory={handleClearHistory}
          onSelectUrl={handleProcessUrl}
        />

        {/* Platform Compatibility Breakdown */}
        <CompatibilityMatrix
          onOpenRestrictions={() => setIsRestrictionsModalOpen(true)}
        />

        {/* How It Works 3-Step Guide */}
        <HowItWorks />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer with Prominent Yuvraj Downloader Wordmark */}
      <Footer
        onOpenRestrictions={() => setIsRestrictionsModalOpen(true)}
        onScrollToDownloader={handleScrollToDownloader}
      />

      {/* Platform Restrictions Modal */}
      <PlatformRestrictionsModal
        isOpen={isRestrictionsModalOpen}
        onClose={() => setIsRestrictionsModalOpen(false)}
      />
    </div>
  );
}
