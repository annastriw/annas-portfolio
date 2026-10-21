'use client';
import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRightIcon, CaretDownIcon } from '@phosphor-icons/react';
import type { Locale } from '@/lib/i18n';
type Capability = { title: string; description: string; tools: string[] };
export function CapabilityExplorer({ items, locale }: { items: Capability[]; locale: Locale }) {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const group = tabs.current;
    if (!group) return;
    let mounted = true;
    const measure = () => {
      if (!mounted) return;
      const tab = group.querySelector<HTMLElement>('[aria-selected="true"]');
      if (!tab || !group.offsetHeight) return;
      group.style.setProperty('--capability-y', `${tab.offsetTop}px`);
      group.style.setProperty('--capability-height', `${tab.offsetHeight}px`);
      group.dataset.indicatorReady = 'true';
    };
    measure();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    observer?.observe(group);
    if (!observer) window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => {
      mounted = false;
      observer?.disconnect();
      if (!observer) window.removeEventListener('resize', measure);
    };
  }, [selected]);
  return (
    <>
      <div className="capability-explorer" data-scene="capability">
        <div
          className="capability-index"
          role="tablist"
          aria-orientation="vertical"
          aria-label={locale === 'id' ? 'Bidang keahlian' : 'Areas of expertise'}
          ref={tabs}
        >
          <span className="capability-indicator" aria-hidden="true" />
          {items.map((item, i) => (
            <button
              key={item.title}
              id={`capability-tab-${i}`}
              role="tab"
              aria-selected={selected === i}
              tabIndex={selected === i ? 0 : -1}
              aria-controls={`capability-panel-${i}`}
              onClick={() => setSelected(i)}
              onKeyDown={(event) => {
                const next =
                  event.key === 'ArrowDown'
                    ? (i + 1) % items.length
                    : event.key === 'ArrowUp'
                      ? (i + items.length - 1) % items.length
                      : event.key === 'Home'
                        ? 0
                        : event.key === 'End'
                          ? items.length - 1
                          : null;
                if (next !== null) {
                  event.preventDefault();
                  setSelected(next);
                  tabs.current?.querySelectorAll<HTMLButtonElement>('button')[next]?.focus();
                }
              }}
            >
              <span className="capability-number">0{i + 1}</span>
              <span>{item.title}</span>
              <ArrowUpRightIcon size={21} aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="capability-stage">
          {items.map((item, i) => (
            <section
              key={item.title}
              className="capability-panel"
              role="tabpanel"
              id={`capability-panel-${i}`}
              aria-labelledby={`capability-tab-${i}`}
              data-active={i === selected}
              aria-hidden={i !== selected}
              inert={i !== selected}
              tabIndex={i === selected ? 0 : -1}
            >
              <h3>{item.title}</h3>
              <p className="capability-description">{item.description}</p>
              <ul
                className="capability-tools"
                aria-label={
                  locale === 'id' ? 'Teknologi dan pendekatan' : 'Technologies and approaches'
                }
              >
                {item.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
      <div className="capability-mobile">
        {items.map((item, i) => (
          <details
            className="capability-disclosure"
            data-scene="disclosure"
            key={item.title}
            onKeyDown={(event) => {
              if (event.key === 'Escape' && event.currentTarget.open) {
                event.preventDefault();
                event.currentTarget.open = false;
                event.currentTarget.querySelector('summary')?.focus({ preventScroll: true });
              }
            }}
          >
            <summary>
              <span className="capability-number">0{i + 1}</span>
              <span>{item.title}</span>
              <CaretDownIcon size={20} aria-hidden="true" />
            </summary>
            <div className="capability-panel">
              <p className="capability-description">{item.description}</p>
              <ul
                className="capability-tools"
                aria-label={
                  locale === 'id' ? 'Teknologi dan pendekatan' : 'Technologies and approaches'
                }
              >
                {item.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
      <noscript>
        <style>{`.capability-explorer{display:none}.capability-mobile{display:block}
          .capability-disclosure summary{padding:16px 0}
          .capability-disclosure .capability-panel{min-height:0;padding:12px 0 24px}`}</style>
      </noscript>
    </>
  );
}
