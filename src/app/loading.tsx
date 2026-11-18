export default function Loading() {
  return (
    <div className="container-x py-24 text-center" role="status" aria-live="polite">
      <span className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-sage border-t-forest" aria-hidden="true" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
