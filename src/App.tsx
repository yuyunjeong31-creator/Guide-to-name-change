import { useEffect, useState } from 'react';
import { AccordionItem } from './components/AccordionItem';
import { HelpSupportSection } from './components/HelpSupportSection';
import { LargeTextToggle } from './components/LargeTextToggle';
import { ShCharacterEmblem } from './components/ShCharacterEmblem';
import { HEADER_TEXT, REASONS_DATA, ReasonId } from './data/guideData';

type AccordionId = ReasonId | 'help-support';

export default function App() {
  const [openId, setOpenId] = useState<AccordionId | null>(null);
  const [largeMode, setLargeMode] = useState(false);
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const root = document.documentElement;
    if (largeMode) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }
    return () => {
      root.classList.remove('large-text');
    };
  }, [largeMode]);

  const handleToggleAccordion = (id: AccordionId) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleToggleCheck = (key: string) => {
    setCheckedMap((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EFF7E8] via-[#F7FAF5] to-[#F7FAF5] text-[#181A18]">
      {/* 스크롤해도 보이며 아코디언 행과 겹치지 않는 상단 고정 유틸리티 바 */}
      <div className="sticky top-0 z-40 bg-[#F4F9EF]/92 backdrop-blur-md border-b border-[#DCE7D3]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#4E8F1A] to-[#2F630D] text-white font-bold text-[12px] flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              SH
            </span>
            <span className="text-[15px] font-bold text-[#181A18] tracking-tight whitespace-nowrap truncate">
              계약정보 변경 길잡이
            </span>
          </div>
          <LargeTextToggle
            largeMode={largeMode}
            onToggle={() => setLargeMode((prev) => !prev)}
          />
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-[1.5rem] pb-[3.5rem] space-y-[1.5rem]">
        {/* 상단 안내 영역 */}
        <header className="space-y-[1rem]">
          <div className="space-y-[0.625rem]">
            <div className="flex items-center justify-between gap-3">
              <h1
                className="text-[1.75rem] font-bold text-[#181A18] leading-[1.3] tracking-tight flex-1 min-w-0"
                style={{ textWrap: 'balance' }}
              >
                바뀐 내 정보,{' '}
                <span className="text-[#3D7A13] inline-flex items-baseline">
                  <img
                    src="/assets/aistudio/KakaoTalk_20261119_154716625_1dea8452.jpg"
                    alt="SH"
                    className="inline-block h-[1.15em] w-auto align-baseline translate-y-[0.14em] mr-[0.04em] mix-blend-multiply select-none pointer-events-none"
                  />
                  에도
                </span>{' '}
                알려주세요!
              </h1>
              <ShCharacterEmblem />
            </div>
            <p className="text-[1.125rem] font-medium text-[#4A4E46] leading-relaxed">
              {HEADER_TEXT.subtitle}
            </p>
          </div>

          <div className="p-[1rem] rounded-2xl bg-white/95 border border-[#DCE7D3] shadow-[0_4px_14px_rgba(24,26,24,0.04)]">
            <p className="text-[1rem] font-medium text-[#2E332B] leading-relaxed">
              {HEADER_TEXT.notice}
            </p>
          </div>
        </header>

        {/* 사유 및 도움 안내 아코디언 목록 */}
        <section aria-label="계약정보 변경 사유 선택">
          <div className="space-y-[0.75rem]">
            {REASONS_DATA.map((reason) => (
              <AccordionItem
                key={reason.id}
                reason={reason}
                isOpen={openId === reason.id}
                onToggle={() => handleToggleAccordion(reason.id)}
                checkedMap={checkedMap}
                onToggleCheck={handleToggleCheck}
              />
            ))}
            <HelpSupportSection
              isOpen={openId === 'help-support'}
              onToggle={() => handleToggleAccordion('help-support')}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
