import { useState } from "react";

function List() {
  const [list, setList] = useState([
    { id: 0, task: "Do HW", completed: false },
    { id: 1, task: "go to gym", completed: false },
    { id: 2, task: "put gas in the car", completed: true },
  ]);

  function addHandler() {
    setList([...list, { id: 3, task: "put gas in the car", completed: true }]);
    console.log(list);
  }

  const mappedItems = list.map((item) => {
    return <li key={item.id}>{item.task}</li>;
  });

  return (
    <>
      {mappedItems}
      <button
        className="add-btn"
        onClick={() => {
          addHandler();
        }}
      >
        Add +
      </button>
    </>
  );
}

export default List;
