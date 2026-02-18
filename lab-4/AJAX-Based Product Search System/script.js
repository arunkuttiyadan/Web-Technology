const searchBox = document.getElementById("searchBox");
const resultsDiv = document.getElementById("results");
const statusDiv = document.getElementById("status");

let debounceTimer;

// Debouncing
searchBox.addEventListener("input", function()
{
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(searchProducts, 500);
});

function searchProducts()
{
    let query = searchBox.value.trim().toLowerCase();

    if(query === "")
    {
        resultsDiv.innerHTML = "";
        statusDiv.innerHTML = "";
        return;
    }

    statusDiv.innerHTML = "Searching...";

    // AJAX request using Fetch API
    fetch("products.json")

    .then(function(response)
    {
        if(!response.ok)
        {
            throw new Error("Failed to fetch data");
        }

        return response.json();
    })

    .then(function(data)
    {
        let products = data.products;

        // Filter matching products
        let filtered = products.filter(function(product)
        {
            return product.name.toLowerCase().includes(query);
        });

        displayProducts(filtered);

    })

    .catch(function(error)
    {
        statusDiv.innerHTML = "Error loading products";
        resultsDiv.innerHTML = "";
        console.error(error);
    });
}

function displayProducts(products)
{
    resultsDiv.innerHTML = "";

    if(products.length === 0)
    {
        statusDiv.innerHTML = "No results found";
        return;
    }

    statusDiv.innerHTML = products.length + " result(s) found";

    products.forEach(function(product)
    {
        let div = document.createElement("div");

        div.className = "product";

        div.innerHTML =
            "<b>Name:</b> " + product.name + "<br>" +
            "<b>Price:</b> ₹" + product.price + "<br>" +
            "<b>Category:</b> " + product.category;

        resultsDiv.appendChild(div);
    });
}
