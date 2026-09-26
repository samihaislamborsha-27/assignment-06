"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "../context/FitLogContext";
import logo from "../assets/logo.png";

export default function Navbar() {
  const pathname = usePathname();

  const { plan, saved } = useFitLog();

  const workoutActive =
    pathname === "/" ||
    pathname.startsWith("/workout");

  const planActive =
    pathname === "/my-plan";

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link href="/" className="brand">
          <Image
            src={logo}
            alt="FitLog"
            width={38}
            height={38}
          />

          <span>FITLOG</span>
        </Link>

        <nav className="nav-links">
          <Link
            href="/#library"
            className={`nav-link ${
              workoutActive ? "active" : ""
            }`}
          >
            WORKOUT
          </Link>

          <Link
            href="/my-plan"
            className={`nav-link ${
              planActive ? "active" : ""
            }`}
          >
            MY PLAN
          </Link>
        </nav>

        <div className="nav-badges">
          <Link
            href="/my-plan"
            className="plan-badge"
          >
            PLAN <strong>{plan.length}</strong>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="saved-badge"
          >
            SAVED <strong>{saved.length}</strong>
          </Link>
        </div>
      </div>
    </header>
  );
}