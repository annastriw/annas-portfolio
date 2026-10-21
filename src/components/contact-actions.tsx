'use client';
import { useEffect, useState } from 'react';
import { CopyIcon, CheckIcon } from '@phosphor-icons/react';
import type { Locale } from '@/lib/i18n';
import { identity } from '@/content/site';
import { createCopyFeedback, type CopyStatus } from '@/lib/copy-feedback';

export function CopyEmail({ locale }: { locale: Locale }) {
  const [{ status, attempt }, setFeedback] = useState<{ status: CopyStatus; attempt: number }>({
    status: 'idle',
    attempt: 0,
  });
  const [controller] = useState(() =>
    createCopyFeedback(
      () => navigator.clipboard.writeText(identity.email),
      (status, attempt) => setFeedback({ status, attempt }),
    ),
  );
  useEffect(() => () => controller.cancel(), [controller]);
  return (
    <div className="copy-email" data-copy-state={status}>
      <button className="text-link" onClick={() => void controller.copy()}>
        <span className="copy-icon" aria-hidden="true">
          <CopyIcon data-motion-icon="status" data-copy-glyph="copy" size={19} />
          <CheckIcon data-motion-icon="status" data-copy-glyph="check" size={19} />
        </span>
        {locale === 'id' ? 'Salin Alamat Email' : 'Copy Email Address'}
      </button>
      <span role="status" aria-atomic="true">
        <span className="copy-message" key={attempt}>
          {status === 'copied'
            ? locale === 'id'
              ? 'Alamat email disalin.'
              : 'Email address copied.'
            : status === 'error'
              ? locale === 'id'
                ? 'Silakan pilih dan salin alamat email di atas.'
                : 'Please select and copy the email address above.'
              : ''}
        </span>
      </span>
    </div>
  );
}
