import { useState } from "react";
import "./List.css";

function List({ getRemaining }) {
  const [list, setList] = useState([
    { id: 0, task: "Do HW", completed: false },
    { id: 1, task: "go to gym", completed: true },
    { id: 2, task: "put gas in the car", completed: false },
  ]);

  getRemaining(list.length);

  const [newTask, setNewTask] = useState("");

  function getKey() {
    return list[list.length - 1].id + 1;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (newTask.length > 0) {
      setList([
        ...list,
        {
          id: getKey(),
          task: newTask,
          completed: false,
        },
      ]);
    }
    setNewTask("");
  }

  function handleDelete(val) {
    if (list.length <= 1) {
      setList([{ id: 0, task: "Add a task...", completed: false }]);
    } else {
      const result = list.filter((item) => {
        return item.id !== val.id;
      });
      setList([...result]);
    }
  }
  function handleComplete(val) {
    const temp = list;
    const location = temp.findIndex((x) => x.id === val.id);
    temp[location] = {
      id: val.id,
      task: val.task,
      completed: !val.completed,
    };
    setList([...temp]); // cannot just be temp as react wont see it as a new array, even if a value in it has changed
    // use the spread operator as it creates a new array, even though the value are the same as the "old" one
  }

  // useEffect(() => {}, [list]);

  const mappedItems = list.map((item) => {
    return (
      <li key={item.id} className="task-container">
        <input
          type="checkbox"
          defaultChecked={item.completed}
          onChange={(e) => {
            handleComplete(item);
          }}
        />
        <span className={item.completed ? "completed task-text" : "task-text"}>
          {item.task}
        </span>
        <div className="del-btn-container">
          <button
            onClick={() => {
              handleDelete(item);
            }}
          >
            Delete
          </button>
        </div>
      </li>
    );
  });

  return (
    <>
      <form onSubmit={handleSubmit} className="new-task-field">
        <input
          className={"new-task-text"}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className={"new-task-button"} type="submit">
          +
        </button>
      </form>
      <div className="all-tasks-container">{mappedItems}</div>
      {/* <button onClick={() => console.log(list)}>View list in console</button> */}
    </>
  );
}

export default List;
