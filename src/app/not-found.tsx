import Link from "next/link";
import { defaultLocale } from "@/lib/i18n/config";

export default function NotFound() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <main className="foundation-page" id="main-content" tabIndex={-1}>
        <p className="foundation-label">404</p>
        <h1>Page not found</h1>
        <p className="foundation-status">
          The requested page is unavailable.
        </p>
        <Link className="recovery-link" href={`/${defaultLocale}`}>
          Return to home
        </Link>
      </main>
    </>
  );
}
