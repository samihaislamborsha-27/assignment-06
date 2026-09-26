"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FitLogContext = createContext(null);

export function FitLogProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [toast, setToast] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = JSON.parse(
        localStorage.getItem("fitlog-plan") || "[]"
      );

      const storedSaved = JSON.parse(
        localStorage.getItem("fitlog-saved") || "[]"
      );

      setPlan(storedPlan);
      setSaved(storedSaved);
    } catch {
      setPlan([]);
      setSaved([]);
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    }
  }, [plan, loaded]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    }
  }, [saved, loaded]);

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const addToPlan = (workout) => {
    if (plan.some((item) => item.id === workout.id)) {
      showToast("Workout is already in today's plan");
      return;
    }

    if (plan.length >= 5) {
      showToast("Today's plan can contain a maximum of 5 lifts");
      return;
    }

    setPlan((prev) => [...prev, { ...workout, done: false }]);
    showToast("Added to today's plan");
  };

  const saveWorkout = (workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      showToast("Workout is already saved");
      return;
    }

    setSaved((prev) => [...prev, workout]);
    showToast("Saved for later");
  };

  const removeFromPlan = (id) => {
    setPlan((prev) => prev.filter((item) => item.id !== id));
    showToast("Workout removed");
  };

  const removeFromSaved = (id) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
    showToast("Saved workout removed");
  };

  const markAsDone = (id) => {
    setPlan((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );

    showToast("Workout status updated");
  };

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        loaded,
        addToPlan,
        saveWorkout,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}

      {toast && <div className="fitlog-toast">{toast}</div>}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error("useFitLog must be used inside FitLogProvider");
  }

  return context;
}