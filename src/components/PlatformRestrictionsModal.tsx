import React from 'react';
import { PLATFORM_RESTRICTIONS_DATA } from '../utils/mediaProcessor';
import {
  X,
  ShieldAlert,
  CheckCircle,
  XCircle,
  HelpCircle,
  Info,
  Lock,
  Clock,
  Music2,
  FileVideo,
} from 'lucide-react';

interface PlatformRestrictionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlatformRestrictionsModal: React.FC<PlatformRestrictionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in-50 duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0b1222] border border-slate-700/80 shadow-2xl shadow-indigo-950/60 p-6 sm:p-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-700/50 flex items-center justify-center text-indigo-400">
              <ShieldAlert className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Platform Rules & Restrictions Guide
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                How Yuvraj Downloader handles platform policies & permissions
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="mt-6 space-y-6">
          {/* Quick Summary Banner */}
          <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-4">
            <div className="flex items-start gap-3">
              <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300 space-y-1">
                <p className="font-semibold text-slate-200">
                  Why do some video downloads fail?
                </p>
                <p className="text-slate-400 leading-relaxed">
                  Instagram (Meta) and YouTube enforce strict digital rights management (DRM), privacy boundaries, and dynamic access tokens. Yuvraj Downloader only accesses public video streams that permit direct caching.
                </p>
              </div>
            </div>
          </div>

          {/* List of Detailed Restrictions */}
          <div className="space-y-4">
            {PLATFORM_RESTRICTIONS_DATA.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[#0f172a] border border-slate-800 p-4 hover:border-slate-700 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {item.allowed ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                    <span className="text-xs font-semibold text-slate-300">
                      {item.platform} · {item.type}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      item.allowed
                        ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                        : 'bg-rose-950/60 text-rose-300 border border-rose-800/40'
                    }`}
                  >
                    {item.allowed ? 'Supported' : 'Restricted'}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mt-2">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {item.description}
                </p>

                {item.workaround && (
                  <div className="mt-3 pt-3 border-t border-slate-800/60 text-xs">
                    <span className="font-semibold text-indigo-300">
                      Recommendation:{' '}
                    </span>
                    <span className="text-slate-300">{item.workaround}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actionable Tips Grid */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
              Checklist for 100% Success Rate:
            </h4>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">1.</span>
                <span>Ensure the Instagram account is set to <strong>Public</strong>, not Private.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">2.</span>
                <span>For Stories, verify the story is within the <strong>24-hour</strong> broadcast window.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">3.</span>
                <span>For YouTube Shorts, ensure the video is not <strong>Age-Restricted (18+)</strong> or restricted to paid members.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">4.</span>
                <span>Use the full URL format copied from the share button in Instagram or YouTube app.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-xs font-bold text-white transition"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
