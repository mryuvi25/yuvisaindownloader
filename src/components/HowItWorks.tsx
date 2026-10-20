import React from 'react';
import { Copy, Sparkles, DownloadCloud } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Copy the Media Link',
      description:
        'Open Instagram or YouTube on your phone or browser, tap Share, and select "Copy Link" for any public Reel, 24-hour Story, or YouTube Short.',
      icon: Copy,
    },
    {
      number: '02',
      title: 'Paste into Yuvraj Downloader',
      description:
        'Paste the link into the Yuvraj Downloader search bar. Our engine automatically detects the platform, verifies privacy permissions, and extracts direct HD streams.',
      icon: Sparkles,
    },
    {
      number: '03',
      title: 'Save in 1080p HD or MP3 Audio',
      description:
        'Choose your desired format (Full HD 1080p MP4, 720p, or 320kbps MP3 audio) and download the file directly to your device with zero watermark.',
      icon: DownloadCloud,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          How to Download in 3 Steps
        </h2>
        <p className="mt-3 text-sm text-slate-400">
          Fast, effortless, and private. No software installation or account login required.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="relative rounded-2xl bg-[#0d1527] border border-slate-800 p-6 flex flex-col justify-between hover:border-indigo-500/40 transition group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-mono text-indigo-400/80 group-hover:text-sky-400 transition">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-2">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
