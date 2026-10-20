import React from 'react';
import { Check, X, AlertTriangle, Film, Camera, PlaySquare } from 'lucide-react';

interface CompatibilityMatrixProps {
  onOpenRestrictions: () => void;
}

export const CompatibilityMatrix: React.FC<CompatibilityMatrixProps> = ({
  onOpenRestrictions,
}) => {
  const platforms = [
    {
      name: 'Instagram Reels',
      icon: Film,
      resolutions: '1080p, 720p',
      audioSupport: 'MP3 320kbps',
      watermark: 'Zero Watermark',
      status: 'Fully Supported',
      restrictions: 'Public reels only (No private profiles)',
    },
    {
      name: 'Instagram Stories',
      icon: Camera,
      resolutions: '1080p Original',
      audioSupport: 'Included Audio',
      watermark: 'Clean Frame',
      status: 'Supported (<24h)',
      restrictions: 'Active stories only; expires after 24 hours',
    },
    {
      name: 'YouTube Shorts',
      icon: PlaySquare,
      resolutions: '1080p 60fps, 720p',
      audioSupport: 'High-Bitrate MP3',
      watermark: 'Clean Source',
      status: 'Fully Supported',
      restrictions: 'No Age-Restricted (18+) or Members-Only videos',
    },
  ];

  return (
    <section id="platforms" className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Platform Compatibility & Formats
        </h2>
        <p className="mt-3 text-sm text-slate-400">
          Transparent breakdown of supported resolutions, audio extraction, and platform rules in Yuvraj Downloader.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {platforms.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-[#0d1527] border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-indigo-950/60 border border-indigo-800/40 flex items-center justify-center text-indigo-400">
                    <Icon className="w-5 h-5 text-sky-400" />
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-400 font-mono">
                    {p.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mt-4">{p.name}</h3>

                <div className="mt-4 space-y-2.5 text-xs text-slate-300">
                  <div className="flex justify-between py-1.5 border-b border-slate-800/70">
                    <span className="text-slate-400">Max Resolution</span>
                    <span className="font-semibold text-slate-200">{p.resolutions}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/70">
                    <span className="text-slate-400">Audio Extraction</span>
                    <span className="font-semibold text-slate-200">{p.audioSupport}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/70">
                    <span className="text-slate-400">Watermark</span>
                    <span className="font-semibold text-emerald-400">{p.watermark}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400">
                  <span className="font-semibold text-amber-400 block mb-0.5">Restriction note:</span>
                  {p.restrictions}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800/70 flex justify-end">
                <button
                  type="button"
                  onClick={onOpenRestrictions}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition"
                >
                  Read platform guidelines →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
