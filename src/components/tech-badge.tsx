import Image from 'next/image';
import { CodeIcon } from '@phosphor-icons/react/dist/ssr';
import { technologyIcons } from '@/content/technologies';
import sources from '@/content/icon-sources.json';

export function TechBadge({ name }: { name: string }) {
  const slug = technologyIcons[name];
  const source = slug ? (sources as Record<string, { mono: boolean }>)[slug] : undefined;
  return (
    <span className="tech-badge">
      {source ? (
        <Image
          className={source.mono ? 'tech-icon tech-icon-mono' : 'tech-icon'}
          src={`/assets/icons/${slug}.svg`}
          width={24}
          height={24}
          alt=""
        />
      ) : (
        <CodeIcon className="tech-icon" size={24} aria-hidden="true" />
      )}
      <span>{name}</span>
    </span>
  );
}
