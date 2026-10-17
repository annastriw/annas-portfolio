'use client';
import { useRef, useState } from 'react';
import { ArrowUpRightIcon, CaretDownIcon } from '@phosphor-icons/react';
import type { Locale } from '@/lib/i18n';
type Capability = { title: string; description: string; tools: string[] };
export function CapabilityExplorer({ items, locale }: { items: Capability[]; locale: Locale }) {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<HTMLDivElement>(null);
  return (
    <>
      <div className="capability-explorer">
        <div
          className="capability-index"
          role="tablist"
          aria-orientation="vertical"
          aria-label={locale === 'id' ? 'Bidang keahlian' : 'Areas of expertise'}
          ref={tabs}
        >
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
              hidden={i !== selected}
              tabIndex={0}
            >
              <div className="capability-panel-top">
                <span className="eyebrow">
                  {locale === 'id'
                    ? 'Dari pemahaman ke penerapan'
                    : 'From understanding to implementation'}
                </span>
                <span className="capability-large-number" aria-hidden="true">
                  0{i + 1}
                </span>
              </div>
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
          <details className="capability-disclosure" key={item.title}>
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
    </>
  );
}
