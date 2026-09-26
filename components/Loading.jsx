export default function Loading({ text = "Loading workouts…" }) {
  return (
    <div className="loading-box">
      <div className="loader"></div>
      <p>{text}</p>
    </div>
  );
}