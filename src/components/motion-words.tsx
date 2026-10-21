import { Fragment } from 'react';

/** Short phrase groups wrap naturally; clipping never depends on a measured line count. */
export function MotionWords({ text }: { text: string }) {
  const groups = text.match(/\S+(?:\s+\S+){0,2}/g) ?? [text];
  return groups.map((group, index) => (
    <Fragment key={index}>
      <span className="arrival-mask">
        <span className="arrival-inner">{group}</span>
      </span>
      {index < groups.length - 1 ? ' ' : null}
    </Fragment>
  ));
}
