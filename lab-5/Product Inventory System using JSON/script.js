let products = [];

// LOAD inventory using Fetch API
function loadProducts()
{
    fetch("inventory.json")

    .then(response =>
    {
        if(!response.ok)
        throw "Error loading inventory";

        return response.json();
    })

    .then(data =>
    {
        products = data.products;

        displayProducts(products);

        showMessage("Inventory loaded successfully", "success");
    })

    .catch(error =>
    {
        showMessage(error, "error");
    });
}

// DISPLAY products
function displayProducts(productList)
{
    let table = document.getElementById("productTable");

    table.innerHTML = "";

    let total = 0;

    productList.forEach((product, index) =>
    {
        let value = product.price * product.stock;

        total += value;

        let rowClass = product.stock < 5 ? "low-stock" : "";

        table.innerHTML += `
        <tr class="${rowClass}">
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${product.price}</td>
        <td>${product.stock}</td>
        <td>
        <button onclick="editProduct(${index})">Edit</button>
        <button onclick="deleteProduct(${index})">Delete</button>
        </td>
        </tr>
        `;
    });

    document.getElementById("totalValue").innerHTML = total;
}

// ADD and UPDATE product
document.getElementById("productForm").addEventListener("submit", function(e)
{
    e.preventDefault();

    let id = document.getElementById("id").value.trim();
    let name = document.getElementById("name").value.trim();
    let category = document.getElementById("category").value.trim();
    let price = parseFloat(document.getElementById("price").value);
    let stock = parseInt(document.getElementById("stock").value);

    // Validation
    if(id=="" || name=="" || category=="" || isNaN(price) || isNaN(stock))
    {
        showMessage("Invalid input", "error");
        return;
    }

    let existing = products.find(p => p.id == id);

    if(existing)
    {
        existing.name = name;
        existing.category = category;
        existing.price = price;
        existing.stock = stock;

        showMessage("Product updated successfully", "success");
    }
    else
    {
        products.push({id,name,category,price,stock});

        showMessage("Product added successfully", "success");
    }

    displayProducts(products);

    document.getElementById("productForm").reset();
});

// DELETE product
function deleteProduct(index)
{
    products.splice(index,1);

    displayProducts(products);

    showMessage("Product deleted successfully", "success");
}

// EDIT product
function editProduct(index)
{
    let product = products[index];

    document.getElementById("id").value = product.id;
    document.getElementById("name").value = product.name;
    document.getElementById("category").value = product.category;
    document.getElementById("price").value = product.price;
    document.getElementById("stock").value = product.stock;
}

// SEARCH by category
function searchProduct()
{
    let query = document.getElementById("search").value.toLowerCase();

    let filtered = products.filter(p =>
        p.category.toLowerCase().includes(query)
    );

    displayProducts(filtered);
}

// MESSAGE display
function showMessage(msg, type)
{
    let message = document.getElementById("message");

    message.innerHTML = msg;

    message.className = type;
}

// Load inventory when page starts
loadProducts();
