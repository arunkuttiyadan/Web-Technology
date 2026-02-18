const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const message = document.getElementById("message");

let students = [];

// READ operation
function fetchStudents()
{
    fetch("students.json")

    .then(response =>
    {
        if(response.status === 200)
            return response.json();

        if(response.status === 404)
            throw "File not found";

        throw "Server error";
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
    table.innerHTML = "";

    students.forEach((student, index) =>
    {
        table.innerHTML += `
        <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.department}</td>
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
form.addEventListener("submit", function(e)
{
    e.preventDefault();

    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const department = document.getElementById("department").value;
    const marks = document.getElementById("marks").value;

    let existing = students.find(s => s.id === id);

    if(existing)
    {
        // UPDATE
        existing.name = name;
        existing.department = department;
        existing.marks = marks;

        showMessage("Student updated successfully", "success");
    }
    else
    {
        // CREATE
        students.push({ id, name, department, marks });

        showMessage("Student added successfully", "success");
    }

    displayStudents();

    form.reset();
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
    const student = students[index];

    document.getElementById("id").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("department").value = student.department;
    document.getElementById("marks").value = student.marks;

    showMessage("Edit student and click Add/Update", "success");
}

// MESSAGE display
function showMessage(text, type)
{
    message.innerHTML = text;
    message.className = type;
}

// Load students when page loads
fetchStudents();
