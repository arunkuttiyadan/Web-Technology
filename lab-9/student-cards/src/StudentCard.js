import React from "react";

function StudentCard(props) {
  return (
    <div style={{
      border: "1px solid black",
      padding: "15px",
      margin: "10px",
      width: "250px",
      borderRadius: "10px"
    }}>
      <h3>Student Card</h3>

      <p><b>Name:</b> {props.name}</p>
      <p><b>Department:</b> {props.department}</p>
      <p><b>Marks:</b> {props.marks}</p>
    </div>
  );
}

export default StudentCard;