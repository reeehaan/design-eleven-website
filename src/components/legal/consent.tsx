"use client";

import Link from "next/link";
import Script from "next/script";
import { useSyncExternalStore } from "react";

const KEY = "de-consent";
const EVENT = "de-consent-change";

type Choice = "accepted" | "declined" | null;

function read(): Choice {
  try {
    const v = localStorage.getItem(KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

function useConsent(): Choice | undefined {
  // undefined on the server, so nothing flashes before the real value is known.
  return useSyncExternalStore<Choice | undefined>(
    subscribe,
    read,
    () => undefined,
  );
}

function save(v: Exclude<Choice, null>) {
  try {
    localStorage.setItem(KEY, v);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

/**
 * Cookie notice and analytics gate. Analytics (Google Analytics 4, when an ID
 * is configured) loads only after "Accept"; "Decline" loads nothing. The site
 * itself sets no cookies, so the choice is the only thing stored.
 */
export function Consent() {
  const choice = useConsent();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {choice === "accepted" && gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {choice === null && (
        <div
          role="dialog"
          aria-label="Cookie notice"
          className="fixed inset-x-3 bottom-3 z-[150] border border-ink bg-paper p-4 text-ink md:left-auto md:max-w-md"
        >
          <p className="font-sans text-base font-semibold leading-[1.25]">
            We use cookies for anonymous analytics only if you say yes. The site
            works fully without them.{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-verdigris"
            >
              Privacy policy
            </Link>
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => save("accepted")}
              className="min-h-11 flex-1 bg-ink px-4 font-sans text-base font-semibold text-paper transition-colors hover:bg-verdigris"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => save("declined")}
              className="min-h-11 flex-1 border border-ink px-4 font-sans text-base font-semibold transition-colors hover:border-verdigris hover:text-verdigris"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
