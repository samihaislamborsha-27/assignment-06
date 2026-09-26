import Link from "next/link";

export default function WorkoutCard({ workout }) {
  return (
    <Link href={`/workout/${workout.id}`} className="workout-card">
      <div className="workout-image-wrap">
        <img
          src={workout.image}
          alt={workout.name}
          className="workout-image"
        />
      </div>

      <div className="workout-content">
        <div className="tags">
          {workout.muscleGroups?.map((group) => (
            <span className="tag" key={group}>
              {group.toUpperCase()}
            </span>
          ))}
        </div>

        <h3>{workout.name.toUpperCase()}</h3>

        <p className="equipment">↗ {workout.equipment}</p>

        <div className="stats-row">
          <span>◷ {workout.duration} min</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
          <span>★ {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}