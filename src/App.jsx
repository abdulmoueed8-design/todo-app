import { useState } from "react";
import "./App.css";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask() {
    const cleanTask = task.trim();
    if (!cleanTask) return;

    setTasks((current) => [
      ...current,
      { id: Date.now(), text: cleanTask, completed: false },
    ]);
    setTask("");
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((item) => item.id !== id));
  }

  const completedCount = tasks.filter((item) => item.completed).length;

  return (
    <main className="page">
      <section className="todo-card">
        <div className="app-icon" aria-hidden="true">✓</div>
        <p className="eyebrow">YOUR DAILY PLANNER</p>
        <h1>My Todo List</h1>
        <p className="subtitle">Small steps make a big difference.</p>

        <form
          className="task-form"
          onSubmit={(event) => {
            event.preventDefault();
            addTask();
          }}
        >
          <input
            type="text"
            value={task}
            onChange={(event) => setTask(event.target.value)}
            placeholder="What do you need to do?"
            aria-label="New task"
          />
          <button type="submit">Add task</button>
        </form>

        <div className="list-heading">
          <h2>Your tasks</h2>
          <span className="count">{tasks.length} total</span>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <span aria-hidden="true">📝</span>
            <p>No tasks yet</p>
            <small>Add your first task above to get started.</small>
          </div>
        ) : (
          <ul className="task-list">
            {tasks.map((item) => (
              <li className="task-item" key={item.id}>
                <label className="task-label">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleTask(item.id)}
                  />
                  <span className={item.completed ? "task-text completed" : "task-text"}>
                    {item.text}
                  </span>
                </label>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => deleteTask(item.id)}
                  aria-label={`Delete ${item.text}`}
                  title="Delete task"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        <footer>
          <span>{completedCount} completed</span>
          <span>{tasks.length - completedCount} remaining</span>
        </footer>
      </section>
      <p className="credit">Built with React ⚛️</p>
    </main>
  );
}