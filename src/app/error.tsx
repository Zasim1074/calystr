"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="page-hero" role="alert">
      <div className="container">
        <span className="eyebrow">Something went wrong</span>
        <h1>We couldn’t load this page.</h1>
        <p>The interruption may be temporary. Try the request again.</p>
        <button className="button button-primary" type="button" onClick={reset}>Try again</button>
      </div>
    </section>
  );
}
