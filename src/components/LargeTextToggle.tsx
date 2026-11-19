import React from 'react';

interface LargeTextToggleProps {
  largeMode: boolean;
  onToggle: () => void;
}

export const LargeTextToggle: React.FC<LargeTextToggleProps> = ({
  largeMode,
  onToggle,
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={largeMode}
      aria-label={largeMode ? '큰글씨 모드 끄기' : '큰글씨 모드 켜기'}
      className={`min-h-[56px] px-4 py-2 rounded-full border-2 inline-flex items-center justify-center gap-2 font-bold text-[16px] leading-none whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#3D7A13] focus-visible:ring-offset-2 cursor-pointer ${
        largeMode
          ? 'bg-gradient-to-r from-[#3D7A13] to-[#2B5A0C] border-[#244B0A] text-white shadow-sm'
          : 'bg-white border-[#3D7A13] text-[#2B5A0C] shadow-sm hover:bg-[#F2F8EC]'
      }`}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[28px] h-[28px] shrink-0"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="8"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <line
          x1="17.8"
          y1="17.8"
          x2="24.5"
          y2="24.5"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {largeMode && (
          <>
            <line
              x1="12"
              y1="8.5"
              x2="12"
              y2="15.5"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <line
              x1="8.5"
              y1="12"
              x2="15.5"
              y2="12"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
      <span>{largeMode ? '기본글씨' : '큰글씨'}</span>
    </button>
  );
};
