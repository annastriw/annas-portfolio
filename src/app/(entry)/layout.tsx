import '../globals.css';
import '../motion.css';
import { entryBootstrap } from '@/lib/opening';
export default function EntryLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="system" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem('portfolio-theme');if(['light','dark','system'].includes(t))document.documentElement.dataset.theme=t}catch{}`,
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: entryBootstrap }} />
        <link
          rel="preload"
          href="/assets/fonts/instrument-serif.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
