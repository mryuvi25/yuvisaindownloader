import React from 'react';

interface YuvrajLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  subtitle?: string;
}

export const YuvrajLogo: React.FC<YuvrajLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  subtitle,
}) => {
  const sizeMap = {
    sm: { icon: 32, text: 'text-base', subtext: 'text-[10px]' },
    md: { icon: 40, text: 'text-xl', subtext: 'text-xs' },
    lg: { icon: 52, text: 'text-2xl', subtext: 'text-sm' },
    xl: { icon: 68, text: 'text-3xl md:text-4xl', subtext: 'text-sm' },
  };

  const { icon: pxSize, text: textSize, subtext: subtextSize } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Premium Custom Logo: Letter 'Y' combined with downward Download Arrow */}
      <div
        className="relative shrink-0 flex items-center justify-center rounded-xl transition-transform duration-300 hover:scale-105"
        style={{ width: pxSize, height: pxSize }}
      >
        {/* Subtle ambient gradient aura */}
        <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl opacity-75 blur-[3px] group-hover:opacity-100 transition duration-300" />

        {/* Shield container */}
        <svg
          viewBox="0 0 48 48"
          width={pxSize}
          height={pxSize}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 drop-shadow-md"
        >
          {/* Background Squircle */}
          <rect
            x="2"
            y="2"
            width="44"
            height="44"
            rx="12"
            fill="#0b1222"
            stroke="url(#yuvraj-border-gradient)"
            strokeWidth="1.5"
          />

          {/* Background subtle radial highlight */}
          <circle cx="24" cy="18" r="14" fill="url(#yuvraj-glow)" opacity="0.35" />

          {/* Letter Y Upper Arms */}
          <path
            d="M13 13 L21 23.5 H27 L35 13 H29.5 L24 20.2 L18.5 13 H13 Z"
            fill="url(#yuvraj-y-grad)"
          />

          {/* Seamless Download Arrow forming the Stem of the Y */}
          {/* Arrow Shaft (vertical trunk of Y) */}
          <path
            d="M21.5 22.5 H26.5 V30 H21.5 Z"
            fill="url(#yuvraj-arrow-grad)"
          />

          {/* Downward Arrow Head */}
          <path
            d="M17 29.5 L24 37 L31 29.5 H27 V28 H21 V29.5 H17 Z"
            fill="url(#yuvraj-arrow-head)"
          />

          {/* Download Tray Base / Accent Arc */}
          <path
            d="M14 38.5 C17 40.5 31 40.5 34 38.5"
            stroke="#38bdf8"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Linear Gradients */}
          <defs>
            <linearGradient id="yuvraj-border-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#60a5fa" />
              <stop offset="0.5" stopColor="#818cf8" />
              <stop offset="1" stopColor="#c084fc" />
            </linearGradient>

            <radialGradient id="yuvraj-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="yuvraj-y-grad" x1="13" y1="13" x2="35" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" />
              <stop offset="0.6" stopColor="#e0e7ff" />
              <stop offset="1" stopColor="#a5b4fc" />
            </linearGradient>

            <linearGradient id="yuvraj-arrow-grad" x1="24" y1="22" x2="24" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a5b4fc" />
              <stop offset="1" stopColor="#38bdf8" />
            </linearGradient>

            <linearGradient id="yuvraj-arrow-head" x1="17" y1="28" x2="31" y2="37" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="0.6" stopColor="#818cf8" />
              <stop offset="1" stopColor="#c084fc" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Wordmark */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 font-bold tracking-tight text-white leading-none">
            <span className={`font-heading tracking-tight ${textSize}`}>
              Yuvraj
            </span>
            <span className={`font-heading bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent ${textSize}`}>
              Downloader
            </span>
          </div>
          {subtitle && (
            <span className={`text-slate-400 font-medium tracking-wide uppercase ${subtextSize} mt-0.5`}>
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
