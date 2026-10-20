'use client';
import { useId, useMemo, useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import type { ContributionDay } from '@/lib/github-contributions';
export function ContributionCalendar({
  days,
  locale,
}: {
  days: ContributionDay[];
  locale: Locale;
}) {
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<'pointer' | 'keyboard' | null>('pointer');
  const tooltipId = useId();
  const [active, setActive] = useState(days.length - 1);
  const [tooltip, setTooltip] = useState<{ index: number; x: number; y: number } | null>(null);
  const labels = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    });
    return days.map((day) => {
      const count =
        day.count === null || day.count === undefined
          ? `${locale === 'id' ? 'Tingkat aktivitas' : 'Activity level'} ${day.level}/4`
          : locale === 'id'
            ? `${day.count} kontribusi`
            : `${day.count} contribution${day.count === 1 ? '' : 's'}`;
      return `${count} ${locale === 'id' ? 'pada' : 'on'} ${format.format(new Date(`${day.date}T12:00:00Z`))}`;
    });
  }, [days, locale]);
  function show(index: number, element: HTMLButtonElement) {
    if (!root.current) return;
    const parent = root.current.getBoundingClientRect(),
      cell = element.getBoundingClientRect();
    const next = {
      index,
      x: Math.max(112, Math.min(parent.width - 112, cell.left - parent.left + cell.width / 2)),
      y: cell.top - parent.top - 12,
    };
    setTooltip((current) =>
      current?.index === index &&
      Math.abs(current.x - next.x) < 0.5 &&
      Math.abs(current.y - next.y) < 0.5
        ? current
        : next,
    );
  }
  return (
    <div
      className="contribution-calendar"
      ref={root}
      onMouseLeave={() => {
        if (input.current === 'pointer') setTooltip(null);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          input.current = null;
          setTooltip(null);
        }
      }}
    >
      <div
        className="contribution-scroll"
        onScroll={(event) => {
          // Keyboard focus can scroll the calendar after onFocus has positioned its tooltip.
          const cell = event.currentTarget.querySelector<HTMLButtonElement>('button:focus-visible');
          if (cell && input.current === 'keyboard') {
            const view = event.currentTarget.getBoundingClientRect();
            const bounds = cell.getBoundingClientRect();
            const center = (bounds.left + bounds.right) / 2;
            if (center >= view.left && center <= view.right) {
              show(active, cell);
              return;
            }
          }
          setTooltip(null);
        }}
      >
        <div
          className="contribution-grid"
          role="group"
          aria-label={
            locale === 'id'
              ? 'Kontribusi GitHub per hari; gunakan tombol panah untuk menjelajah'
              : 'Daily GitHub contributions; use arrow keys to explore'
          }
        >
          {Array.from({ length: new Date(`${days[0].date}T12:00:00Z`).getUTCDay() }, (_, i) => (
            <span key={`empty${i}`} className="contribution-empty" />
          ))}
          {days.map((day, index) => (
            <button
              key={day.date}
              type="button"
              data-level={day.level}
              tabIndex={active === index ? 0 : -1}
              aria-label={labels[index]}
              aria-describedby={tooltip?.index === index ? tooltipId : undefined}
              onPointerEnter={(event) => {
                if (input.current === 'pointer') show(index, event.currentTarget);
              }}
              onPointerMove={(event) => {
                if (input.current !== 'pointer' || tooltip?.index !== index) {
                  input.current = 'pointer';
                  show(index, event.currentTarget);
                }
              }}
              onFocus={(event) => {
                input.current = 'keyboard';
                setActive(index);
                show(index, event.currentTarget);
              }}
              onBlur={() => {
                input.current = null;
                setTooltip(null);
              }}
              onClick={(event) => {
                input.current = 'pointer';
                show(index, event.currentTarget);
              }}
              onKeyDown={(event) => {
                const delta =
                  event.key === 'ArrowLeft'
                    ? -7
                    : event.key === 'ArrowRight'
                      ? 7
                      : event.key === 'ArrowUp'
                        ? -1
                        : event.key === 'ArrowDown'
                          ? 1
                          : 0;
                const next =
                  event.key === 'Home'
                    ? 0
                    : event.key === 'End'
                      ? days.length - 1
                      : delta
                        ? Math.min(days.length - 1, Math.max(0, index + delta))
                        : null;
                if (next !== null) {
                  event.preventDefault();
                  input.current = 'keyboard';
                  const cell = root.current?.querySelectorAll<HTMLButtonElement>(
                    '.contribution-grid button',
                  )[next];
                  cell?.focus({ preventScroll: false });
                  if (cell) show(next, cell);
                }
              }}
            />
          ))}
        </div>
      </div>
      {tooltip && (
        <div
          key={tooltip.index}
          className="contribution-tooltip"
          role="tooltip"
          id={tooltipId}
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {labels[tooltip.index]}
        </div>
      )}
    </div>
  );
}
