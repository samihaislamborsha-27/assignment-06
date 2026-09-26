"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Suspense,
  useEffect,
  useState,
} from "react";

import Loading from "../../components/Loading";
import { useFitLog } from "../../context/FitLogContext";

function PlanContent() {
  const searchParams = useSearchParams();

  const {
    plan,
    saved,
    loaded,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = useFitLog();

  const requestedTab =
    searchParams.get("tab");

  const [activeTab, setActiveTab] =
    useState(
      requestedTab === "saved"
        ? "saved"
        : "plan"
    );

  useEffect(() => {
    setActiveTab(
      requestedTab === "saved"
        ? "saved"
        : "plan"
    );
  }, [requestedTab]);

  if (!loaded) {
    return <Loading />;
  }

  const items =
    activeTab === "plan"
      ? plan
      : saved;

  const totalMinutes = plan.reduce(
    (total, item) =>
      total + Number(item.duration || 0),
    0
  );

  const totalCalories = plan.reduce(
    (total, item) =>
      total +
      Number(item.caloriesBurned || 0),
    0
  );

  return (
    <section className="plan-page">
      <div className="container">
        <div className="plan-header">
          <p className="eyebrow">
            YOUR WORKOUT
          </p>

          <h1>MY PLAN</h1>

          <p>
            Cap of five lifts for today.
            Finish them, then load more.
          </p>
        </div>

        <div className="metrics-grid">
          <div className="metric-card">
            <span>EXERCISES</span>
            <strong>{plan.length}</strong>
          </div>

          <div className="metric-card">
            <span>MINUTES</span>
            <strong>
              {totalMinutes}
            </strong>
          </div>

          <div className="metric-card">
            <span>CALORIES</span>
            <strong>
              {totalCalories}
            </strong>
          </div>
        </div>

        <div className="plan-tabs">
          <button
            type="button"
            className={
              activeTab === "plan"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("plan")
            }
          >
            TODAY&apos;S PLAN{" "}
            <span>{plan.length}</span>
          </button>

          <button
            type="button"
            className={
              activeTab === "saved"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("saved")
            }
          >
            SAVED{" "}
            <span>{saved.length}</span>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="empty-state">
            <h2>NOTHING HERE YET</h2>

            <p>
              Browse the library and add
              a lift to get today moving.
            </p>

            <Link
              href="/#library"
              className="primary-btn"
            >
              GO TO WORKOUTS
            </Link>
          </div>
        ) : (
          <div className="plan-list">
            {items.map((workout) => (
              <article
                key={workout.id}
                className={`plan-workout-card ${
                  workout.done
                    ? "done"
                    : ""
                }`}
              >
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="plan-thumbnail"
                />

                <div className="plan-card-info">
                  <h3>
                    {workout.name.toUpperCase()}
                  </h3>

                  <p className="equipment">
                    ↗ {workout.equipment}
                  </p>

                  <div className="stats-row">
                    <span>
                      ◷ {workout.duration} min
                    </span>

                    <span>
                      🔥{" "}
                      {workout.caloriesBurned}{" "}
                      kcal
                    </span>

                    <span>
                      ★ {workout.rating}
                    </span>
                  </div>
                </div>

                <div className="plan-card-actions">
                  <Link
                    href={`/workout/${workout.id}`}
                    className="small-outline-btn"
                  >
                    VIEW DETAILS
                  </Link>

                  {activeTab ===
                    "plan" && (
                    <button
                      type="button"
                      className="done-btn"
                      onClick={() =>
                        markAsDone(
                          workout.id
                        )
                      }
                    >
                      ✓{" "}
                      {workout.done
                        ? "DONE"
                        : "MARK AS DONE"}
                    </button>
                  )}

                  <button
                    type="button"
                    className="remove-btn"
                    aria-label="Remove workout"
                    onClick={() => {
                      if (
                        activeTab ===
                        "plan"
                      ) {
                        removeFromPlan(
                          workout.id
                        );
                      } else {
                        removeFromSaved(
                          workout.id
                        );
                      }
                    }}
                  >
                    ×
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PlanContent />
    </Suspense>
  );
}