import React from 'react';

/**
 * 상단 안내 영역에만 작게 배치되는 SH 청렴 캐릭터 일러스트
 */
export const ShCharacterEmblem: React.FC = () => {
  return (
    <div
      className="shrink-0 w-[68px] h-[68px] sm:w-[76px] sm:h-[76px] rounded-2xl bg-white border border-[#D5E4C8] shadow-[0_2px_10px_rgba(24,26,24,0.06)] overflow-hidden p-1 flex items-center justify-center"
      aria-hidden="true"
    >
      <img
        src="/assets/aistudio/KakaoTalk_20261119_152627772_3da2c7ff.jpg"
        alt=""
        className="w-full h-full object-contain select-none pointer-events-none"
      />
    </div>
  );
};
