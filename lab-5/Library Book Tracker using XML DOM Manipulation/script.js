let xmlDoc;

// LOAD books using AJAX GET
function loadBooks()
{
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "books.xml", true);

    xhr.onload = function()
    {
        if(xhr.status == 200)
        {
            xmlDoc = xhr.responseXML;

            if(!xmlDoc)
            {
                showMessage("Malformed XML file", "error");
                return;
            }

            displayBooks();

            showMessage("Books loaded successfully", "success");
        }
        else
        {
            showMessage("Error loading XML file", "error");
        }
    };

    xhr.send();
}

// DISPLAY books in table
function displayBooks()
{
    let table = document.getElementById("bookTable");

    table.innerHTML = "";

    let books = xmlDoc.getElementsByTagName("book");

    if(books.length == 0)
    {
        showMessage("No books found", "error");
        return;
    }

    for(let i=0; i<books.length; i++)
    {
        let book = books[i];

        let id = book.getElementsByTagName("id")[0].textContent;
        let title = book.getElementsByTagName("title")[0].textContent;
        let author = book.getElementsByTagName("author")[0].textContent;
        let status = book.getElementsByTagName("status")[0].textContent;

        table.innerHTML += `
        <tr>
        <td>${id}</td>
        <td>${title}</td>
        <td>${author}</td>
        <td>${status}</td>
        <td>
        <button onclick="editBook(${i})">Edit</button>
        <button onclick="deleteBook(${i})">Delete</button>
        </td>
        </tr>
        `;
    }
}

// ADD or UPDATE book
document.getElementById("bookForm").addEventListener("submit", function(e)
{
    e.preventDefault();

    if(!xmlDoc)
    {
        showMessage("Load XML first", "error");
        return;
    }

    let id = document.getElementById("id").value;
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let status = document.getElementById("status").value;

    let books = xmlDoc.getElementsByTagName("book");

    let exists = false;

    for(let book of books)
    {
        if(book.getElementsByTagName("id")[0].textContent == id)
        {
            book.getElementsByTagName("title")[0].textContent = title;
            book.getElementsByTagName("author")[0].textContent = author;
            book.getElementsByTagName("status")[0].textContent = status;

            exists = true;

            showMessage("Book updated successfully", "success");

            break;
        }
    }

    if(!exists)
    {
        let newBook = xmlDoc.createElement("book");

        newBook.innerHTML =
        `<id>${id}</id>
        <title>${title}</title>
        <author>${author}</author>
        <status>${status}</status>`;

        xmlDoc.documentElement.appendChild(newBook);

        showMessage("Book added successfully", "success");
    }

    displayBooks();

    document.getElementById("bookForm").reset();
});

// DELETE book
function deleteBook(index)
{
    let books = xmlDoc.getElementsByTagName("book");

    books[index].remove();

    displayBooks();

    showMessage("Book deleted successfully", "success");
}

// EDIT book
function editBook(index)
{
    let book = xmlDoc.getElementsByTagName("book")[index];

    document.getElementById("id").value =
    book.getElementsByTagName("id")[0].textContent;

    document.getElementById("title").value =
    book.getElementsByTagName("title")[0].textContent;

    document.getElementById("author").value =
    book.getElementsByTagName("author")[0].textContent;

    document.getElementById("status").value =
    book.getElementsByTagName("status")[0].textContent;
}

// MESSAGE display
function showMessage(msg, type)
{
    let message = document.getElementById("message");

    message.innerHTML = msg;

    message.className = type;
}
