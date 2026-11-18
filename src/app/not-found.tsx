import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-x max-w-xl text-center">
        <p className="font-heading text-7xl font-extrabold text-nature">404</p>
        <h1 className="mt-2 text-3xl font-extrabold text-forest">This path leads nowhere.</h1>
        <p className="mt-3">The page you are looking for does not exist or has moved.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">Back to home</Link>
          <Link href="/sdgs" className="btn-outline">Explore the SDGs</Link>
        </div>
      </div>
    </section>
  );
}
