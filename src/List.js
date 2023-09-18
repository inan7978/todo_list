import { useState, useId } from "react";

function List() {
  const taskId = useId();
  const [list, setList] = useState([
    { id: 0, task: "Do HW", completed: false },
    { id: 1, task: "go to gym", completed: false },
    { id: 2, task: "put gas in the car", completed: true },
  ]);

  function getKey() {
    return list[list.length - 1].id + 1;
  }

  function addHandler(e) {
    e.preventDefault();
    setList([
      ...list,
      {
        id: getKey(),
        task: "ttt",
        completed: true,
      },
    ]);
    console.log(list);
  }

  const mappedItems = list.map((item) => {
    return <li key={item.id}>{item.task}</li>;
  });

  return (
    <>
      {mappedItems}
      <span>
        <form onSubmit={addHandler}>
          <label>
            <input name="taskAdd" type="text" placeholder="Enter task here" />
          </label>
          <button type="submit" className="add-btn">
            Add +
          </button>
        </form>
      </span>
    </>
  );
}

export default List;
