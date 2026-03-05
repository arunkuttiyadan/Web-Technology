const API = "http://localhost:3000/notes";

function addNote(){

const note = {
title: document.getElementById("title").value,
subject: document.getElementById("subject").value,
description: document.getElementById("description").value
};

fetch(API,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(note)
})
.then(res=>res.json())
.then(data=>{
alert("Note Added Successfully");
});

}



function loadNotes(){

fetch(API)
.then(res=>res.json())
.then(data=>{

let output="";

data.forEach(note=>{

output += `
<div class="note">

<h3>${note.title}</h3>
<p><b>Subject:</b> ${note.subject}</p>
<p>${note.description}</p>

<div class="actions">

<button onclick="editNote('${note._id}')">Edit</button>

<button onclick="deleteNote('${note._id}')">Delete</button>

</div>

</div>
`;

});

document.getElementById("notes").innerHTML = output;

});

}



function deleteNote(id){

fetch(API+"/"+id,{
method:"DELETE"
})
.then(res=>res.json())
.then(data=>{
loadNotes();
});

}



function editNote(id){

const newTitle = prompt("Enter new title");
const newDesc = prompt("Enter new description");

fetch(API+"/"+id,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
title:newTitle,
description:newDesc
})
})
.then(res=>res.json())
.then(data=>{
loadNotes();
});

}