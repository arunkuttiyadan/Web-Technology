const API = "http://localhost:3000/books";

let page = 1;

function displayBooks(data){

let output="";

data.forEach(book=>{

output+=`
<div class="book">

<h3>${book.title}</h3>
<p><b>Author:</b> ${book.author}</p>
<p><b>Category:</b> ${book.category}</p>
<p><b>Price:</b> ₹${book.price}</p>
<p><b>Rating:</b> ${book.rating}</p>

</div>
`;

});

document.getElementById("books").innerHTML = output;

}


function searchBooks(){

const title = document.getElementById("searchTitle").value;

fetch(`${API}/search?title=${title}`)
.then(res=>res.json())
.then(data=>displayBooks(data));

}


function filterCategory(){

const category = document.getElementById("category").value;

fetch(`${API}/category/${category}`)
.then(res=>res.json())
.then(data=>displayBooks(data));

}


function sortPrice(){

fetch(`${API}/sort/price`)
.then(res=>res.json())
.then(data=>displayBooks(data));

}


function sortRating(){

fetch(`${API}/sort/rating`)
.then(res=>res.json())
.then(data=>displayBooks(data));

}


function topBooks(){

fetch(`${API}/top`)
.then(res=>res.json())
.then(data=>displayBooks(data));

}


function nextPage(){

page++;

fetch(`${API}?page=${page}`)
.then(res=>res.json())
.then(data=>displayBooks(data));

}