import React from 'react';
import { DocumentGroup, ReasonId, SubReasonId } from '../data/guideData';

interface DocumentChecklistProps {
  reasonId: ReasonId | SubReasonId;
  groups: DocumentGroup[];
  checkedMap: Record<string, boolean>;
  onToggleCheck: (key: string) => void;
  hideSingleGroupHeading?: boolean;
  calmTone?: boolean;
}

export const DocumentChecklist: React.FC<DocumentChecklistProps> = ({
  reasonId,
  groups,
  checkedMap,
  onToggleCheck,
  hideSingleGroupHeading = false,
  calmTone = false,
}) => {
  return (
    <div className="space-y-[1.5rem]">
      {groups.map((group) => {
        const checkedCount = group.items.filter(
          (item) => checkedMap[`${reasonId}:${item.id}`]
        ).length;
        const totalCount = group.items.length;
        const allChecked = checkedCount === totalCount && totalCount > 0;

        return (
          <section
            key={group.id}
            className={`rounded-2xl border p-[1rem] sm:p-[1.125rem] space-y-[0.75rem] ${
              calmTone
                ? 'bg-[#F5F6F3] border-[#DCE0D7]'
                : 'bg-[#F5FAF0] border-[#D7E6C8]'
            }`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 pb-[0.5rem] border-b border-[#DCE2D6]">
              {!hideSingleGroupHeading ? (
                <h3 className="text-[1.125rem] font-bold text-[#181A18] leading-snug">
                  {group.title}
                </h3>
              ) : (
                <span className="text-[1rem] font-bold text-[#181A18]">
                  준비서류 체크리스트
                </span>
              )}
              <span
                className={`text-[1rem] font-bold tabular-nums shrink-0 ${
                  allChecked
                    ? calmTone
                      ? 'text-[#3B4036]'
                      : 'text-[#3D7A13]'
                    : 'text-[#575B52]'
                }`}
                aria-label={`준비 완료 ${checkedCount}건 / 전체 ${totalCount}건`}
              >
                {checkedCount}/{totalCount}
              </span>
            </div>

            <ul className="space-y-[0.5rem]">
              {group.items.map((item) => {
                const checkKey = `${reasonId}:${item.id}`;
                const isChecked = Boolean(checkedMap[checkKey]);
                const inputId = `doc-${reasonId}-${item.id}`;

                return (
                  <li key={item.id}>
                    <label
                      htmlFor={inputId}
                      className={`flex items-start gap-[0.75rem] p-[0.75rem] rounded-xl border transition-colors duration-150 cursor-pointer select-none min-h-[3.5rem] ${
                        isChecked
                          ? calmTone
                            ? 'bg-white border-[#A7AE9F] text-[#4A4E46]'
                            : 'bg-white border-[#8CC648] text-[#4A4E46]'
                          : 'bg-white border-[#E0E5DC] hover:border-[#78BE20] text-[#181A18]'
                      }`}
                    >
                      <span className="relative flex items-center justify-center shrink-0 mt-[0.125rem]">
                        <input
                          id={inputId}
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => onToggleCheck(checkKey)}
                          className="peer sr-only"
                        />
                        <span
                          className={`w-[1.5rem] h-[1.5rem] rounded-full border-2 flex items-center justify-center transition-colors duration-150 peer-focus-visible:ring-3 peer-focus-visible:ring-[#3D7A13] peer-focus-visible:ring-offset-2 ${
                            isChecked
                              ? calmTone
                                ? 'bg-[#4A4E46] border-[#4A4E46] text-white'
                                : 'bg-[#3D7A13] border-[#3D7A13] text-white'
                              : 'bg-white border-[#8B9184] text-transparent'
                          }`}
                          aria-hidden="true"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-[0.95rem] h-[0.95rem]"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                      </span>

                      <span className="flex-1 min-w-0 flex flex-wrap items-baseline justify-between gap-x-[0.75rem] gap-y-[0.25rem]">
                        <span
                          className={`text-[1.125rem] leading-[1.55] font-medium ${
                            isChecked ? 'line-through text-[#7A8074]' : 'text-[#181A18]'
                          }`}
                        >
                          {item.name}
                          {item.badge && (
                            <span className="inline-block ml-[0.5rem] px-[0.5rem] py-[0.125rem] text-[1rem] font-semibold leading-snug rounded-md border border-[#CBD4C2] bg-[#F1F5EC] text-[#3B4036] align-baseline">
                              {item.badge}
                            </span>
                          )}
                        </span>

                        {item.quantity && (
                          <span
                            className={`text-[1rem] font-bold shrink-0 tabular-nums ${
                              isChecked ? 'text-[#8B9184]' : 'text-[#3D7A13]'
                            }`}
                          >
                            {item.quantity}
                          </span>
                        )}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
};
