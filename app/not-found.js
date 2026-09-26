import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <p className="error-code">404</p>

      <h1>PAGE NOT FOUND</h1>

      <p>Looks like this workout wandered off the rack.</p>

      <Link href="/" className="primary-btn">
        BACK TO HOME
      </Link>
    </section>
  );
}