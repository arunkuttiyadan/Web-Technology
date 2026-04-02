import React from "react";
import StudentCard from "./StudentCard";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Student Cards</h1>

      {/* Passing different data using props */}
      <StudentCard name="Arun K" department="CSE" marks="85" />
      <StudentCard name="Rahul M" department="ECE" marks="90" />
      <StudentCard name="Anjali P" department="IT" marks="88" />
    </div>
  );
}

export default App;