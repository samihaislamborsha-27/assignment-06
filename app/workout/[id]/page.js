"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Loading from "../../../components/Loading";
import { useFitLog } from "../../../context/FitLogContext";

export default function WorkoutDetails() {
  const params = useParams();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    plan,
    saved,
    addToPlan,
    saveWorkout,
  } = useFitLog();

  useEffect(() => {
    if (!params?.id) {
      return;
    }

    async function getWorkout() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${params.id}`
        );

        if (!response.ok) {
          throw new Error("Workout not found");
        }

        const result = await response.json();

        setWorkout(result.data || result);
      } catch (error) {
        console.error(error);
        setError("Workout could not be found.");
      } finally {
        setLoading(false);
      }
    }

    getWorkout();
  }, [params?.id]);

  if (loading) {
    return (
      <Loading text="Loading workout…" />
    );
  }

  if (error || !workout) {
    return (
      <section className="not-found">
        <h1>WORKOUT NOT FOUND</h1>

        <p>
          The requested workout could not be loaded.
        </p>

        <Link
          href="/#library"
          className="primary-btn"
        >
          GO TO WORKOUTS
        </Link>
      </section>
    );
  }

  const alreadyPlanned = plan.some(
    (item) => item.id === workout.id
  );

  const alreadySaved = saved.some(
    (item) => item.id === workout.id
  );

  const planFull =
    plan.length >= 5 && !alreadyPlanned;

  return (
    <section className="details-page">
      <div className="container">
        <Link
          href="/#library"
          className="back-link"
        >
          ← BACK TO LIBRARY
        </Link>

        <div className="details-grid">
          <div className="details-image-side">
            <img
              src={workout.image}
              alt={workout.name}
              className="details-image"
            />
          </div>

          <div className="details-content">
            <div className="tags">
              {workout.muscleGroups?.map(
                (group) => (
                  <span
                    className="tag"
                    key={group}
                  >
                    {group.toUpperCase()}
                  </span>
                )
              )}
            </div>

            <h1>
              {workout.name.toUpperCase()}
            </h1>

            <p className="details-description">
              {workout.description}
            </p>

            <div className="spec-section">
              <p className="eyebrow">
                KEY SPECS
              </p>

              <div className="spec-grid">
                <div className="spec-item">
                  <span>EQUIPMENT</span>
                  <strong>
                    {workout.equipment}
                  </strong>
                </div>

                <div className="spec-item">
                  <span>DIFFICULTY</span>
                  <strong>
                    {workout.difficulty}
                  </strong>
                </div>

                <div className="spec-item">
                  <span>SETS</span>
                  <strong>
                    {workout.sets}
                  </strong>
                </div>

                <div className="spec-item">
                  <span>REPS</span>
                  <strong>
                    {workout.reps}
                  </strong>
                </div>

                <div className="spec-item">
                  <span>DURATION</span>
                  <strong>
                    {workout.duration} min
                  </strong>
                </div>

                <div className="spec-item">
                  <span>CALORIES</span>
                  <strong>
                    {workout.caloriesBurned} kcal
                  </strong>
                </div>

                <div className="spec-item">
                  <span>RATING</span>
                  <strong>
                    ★ {workout.rating}
                  </strong>
                </div>
              </div>
            </div>

            <div className="instructions">
              <p className="eyebrow">
                INSTRUCTIONS
              </p>

              <ol>
                {workout.instructions?.map(
                  (instruction, index) => (
                    <li key={index}>
                      <span>
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>

                      <p>{instruction}</p>
                    </li>
                  )
                )}
              </ol>
            </div>

            <div className="details-actions">
              <button
                type="button"
                className="primary-btn"
                onClick={() =>
                  addToPlan(workout)
                }
                disabled={
                  alreadyPlanned || planFull
                }
              >
                {alreadyPlanned
                  ? "IN TODAY'S PLAN"
                  : planFull
                  ? "PLAN FULL"
                  : "ADD TO TODAY'S PLAN"}
              </button>

              <button
                type="button"
                className="secondary-btn"
                onClick={() =>
                  saveWorkout(workout)
                }
                disabled={alreadySaved}
              >
                {alreadySaved
                  ? "SAVED"
                  : "SAVE FOR LATER"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}