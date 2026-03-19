import React, { useState, useEffect } from "react";
import CounterDisplay from "./CounterDisplay";
import CounterControls from "./CounterControls";

function CounterPage() {
  const [counter, setCounter] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setShowMessage(counter > 5);
  }, [counter]);

  useEffect(() => {
    if (counter < 0) {
      setCounter(0);
    }
  }, [counter]);

  function increment() {
    setCounter((prev) => prev + 1);
  }

  function decrement() {
    setCounter((prev) => prev - 1);
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Counter Page</h1>
      <CounterDisplay counter={counter} />
      <CounterControls increment={increment} decrement={decrement} />
      {showMessage && <p>You passed 5!</p>}
    </div>
  );
}

export default CounterPage;
