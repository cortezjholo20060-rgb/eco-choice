"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="section">
      <div className="container-x max-w-xl text-center">
        <h1 className="text-3xl font-extrabold text-forest">Something went wrong.</h1>
        <p className="mt-3">An unexpected error occurred. Please try again.</p>
        <button type="button" onClick={reset} className="btn-primary mt-6">Try again</button>
      </div>
    </section>
  );
}
