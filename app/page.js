"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import banner from "../assets/banner.png";
import WorkoutCard from "../components/WorkoutCard";
import Loading from "../components/Loading";

const API = "https://api.abcz.workers.dev/api/fitlog";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("duration");
  const [error, setError] = useState("");

  useEffect(() => {
    async function getWorkouts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API);

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const result = await response.json();

        const workoutData = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
          ? result.data
          : [];

        setWorkouts(workoutData);
      } catch (error) {
        console.error(error);
        setError("Unable to load workouts.");
      } finally {
        setLoading(false);
      }
    }

    getWorkouts();
  }, []);

  const sortedWorkouts = useMemo(() => {
    const list = [...workouts];

    if (sortBy === "duration") {
      return list.sort(
        (a, b) => Number(a.duration) - Number(b.duration)
      );
    }

    if (sortBy === "calories") {
      return list.sort(
        (a, b) =>
          Number(b.caloriesBurned) -
          Number(a.caloriesBurned)
      );
    }

    if (sortBy === "rating") {
      return list.sort(
        (a, b) => Number(b.rating) - Number(a.rating)
      );
    }

    return list;
  }, [workouts, sortBy]);

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              WORKOUT LIBRARY
            </p>

            <h1>
              TRAIN WITH INTENT.
              <br />
              LOG EVERY SET.
            </h1>

            <p className="hero-description">
              FitLog is a dark, no-nonsense gym companion:
              pick a lift, lock it into today&apos;s plan,
              and watch the week&apos;s work add up.
            </p>

            <a
              href="#library"
              className="primary-btn"
            >
              ↓ BROWSE WORKOUTS
            </a>
          </div>

          <div className="hero-visual">
            <Image
              src={banner}
              alt="FitLog workout"
              priority
              className="hero-image"
            />

            <div className="hero-stamp">
              <strong>12</strong>
              <span>LIFTS</span>
            </div>
          </div>
        </div>
      </section>

      {/* WORKOUT LIBRARY */}
      <section
        id="library"
        className="library-section"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                WORKOUTS
              </p>

              <h2>THE LIBRARY</h2>

              <p>
                Twelve lifts covering every major
                muscle group.
              </p>
            </div>

            <div className="sort-box">
              <label htmlFor="sort">
                SORT BY
              </label>

              <select
                id="sort"
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value)
                }
              >
                <option value="duration">
                  Duration
                </option>

                <option value="calories">
                  Calories
                </option>

                <option value="rating">
                  Rating
                </option>
              </select>
            </div>
          </div>

          {/* LOADING */}
          {loading && <Loading />}

          {/* ERROR */}
          {!loading && error && (
            <div className="error-state">
              {error}
            </div>
          )}

          {/* WORKOUT CARDS */}
          {!loading && !error && (
            <div className="workout-grid">
              {sortedWorkouts.map(
                (workout) => (
                  <WorkoutCard
                    key={workout.id}
                    workout={workout}
                  />
                )
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}