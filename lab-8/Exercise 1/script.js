// Arrow function to calculate total
const calculateTotal = (m1, m2, m3) => m1 + m2 + m3;

// Arrow function to calculate average
const calculateAverage = (m1, m2, m3) => (m1 + m2 + m3) / 3;

function calculateMarks() {

    let studentName = document.getElementById("name").value;
    let mark1 = Number(document.getElementById("mark1").value);
    let mark2 = Number(document.getElementById("mark2").value);
    let mark3 = Number(document.getElementById("mark3").value);

    let totalMarks = calculateTotal(mark1, mark2, mark3);
    let averageMarks = calculateAverage(mark1, mark2, mark3);

    document.getElementById("result").innerHTML =
        `Student Name: ${studentName} <br>
         Total Marks: ${totalMarks} <br>
         Average Marks: ${averageMarks.toFixed(2)}`;
}