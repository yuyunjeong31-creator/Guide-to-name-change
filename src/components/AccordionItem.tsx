import React, { useEffect, useRef, useState } from 'react';
import { ReasonGuide, ReasonId, SubReasonId } from '../data/guideData';
import { CenterContactSection } from './CenterContactSection';
import { DocumentChecklist } from './DocumentChecklist';

interface AccordionItemProps {
  reason: ReasonGuide;
  isOpen: boolean;
  onToggle: () => void;
  checkedMap: Record<string, boolean>;
  onToggleCheck: (key: string) => void;
}

const ReasonRowIcon: React.FC<{ id: ReasonId }> = ({ id }) => {
  switch (id) {
    case 'rename':
      // 인물 + 이름 수정 펜 아이콘 (SH 주조색 그린 & 딥차콜)
      return (
        <span
          className="w-[2.75rem] h-[2.75rem] rounded-full bg-[#EDF7E3] flex items-center justify-center shrink-0 text-[#2B5A0C]"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 28 28"
            fill="none"
            className="w-[1.625rem] h-[1.625rem]"
          >
            <circle cx="13" cy="9.5" r="4" fill="#3D7A13" />
            <path
              d="M6.5 21.5C6.5 17.9101 9.41015 15 13 15C16.5899 15 19.5 17.9101 19.5 21.5"
              fill="#5AA61E"
            />
            <circle cx="20.5" cy="20.5" r="4.5" fill="#181A18" />
            <path
              d="M19 22L22 19M21.2 18.8L22.2 19.8"
              stroke="#FFFFFF"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </span>
      );
    case 'ssn':
      // 신분증 카드 아이콘 (SH 주조색 그린)
      return (
        <span
          className="w-[2.75rem] h-[2.75rem] rounded-full bg-[#EDF7E3] flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 28 28"
            fill="none"
            className="w-[1.625rem] h-[1.625rem]"
          >
            <rect x="4" y="7" width="20" height="14" rx="3" fill="#3D7A13" />
            <circle cx="10" cy="12.5" r="2.1" fill="#FFFFFF" />
            <path
              d="M7 18C7 16.3431 8.34315 15 10 15C11.6569 15 13 16.3431 13 18"
              fill="#FFFFFF"
            />
            <line
              x1="15.5"
              y1="12"
              x2="21"
              y2="12"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <line
              x1="15.5"
              y1="16"
              x2="20"
              y2="16"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      );
    case 'contractor-transfer':
      // 계약자 명의 변경 문서 + 전달 아이콘 (SH 주조색 그린 계열)
      return (
        <span
          className="w-[2.75rem] h-[2.75rem] rounded-full bg-[#EDF7E3] flex items-center justify-center shrink-0 text-[#3D7A13]"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 28 28"
            fill="none"
            className="w-[1.625rem] h-[1.625rem]"
          >
            <rect x="6" y="5" width="13" height="17" rx="2.5" fill="#3D7A13" />
            <line
              x1="9.2"
              y1="9.8"
              x2="15.8"
              y2="9.8"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <line
              x1="9.2"
              y1="13.5"
              x2="14.5"
              y2="13.5"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="19.5" cy="19.5" r="4.5" fill="#181A18" />
            <path
              d="M17.3 19.5H21.7M21.7 19.5L20 17.8M21.7 19.5L20 21.2"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      );
  }
};

export const AccordionItem: React.FC<AccordionItemProps> = ({
  reason,
  isOpen,
  onToggle,
  checkedMap,
  onToggleCheck,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHiddenAfterClose, setIsHiddenAfterClose] = useState(!isOpen);
  const [selectedSubId, setSelectedSubId] = useState<SubReasonId | null>(null);

  const buttonId = `accordion-btn-${reason.id}`;
  const panelId = `accordion-panel-${reason.id}`;
  const activeSubReason =
    reason.subReasons?.find((sub) => sub.id === selectedSubId) ?? null;

  useEffect(() => {
    if (isOpen) {
      setIsHiddenAfterClose(false);
      return;
    }

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setIsHiddenAfterClose(true);
      return;
    }

    const timer = window.setTimeout(() => {
      setIsHiddenAfterClose(true);
    }, 400);

    return () => window.clearTimeout(timer);
  }, [isOpen]);

  const handleClick = () => {
    const willOpen = !isOpen;
    onToggle();

    if (willOpen && buttonRef.current) {
      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.setTimeout(() => {
        buttonRef.current?.scrollIntoView({
          behavior: prefersReduced ? 'auto' : 'smooth',
          block: 'nearest',
        });
      }, 120);
    }
  };

  return (
    <div
      className={`rounded-[1.25rem] border transition-all duration-200 ${
        isOpen
          ? reason.calmTone
            ? 'bg-white border-[#575B52] shadow-[0_8px_24px_rgba(24,26,24,0.08)]'
            : 'bg-white border-[#4E8F1A] shadow-[0_8px_24px_rgba(78,143,26,0.10)]'
          : 'bg-white border-[#DDE6D6] shadow-[0_4px_16px_rgba(24,26,24,0.045)] hover:border-[#78BE20]'
      }`}
    >
      <button
        ref={buttonRef}
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={handleClick}
        className={`w-full min-h-[4.25rem] px-[1.125rem] sm:px-[1.375rem] py-[0.875rem] flex items-center justify-between gap-[0.875rem] text-left rounded-[1.25rem] scroll-mt-[84px] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#3D7A13] focus-visible:ring-offset-2 cursor-pointer transition-colors duration-150 ${
          isOpen
            ? reason.calmTone
              ? 'bg-[#F4F5F2] text-[#181A18]'
              : 'bg-[#F4FAEE] text-[#181A18]'
            : 'text-[#181A18]'
        }`}
      >
        <div className="flex items-center gap-[0.875rem] min-w-0 flex-1">
          <ReasonRowIcon id={reason.id} />
          <span className="text-[1.3125rem] font-bold leading-snug">
            {reason.rowTitle}
          </span>
        </div>

        <span
          className={`accordion-plus-icon w-[1.5rem] h-[1.5rem] shrink-0 flex items-center justify-center ${
            isOpen
              ? reason.calmTone
                ? 'text-[#4A4E46]'
                : 'text-[#3D7A13]'
              : 'text-[#575B52]'
          }`}
          data-open={isOpen ? 'true' : 'false'}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            className="w-full h-full"
          >
            <line x1="12" y1="4" x2="12" y2="20" />
            <line x1="4" y1="12" x2="20" y2="12" />
          </svg>
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        data-open={isOpen ? 'true' : 'false'}
        inert={!isOpen ? true : undefined}
        style={{
          visibility: !isOpen && isHiddenAfterClose ? 'hidden' : 'visible',
        }}
        className="accordion-panel"
      >
        <div className="accordion-panel-inner">
          <div className="px-[1.125rem] sm:px-[1.375rem] pb-[1.5rem] pt-[1rem] border-t border-[#E6ECE0] space-y-[1.25rem]">
            {reason.panelTitle && (
              <h2 className="text-[1.3125rem] font-bold text-[#181A18] leading-snug">
                {reason.panelTitle}
              </h2>
            )}

            {reason.subReasons && reason.subReasons.length > 0 ? (
              <div className="space-y-[1.25rem]">
                <div className="p-[1rem] rounded-xl border bg-[#F5F6F3] border-[#DCE0D7] text-[#181A18] space-y-[0.75rem]">
                  <div className="space-y-[0.25rem]">
                    <p className="text-[1.125rem] font-semibold leading-relaxed">
                      {reason.topMessage}
                    </p>
                    {reason.subNotice && (
                      <p className="text-[1rem] text-[#4A4E46] leading-relaxed">
                        {reason.subNotice}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-[0.625rem]">
                    {reason.subReasons.map((sub) => {
                      const isSelected = selectedSubId === sub.id;
                      return (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => setSelectedSubId(sub.id)}
                          aria-pressed={isSelected}
                          className={`min-h-[3.5rem] px-[0.75rem] py-[0.625rem] rounded-xl border-2 text-[1.125rem] font-bold leading-snug text-center transition-colors duration-150 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#3D7A13] focus-visible:ring-offset-2 cursor-pointer ${
                            isSelected
                              ? 'bg-[#3B4036] border-[#262922] text-white shadow-sm'
                              : 'bg-white border-[#CFD6C8] text-[#181A18] hover:border-[#4E8F1A] hover:bg-[#F5FAF0]'
                          }`}
                        >
                          {sub.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {activeSubReason && (
                  <div className="space-y-[1.25rem]">
                    <div className="p-[1rem] rounded-xl border bg-[#F5F6F3] border-[#DCE0D7] text-[#181A18] space-y-[0.375rem]">
                      <p className="text-[1.125rem] font-semibold leading-relaxed">
                        {activeSubReason.topMessage}
                      </p>
                      {activeSubReason.subNotice && (
                        <p className="text-[1rem] text-[#4A4E46] leading-relaxed">
                          {activeSubReason.subNotice}
                        </p>
                      )}
                    </div>

                    <DocumentChecklist
                      reasonId={activeSubReason.id}
                      groups={activeSubReason.groups}
                      checkedMap={checkedMap}
                      onToggleCheck={onToggleCheck}
                      calmTone={activeSubReason.calmTone}
                    />

                    {activeSubReason.footerNotice && (
                      <p className="text-[1rem] font-medium text-[#4A4E46] leading-relaxed">
                        {activeSubReason.footerNotice}
                      </p>
                    )}

                    {activeSubReason.hasCenterContact && (
                      <CenterContactSection
                        key={activeSubReason.id}
                        reasonId={activeSubReason.id}
                      />
                    )}
                  </div>
                )}
              </div>
            ) : (
              <>
                <div
                  className={`p-[1rem] rounded-xl border ${
                    reason.calmTone
                      ? 'bg-[#F5F6F3] border-[#DCE0D7] text-[#181A18]'
                      : 'bg-[#F2F8EC] border-[#D5E6C5] text-[#181A18]'
                  } space-y-[0.375rem]`}
                >
                  <p className="text-[1.125rem] font-semibold leading-relaxed">
                    {reason.topMessage}
                  </p>
                  {reason.subNotice && (
                    <p className="text-[1rem] text-[#4A4E46] leading-relaxed">
                      {reason.subNotice}
                    </p>
                  )}
                </div>

                {reason.groups && reason.groups.length > 0 && (
                  <DocumentChecklist
                    reasonId={reason.id}
                    groups={reason.groups}
                    checkedMap={checkedMap}
                    onToggleCheck={onToggleCheck}
                    hideSingleGroupHeading={
                      reason.id === 'rename' || reason.id === 'ssn'
                    }
                    calmTone={reason.calmTone}
                  />
                )}

                {reason.footerNotice && (
                  <p className="text-[1rem] font-medium text-[#4A4E46] leading-relaxed">
                    {reason.footerNotice}
                  </p>
                )}

                {reason.hasCenterContact && (
                  <CenterContactSection reasonId={reason.id} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
