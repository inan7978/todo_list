import { useState, useEffect } from "react";
import "./List.css";

function List({ getRemaining }) {
  const [list, setList] = useState([
    { id: 0, task: "Do homework", completed: false },
    { id: 1, task: "Go to the gym", completed: true },
    { id: 2, task: "Put gas in the car", completed: false },
  ]);
  const [doneList, setDoneList] = useState([]);
  const [newTask, setNewTask] = useState("");

  var counter = 0;
  list.filter((item) => {
    return item.completed === false && counter++;
  });

  console.log(counter);

  useEffect(() => {
    getRemaining(counter);
  });

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
    setDoneList([...doneList], val);
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
  const mappedItems = list.map((item) => {
    return (
      <li
        key={item.id}
        className={
          item.completed ? "task-container-completed" : "task-container"
        }
      >
        <div className="checkbox-container">
          <input
            className="checkbox"
            type="checkbox"
            defaultChecked={item.completed}
            onChange={(e) => {
              handleComplete(item);
            }}
          />
        </div>
        <div className="text-container">
          <span className="task-text">{item.task}</span>
        </div>
        <div className="del-btn-container">
          <button
            className="del-btn"
            onClick={() => {
              handleDelete(item);
            }}
          >
            X
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
