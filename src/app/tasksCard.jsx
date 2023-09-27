export function TaskCard({ task }) {
  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <label className="label">
        Realizada
        <input type="checkbox" defaultChecked={task.completed} />
      </label>
    </div>
  );
}
