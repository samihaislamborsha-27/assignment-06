import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <Link
          href="/"
          className="footer-brand"
        >
          <Image
            src={logo}
            alt="FitLog"
            width={34}
            height={34}
          />

          <span>FITLOG</span>
        </Link>

        <p>
          © 2026 FitLog — Workout Library. Train hard,
          log honest.
        </p>
      </div>
    </footer>
  );
}