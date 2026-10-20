import { Fragment, type CSSProperties } from 'react';

/** Server-rendered words retain natural spaces, wrapping and accessible heading text. */
export function MotionWords({ text }: { text: string }) {
  const words = text.split(' ');
  return words.map((word, index) => (
    <Fragment key={index}>
      <span
        className="motion-word"
        style={{ '--word-order': index / words.length } as CSSProperties}
      >
        <span className="motion-word-inner">{word}</span>
      </span>
      {index < words.length - 1 ? ' ' : null}
    </Fragment>
  ));
}
