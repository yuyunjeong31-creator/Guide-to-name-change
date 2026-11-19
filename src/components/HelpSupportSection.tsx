import React, { useEffect, useRef, useState } from 'react';
import { HEADER_TEXT } from '../data/guideData';

const SH_CENTER_GUIDE_URL = 'https://www.i-sh.co.kr/';

interface HelpSupportSectionProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const HelpSupportSection: React.FC<HelpSupportSectionProps> = ({
  isOpen,
  onToggle,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHiddenAfterClose, setIsHiddenAfterClose] = useState(!isOpen);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  const buttonId = 'accordion-btn-help-support';
  const panelId = 'accordion-panel-help-support';

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

  useEffect(() => {
    if (!shareFeedback) {
      return;
    }
    const timer = window.setTimeout(() => {
      setShareFeedback(null);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [shareFeedback]);

  const handleToggleClick = () => {
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

  const copyPageUrl = async (url: string): Promise<boolean> => {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(url);
        return true;
      } catch {
        // Fallback below
      }
    }

    try {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand('copy');
      document.body.removeChild(textarea);
      return copied;
    } catch {
      return false;
    }
  };

  const handleShareToFamily = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: HEADER_TEXT.title,
      text: 'SH 임대주택 계약정보 변경 시 필요한 구비서류와 센터 연락처를 확인해 보세요.',
      url: shareUrl,
    };

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData);
        setShareFeedback('가족에게 안내 페이지를 공유했습니다.');
        return;
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
      }
    }

    const copied = await copyPageUrl(shareUrl);
    if (copied) {
      setShareFeedback(
        '안내 페이지 주소가 복사되었습니다. 카카오톡이나 문자에 붙여넣어 가족에게 보내주세요.'
      );
    } else {
      setShareFeedback(
        '브라우저 주소창의 링크를 복사해 가족에게 전달해 주세요.'
      );
    }
  };

  return (
    <div
      className={`rounded-[1.25rem] border transition-all duration-200 ${
        isOpen
          ? 'bg-white border-[#4E8F1A] shadow-[0_8px_24px_rgba(78,143,26,0.10)]'
          : 'bg-white border-[#DDE6D6] shadow-[0_4px_16px_rgba(24,26,24,0.045)] hover:border-[#78BE20]'
      }`}
    >
      <button
        ref={buttonRef}
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={handleToggleClick}
        className={`w-full min-h-[4.25rem] px-[1.125rem] sm:px-[1.375rem] py-[0.875rem] flex items-center justify-between gap-[0.875rem] text-left rounded-[1.25rem] scroll-mt-[84px] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#3D7A13] focus-visible:ring-offset-2 cursor-pointer transition-colors duration-150 ${
          isOpen ? 'bg-[#F4FAEE] text-[#181A18]' : 'text-[#181A18]'
        }`}
      >
        <div className="flex items-center gap-[0.875rem] min-w-0 flex-1">
          <span
            className="w-[2.75rem] h-[2.75rem] rounded-full bg-[#EDF7E3] flex items-center justify-center shrink-0 text-[#2B5A0C]"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 28 28"
              fill="none"
              className="w-[1.5rem] h-[1.5rem]"
            >
              <circle cx="14" cy="14" r="9.5" fill="#3D7A13" />
              <path
                d="M11.3 11.4C11.3 9.95 12.48 9 14 9C15.55 9 16.65 9.92 16.65 11.25C16.65 12.28 15.98 12.88 15.02 13.45C14.22 13.92 13.95 14.32 13.95 15.1V15.4"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="14" cy="18.5" r="1.2" fill="#FFFFFF" />
            </svg>
          </span>
          <span className="text-[1.3125rem] font-bold leading-snug">
            혼자 진행하기 어려우신가요?
          </span>
        </div>

        <span
          className={`accordion-plus-icon w-[1.5rem] h-[1.5rem] shrink-0 flex items-center justify-center ${
            isOpen ? 'text-[#3D7A13]' : 'text-[#575B52]'
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
          <div className="px-[1.125rem] sm:px-[1.375rem] pb-[1.5rem] pt-[1rem] border-t border-[#E6ECE0] space-y-[1.125rem]">
            <div className="p-[1rem] rounded-xl border bg-[#F2F8EC] border-[#D5E6C5] text-[#181A18]">
              <p className="text-[1.125rem] font-medium text-[#2E332B] leading-relaxed">
                온라인 신청이나 서류 확인이 어려우시면 가족·보호자에게 안내
                페이지를 보내거나, SH 공식 센터 안내 페이지에서 관할 센터를 바로
                확인하세요.
              </p>
            </div>

            <div className="space-y-[0.75rem]">
              <button
                type="button"
                onClick={handleShareToFamily}
                className="w-full min-h-[3.5rem] px-[1.25rem] py-[0.875rem] rounded-xl bg-[#102013] hover:bg-[#19321E] text-white font-bold text-[1.125rem] flex items-center justify-center gap-[0.5rem] shadow-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#3D7A13] focus-visible:ring-offset-2 cursor-pointer"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-[1.25rem] h-[1.25rem] shrink-0"
                  aria-hidden="true"
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                <span>가족에게 보내기</span>
              </button>

              {shareFeedback && (
                <p
                  role="status"
                  aria-live="polite"
                  className="px-[1rem] py-[0.75rem] rounded-xl bg-[#EFF7E6] border border-[#C5DFAF] text-[1rem] font-semibold text-[#28540A] text-center leading-relaxed"
                >
                  {shareFeedback}
                </p>
              )}

              <a
                href={SH_CENTER_GUIDE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[3.5rem] px-[1.25rem] py-[0.875rem] rounded-xl border-2 border-[#3D7A13] bg-white hover:bg-[#F2F8EC] text-[#1D3E08] font-bold text-[1.125rem] flex items-center justify-center gap-[0.5rem] text-center transition-colors duration-150 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#3D7A13] focus-visible:ring-offset-2"
              >
                <span>SH 센터별 담당자 연락처 안내 페이지 보기</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-[1.15rem] h-[1.15rem] shrink-0"
                  aria-hidden="true"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
