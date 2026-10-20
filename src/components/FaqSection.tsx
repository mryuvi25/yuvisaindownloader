import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Is Yuvraj Downloader completely free to use?',
      answer:
        'Yes, Yuvraj Downloader is 100% free with unlimited downloads for Instagram Reels, Instagram Stories, and YouTube Shorts. You do not need to register an account or install browser extensions.',
    },
    {
      question: 'Does Yuvraj Downloader add watermarks to videos?',
      answer:
        'No. All media is fetched directly from the content delivery network in its authentic broadcast quality (up to 1080p Full HD 60fps) with zero added watermarks or brand overlays.',
    },
    {
      question: 'Why can’t I download from Private Instagram accounts?',
      answer:
        'Private Instagram profiles are protected by Meta’s end-to-end privacy security. Accessing media from private accounts requires active user session authentication, which third-party downloaders cannot and should not bypass. Yuvraj Downloader strictly supports public posts to protect user privacy.',
    },
    {
      question: 'How long do Instagram Stories remain downloadable?',
      answer:
        'Instagram Stories can be downloaded anytime during their active 24-hour broadcast window. Once the 24 hours expire, Instagram moves the media to the creator’s private archive, making it unavailable to external fetchers.',
    },
    {
      question: 'Can I extract and download only the audio (MP3)?',
      answer:
        'Yes! For every processed video, Yuvraj Downloader provides a dedicated "Crystal Audio Only" (MP3 320kbps) option, allowing you to save trending music, sound bites, or voiceovers directly without downloading the heavy video file.',
    },
    {
      question: 'Where do downloaded videos go on my iPhone or Android?',
      answer:
        'On iOS, downloaded videos save to the Files app under the "Downloads" folder, from where you can tap "Save Video" to move them to Photos. On Android and PC/Mac, files appear directly in your standard Downloads folder.',
    },
  ];

  return (
    <section id="faq" className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Everything you need to know about formats, privacy, and downloading with Yuvraj Downloader.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-xl bg-[#0d1527] border border-slate-800/90 overflow-hidden transition"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm font-bold text-white hover:text-indigo-400 transition"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-4 ${
                    isOpen ? 'rotate-180 text-indigo-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
