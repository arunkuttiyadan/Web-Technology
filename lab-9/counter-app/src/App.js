import React, { useState } from "react";

function App() {
  
  const [count, setCount] = useState(0);

 
  const increment = () => {
    setCount(count + 1);
  };

  
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Counter Application</h2>

      
      <h1>{count}</h1>

      
      <button onClick={increment}>Increase</button>
      <button onClick={decrement}>Decrease</button>
    </div>
  );
}

export default App;