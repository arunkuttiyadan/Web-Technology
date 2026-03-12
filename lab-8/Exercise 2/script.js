function createStudent(){

    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let department = document.getElementById("department").value;
    let marks = Number(document.getElementById("marks").value);

    // Create student object
    const student = {
        id: id,
        name: name,
        department: department,
        marks: marks
    };

    const { id: sid, name: sname, department: sdept, marks: smarks } = student;

    console.log(sid, sname, sdept, smarks);

    
    let grade;
    if (smarks >= 90) grade = "A";
    else if (smarks >= 75) grade = "B";
    else if (smarks >= 60) grade = "C";
    else grade = "D";

    
    const updatedStudent = {
        ...student,
        grade: grade
    };

    console.log(updatedStudent);

    document.getElementById("output").innerHTML =
        `ID: ${sid} <br>
         Name: ${sname} <br>
         Department: ${sdept} <br>
         Marks: ${smarks} <br>
         Grade: ${grade}`;
}