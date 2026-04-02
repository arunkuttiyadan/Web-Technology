import React from "react";

function StudentProfile() {
  // Storing student details in variables
  const name = "Arun K";
  const department = "Computer Science";
  const year = "3rd Year";
  const section = "A";

  return (
    <div>
      <h2>Student Profile</h2>

      <p><b>Name:</b> {name}</p>
      <p><b>Department:</b> {department}</p>
      <p><b>Year:</b> {year}</p>
      <p><b>Section:</b> {section}</p>
    </div>
  );
}

export default StudentProfile;