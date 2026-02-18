let xmlDoc;

// READ employees using AJAX
function loadEmployees()
{
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "employees.xml", true);

    xhr.onload = function()
    {
        if(xhr.status == 200)
        {
            xmlDoc = xhr.responseXML;

            if(!xmlDoc)
            {
                showMessage("Malformed XML", "error");
                return;
            }

            displayEmployees();

            showMessage("Employees loaded successfully", "success");
        }
        else
        {
            showMessage("Error loading XML", "error");
        }
    };

    xhr.send();
}

// DISPLAY employees in table
function displayEmployees()
{
    let table = document.getElementById("tableBody");

    table.innerHTML = "";

    let employees = xmlDoc.getElementsByTagName("employee");

    if(employees.length == 0)
    {
        showMessage("No employee records found", "error");
        return;
    }

    for(let i=0; i<employees.length; i++)
    {
        let emp = employees[i];

        let id = emp.getElementsByTagName("id")[0].textContent;
        let name = emp.getElementsByTagName("name")[0].textContent;
        let dept = emp.getElementsByTagName("department")[0].textContent;
        let salary = emp.getElementsByTagName("salary")[0].textContent;

        table.innerHTML += `
        <tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${dept}</td>
        <td>${salary}</td>
        <td>
        <button onclick="editEmployee(${i})">Edit</button>
        <button onclick="deleteEmployee(${i})">Delete</button>
        </td>
        </tr>
        `;
    }
}

// CREATE and UPDATE
document.getElementById("empForm").addEventListener("submit", function(e)
{
    e.preventDefault();

    if(!xmlDoc)
    {
        showMessage("Load XML first", "error");
        return;
    }

    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let dept = document.getElementById("department").value;
    let salary = document.getElementById("salary").value;

    let employees = xmlDoc.getElementsByTagName("employee");

    let exists = false;

    for(let emp of employees)
    {
        if(emp.getElementsByTagName("id")[0].textContent == id)
        {
            emp.getElementsByTagName("department")[0].textContent = dept;
            emp.getElementsByTagName("salary")[0].textContent = salary;

            exists = true;

            showMessage("Employee updated successfully", "success");

            break;
        }
    }

    if(!exists)
    {
        let newEmp = xmlDoc.createElement("employee");

        newEmp.innerHTML =
        `<id>${id}</id>
        <name>${name}</name>
        <department>${dept}</department>
        <salary>${salary}</salary>`;

        xmlDoc.documentElement.appendChild(newEmp);

        showMessage("Employee added successfully", "success");
    }

    displayEmployees();

    document.getElementById("empForm").reset();
});

// DELETE
function deleteEmployee(index)
{
    let employees = xmlDoc.getElementsByTagName("employee");

    employees[index].remove();

    displayEmployees();

    showMessage("Employee deleted successfully", "success");
}

// EDIT
function editEmployee(index)
{
    let emp = xmlDoc.getElementsByTagName("employee")[index];

    document.getElementById("id").value =
    emp.getElementsByTagName("id")[0].textContent;

    document.getElementById("name").value =
    emp.getElementsByTagName("name")[0].textContent;

    document.getElementById("department").value =
    emp.getElementsByTagName("department")[0].textContent;

    document.getElementById("salary").value =
    emp.getElementsByTagName("salary")[0].textContent;
}

// MESSAGE display
function showMessage(msg, type)
{
    let message = document.getElementById("message");

    message.innerHTML = msg;

    message.className = type;
}
