import { useState } from "react";
import logo from "./logo.svg";
import List from "./List";
import "./App.css";

function App() {
  const [remaining, setRemaining] = useState(0);
  function getRemaining(childData) {
    setRemaining(childData);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1> ToDo: {remaining} Items Remaining</h1>
      </header>
      <List getRemaining={getRemaining} />
    </div>
  );
}

export default App;
