'use client';
import { useState } from 'react';
import { CopyIcon, CheckIcon } from '@phosphor-icons/react';
import type { Locale } from '@/lib/i18n';
import { identity } from '@/content/site';

export function CopyEmail({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  async function copy() {
    try {
      await navigator.clipboard.writeText(identity.email);
      setStatus('copied');
    } catch {
      setStatus('error');
    }
  }
  return (
    <div className="copy-email">
      <button className="text-link" onClick={copy}>
        {status === 'copied' ? <CheckIcon size={19} /> : <CopyIcon size={19} />}{' '}
        {locale === 'id' ? 'Salin Alamat Email' : 'Copy Email Address'}
      </button>
      <span role="status">
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
    </div>
  );
}
