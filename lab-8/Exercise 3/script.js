
class Course {
  constructor(courseName, instructor) {
    this.courseName = courseName;
    this.instructor = instructor;
  }


  displayCourse() {
    return `Course: ${this.courseName}, Instructor: ${this.instructor}`;
  }
}

function checkSeatAvailabilitySimulated() {
  return new Promise((resolve, reject) => {
    
    const delayMs = 1500 + Math.floor(Math.random() * 1500); 
    setTimeout(() => {
      const seatsAvailable = Math.random() > 0.4; 
      if (seatsAvailable) resolve("Enrollment Successful");
      else reject("Course Full");
    }, delayMs);
  });
}


function enrollHandler() {
  const courseName = document.getElementById("courseName").value.trim() || "Web Technologies";
  const instructor = document.getElementById("instructor").value.trim() || "Dr. Kumar";
  const statusEl = document.getElementById("status");
  const outputEl = document.getElementById("output");


  const course = new Course(courseName, instructor);

 
  statusEl.textContent = "Checking seat availability...";
  outputEl.textContent = course.displayCourse();

 
  checkSeatAvailabilitySimulated()
    .then(msg => {
      statusEl.textContent = ""; 
      outputEl.textContent = `${course.displayCourse()}\n${msg}`;
      console.log(course.displayCourse());
      console.log(msg);
    })
    .catch(err => {
      statusEl.textContent = "";
      outputEl.textContent = `${course.displayCourse()}\n${err}`;
      console.log(course.displayCourse());
      console.log(err);
    });
}


document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("enrollBtn");
  btn.addEventListener("click", enrollHandler);
});