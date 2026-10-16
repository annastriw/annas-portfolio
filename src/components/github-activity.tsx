import snapshot from '@/content/github.json';
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr';
import { identity } from '@/content/site';
import type { Locale } from '@/lib/i18n';

export function GitHubActivity({ locale }: { locale: Locale }) {
  const days = snapshot.days as { date: string; level: number }[];
  const events = snapshot.events as { type: string; repo: string; date: string; url: string }[];
  return (
    <section className="section container github-section" aria-labelledby="github-heading">
      <div className="section-label">
        <span className="eyebrow">04 / GitHub</span>
        <span className="eyebrow">@annastriw</span>
      </div>
      <div className="section-intro">
        <h2 id="github-heading">{locale === 'id' ? 'Di balik layar.' : 'Behind the work.'}</h2>
        <div>
          <p>
            {locale === 'id'
              ? 'Kode, eksperimen, dan proses belajar yang terus berjalan.'
              : 'Code, experiments, and an ongoing learning process.'}
          </p>
          <a className="text-link" href={identity.github} target="_blank" rel="noreferrer">
            {locale === 'id' ? 'Lihat di GitHub' : 'View on GitHub'} <ArrowUpRightIcon size={20} />
          </a>
        </div>
      </div>
      {days.length > 0 ? (
        <>
          <div
            className="contribution-scroll"
            role="img"
            aria-label={
              locale === 'id'
                ? 'Grafik aktivitas kontribusi GitHub setahun terakhir. Detail tersedia di profil GitHub.'
                : 'GitHub contribution activity for the last year. Details available on the GitHub profile.'
            }
          >
            <div className="contribution-grid" aria-hidden="true">
              {Array.from({ length: new Date(`${days[0].date}T12:00:00Z`).getUTCDay() }, (_, i) => (
                <span key={`empty${i}`} className="contribution-empty" />
              ))}
              {days.map((day) => (
                <span
                  key={day.date}
                  data-level={day.level}
                  title={`${day.date} · ${locale === 'id' ? 'tingkat aktivitas' : 'activity level'} ${day.level}/4`}
                />
              ))}
            </div>
          </div>
          <div className="github-legend">
            <p>
              {locale === 'id'
                ? 'Kontribusi publik & privat yang ditampilkan GitHub.'
                : 'Public & private contributions displayed by GitHub.'}
            </p>
            <span>
              {locale === 'id' ? 'Sedikit' : 'Less'}
              <i data-level="0" />
              <i data-level="1" />
              <i data-level="2" />
              <i data-level="3" />
              <i data-level="4" />
              {locale === 'id' ? 'Banyak' : 'More'}
            </span>
          </div>
        </>
      ) : (
        <p className="github-fallback">
          {locale === 'id'
            ? 'Aktivitas terbaru dapat dilihat langsung di profil GitHub saya.'
            : 'Visit my GitHub profile to see the latest activity.'}
        </p>
      )}
      {events.length > 0 && (
        <div className="github-events">
          {events.map((event, i) => (
            <a key={`${event.date}-${i}`} href={event.url} target="_blank" rel="noreferrer">
              <span className="eyebrow">
                {new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  timeZone: 'Asia/Jakarta',
                }).format(new Date(event.date))}
              </span>
              <span>{event.repo}</span>
              <ArrowUpRightIcon size={16} />
            </a>
          ))}
        </div>
      )}
      {snapshot.updatedAt && (
        <p className="snapshot-note">
          {locale === 'id' ? 'Diperbarui saat build' : 'Updated at build'} ·{' '}
          {new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'Asia/Jakarta',
          }).format(new Date(snapshot.updatedAt))}
        </p>
      )}
    </section>
  );
}
