import { useState, useId } from "react";
import "./List.css";

function List() {
  const [list, setList] = useState([
    { id: 0, task: "Do HW", completed: false },
    { id: 1, task: "go to gym", completed: true },
    { id: 2, task: "put gas in the car", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");
  const [status, setStatus] = useState(false);

  function getKey() {
    return list[list.length - 1].id + 1;
  }
  function getInput() {}

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

    console.log(list);
    setNewTask("");
  }
  function handleComplete(val) {
    var temp = list;
    const location = list.findIndex((x) => x.id === val.id);
    console.log(location);
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
      <>
        <li key={item.id} className={item.completed ? "completed" : ""}>
          {item.task}
          <input
            type="checkbox"
            defaultChecked={item.completed}
            onChange={(e) => {
              handleComplete(item);
            }}
          />
        </li>
      </>
    );
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <button type="submit">Add +</button>
      </form>
      <div className="tasks-block">{mappedItems}</div>
    </>
  );
}

export default List;
