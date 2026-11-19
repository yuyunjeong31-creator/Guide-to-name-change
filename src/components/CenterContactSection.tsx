import React, { useState } from 'react';
import {
  CENTER_HOURS_NOTICE,
  CENTERS_DATA,
  DISTRICT_OPTIONS,
  DistrictKey,
  ReasonId,
  SH_MAIN_PHONE,
  SubReasonId,
} from '../data/guideData';

interface CenterContactSectionProps {
  reasonId: ReasonId | SubReasonId;
}

export const CenterContactSection: React.FC<CenterContactSectionProps> = ({
  reasonId,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictKey | null>(
    null
  );
  const [showPhone, setShowPhone] = useState(false);

  const handleSelectDistrict = (district: DistrictKey) => {
    setSelectedDistrict(district);
    setShowPhone(false);
  };

  const selectedCenter =
    selectedDistrict && selectedDistrict !== '그 외 지역'
      ? CENTERS_DATA[selectedDistrict]
      : null;

  const isOtherRegion = selectedDistrict === '그 외 지역';
  const contactRegionId = `center-section-${reasonId}`;

  return (
    <div className="pt-[0.5rem]">
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        aria-controls={contactRegionId}
        className="w-full min-h-[3.5rem] px-[1.25rem] py-[0.875rem] rounded-full bg-gradient-to-r from-[#3D7A13] to-[#2B5A0C] hover:from-[#33690F] hover:to-[#224908] text-white font-bold text-[1.125rem] flex items-center justify-center gap-[0.5rem] shadow-[0_4px_14px_rgba(61,122,19,0.22)] transition-all duration-150 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#3D7A13] focus-visible:ring-offset-2 cursor-pointer"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[1.25rem] h-[1.25rem] shrink-0"
          aria-hidden="true"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
        </svg>
        <span>담당 센터 연락처 보기</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-[1.25rem] h-[1.25rem] shrink-0 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isExpanded && (
        <div
          id={contactRegionId}
          className="mt-[1rem] p-[1rem] sm:p-[1.25rem] rounded-2xl bg-[#F5FAF0] border border-[#D7E6C8] space-y-[1.25rem]"
        >
          <div className="space-y-[0.75rem]">
            <p className="text-[1.125rem] font-bold text-[#181A18]">
              거주하시는 구를 선택해 주세요
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-[0.5rem]">
              {DISTRICT_OPTIONS.map((district) => {
                const isSelected = selectedDistrict === district;
                return (
                  <button
                    key={district}
                    type="button"
                    onClick={() => handleSelectDistrict(district)}
                    aria-pressed={isSelected}
                    className={`min-h-[3.5rem] px-[0.5rem] sm:px-[0.75rem] py-[0.625rem] rounded-xl border-2 text-[1.125rem] font-semibold leading-snug text-center transition-colors duration-150 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#3D7A13] focus-visible:ring-offset-2 cursor-pointer ${
                      isSelected
                        ? 'bg-[#3D7A13] border-[#2B5A0C] text-white shadow-sm'
                        : 'bg-white border-[#CFD9C6] text-[#181A18] hover:border-[#4E8F1A] hover:bg-[#F2F8EC]'
                    }`}
                  >
                    {district}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedCenter && (
            <div className="p-[1rem] sm:p-[1.25rem] rounded-2xl bg-white border border-[#DCE6D3] shadow-[0_2px_10px_rgba(24,26,24,0.04)] space-y-[1rem]">
              <div className="space-y-[0.375rem]">
                <h4 className="text-[1.3125rem] font-bold text-[#181A18] leading-snug">
                  {selectedCenter.name}
                </h4>
                <p className="text-[1.125rem] text-[#4A4E46] leading-relaxed">
                  {selectedCenter.address}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[0.625rem]">
                <button
                  type="button"
                  onClick={() => setShowPhone((prev) => !prev)}
                  aria-expanded={showPhone}
                  className={`min-h-[3.5rem] px-[1rem] py-[0.75rem] rounded-full border-2 text-[1.125rem] font-bold flex items-center justify-center gap-[0.5rem] transition-all duration-150 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#3D7A13] focus-visible:ring-offset-2 cursor-pointer ${
                    showPhone
                      ? 'bg-[#EDF7E3] border-[#3D7A13] text-[#28540A]'
                      : 'bg-gradient-to-r from-[#3D7A13] to-[#2B5A0C] border-transparent text-white hover:from-[#33690F] hover:to-[#224908]'
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-[1.25rem] h-[1.25rem] shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z" />
                  </svg>
                  <span>{showPhone ? '전화번호 접기' : '전화번호 보기'}</span>
                </button>

                <a
                  href={`https://map.naver.com/p/search/${encodeURIComponent(
                    selectedCenter.mapQuery
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[3.5rem] px-[1rem] py-[0.75rem] rounded-full border-2 border-[#3D7A13] bg-white hover:bg-[#F2F8EC] text-[#28540A] text-[1.125rem] font-bold flex items-center justify-center gap-[0.5rem] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#3D7A13] focus-visible:ring-offset-2"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-[1.25rem] h-[1.25rem] shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                  </svg>
                  <span>지도 보기</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-[1.05rem] h-[1.05rem] shrink-0"
                    aria-hidden="true"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
              </div>

              {showPhone && (
                <div className="p-[1rem] rounded-xl bg-[#EFF7E6] border border-[#C5DFAF] text-center">
                  <p className="text-[1rem] font-semibold text-[#28540A] mb-[0.25rem]">
                    {selectedCenter.name} 전화번호
                  </p>
                  <p className="text-[1.6875rem] font-bold text-[#181A18] tabular-nums tracking-tight leading-tight">
                    {selectedCenter.phone}
                  </p>
                </div>
              )}
            </div>
          )}

          {isOtherRegion && (
            <div className="p-[1rem] sm:p-[1.25rem] rounded-2xl bg-white border border-[#DCE6D3] shadow-[0_2px_10px_rgba(24,26,24,0.04)] space-y-[1rem]">
              <div className="space-y-[0.25rem]">
                <h4 className="text-[1.3125rem] font-bold text-[#181A18] leading-snug">
                  SH 대표번호
                </h4>
                <p className="text-[1.125rem] text-[#4A4E46] leading-relaxed">
                  관할 센터 안내 및 상담을 연결해 드립니다.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPhone((prev) => !prev)}
                aria-expanded={showPhone}
                className={`w-full min-h-[3.5rem] px-[1rem] py-[0.75rem] rounded-full border-2 text-[1.125rem] font-bold flex items-center justify-center gap-[0.5rem] transition-all duration-150 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#3D7A13] focus-visible:ring-offset-2 cursor-pointer ${
                  showPhone
                    ? 'bg-[#EDF7E3] border-[#3D7A13] text-[#28540A]'
                    : 'bg-gradient-to-r from-[#3D7A13] to-[#2B5A0C] border-transparent text-white hover:from-[#33690F] hover:to-[#224908]'
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-[1.25rem] h-[1.25rem] shrink-0"
                  aria-hidden="true"
                >
                  <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z" />
                </svg>
                <span>{showPhone ? '전화번호 접기' : '전화번호 보기'}</span>
              </button>

              {showPhone && (
                <div className="p-[1rem] rounded-xl bg-[#EFF7E6] border border-[#C5DFAF] text-center">
                  <p className="text-[1rem] font-semibold text-[#28540A] mb-[0.25rem]">
                    SH 대표번호
                  </p>
                  <p className="text-[1.6875rem] font-bold text-[#181A18] tabular-nums tracking-tight leading-tight">
                    {SH_MAIN_PHONE}
                  </p>
                </div>
              )}
            </div>
          )}

          <p className="text-[1rem] font-medium text-[#4A4E46] leading-relaxed">
            {CENTER_HOURS_NOTICE}
          </p>
        </div>
      )}
    </div>
  );
};
