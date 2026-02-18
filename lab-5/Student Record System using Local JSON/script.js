let students = [];

// READ students using Fetch API
function loadStudents()
{
    fetch("students.json")

    .then(response =>
    {
        if(!response.ok)
        throw "Error loading JSON file";

        return response.json();
    })

    .then(data =>
    {
        students = data.students;

        displayStudents();

        showMessage("Students loaded successfully", "success");
    })

    .catch(error =>
    {
        showMessage(error, "error");
    });
}

// DISPLAY students
function displayStudents()
{
    let table = document.getElementById("studentTable");

    table.innerHTML = "";

    if(students.length == 0)
    {
        showMessage("No student records found", "error");
        return;
    }

    students.forEach((student, index) =>
    {
        table.innerHTML += `
        <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.course}</td>
        <td>${student.marks}</td>
        <td>
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
        </td>
        </tr>
        `;
    });
}

// CREATE and UPDATE
document.getElementById("studentForm").addEventListener("submit", function(e)
{
    e.preventDefault();

    let id = document.getElementById("id").value.trim();
    let name = document.getElementById("name").value.trim();
    let course = document.getElementById("course").value.trim();
    let marks = document.getElementById("marks").value.trim();

    // Validation
    if(id == "" || name == "" || course == "" || marks == "")
    {
        showMessage("All fields are required", "error");
        return;
    }

    let existing = students.find(student => student.id == id);

    if(existing)
    {
        // UPDATE
        existing.name = name;
        existing.course = course;
        existing.marks = marks;

        showMessage("Student updated successfully", "success");
    }
    else
    {
        // CREATE
        students.push({ id, name, course, marks });

        showMessage("Student added successfully", "success");
    }

    displayStudents();

    document.getElementById("studentForm").reset();
});

// DELETE
function deleteStudent(index)
{
    students.splice(index, 1);

    displayStudents();

    showMessage("Student deleted successfully", "success");
}

// EDIT
function editStudent(index)
{
    let student = students[index];

    document.getElementById("id").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("course").value = student.course;
    document.getElementById("marks").value = student.marks;
}

// MESSAGE display
function showMessage(msg, type)
{
    let message = document.getElementById("message");

    message.innerHTML = msg;

    message.className = type;
}
