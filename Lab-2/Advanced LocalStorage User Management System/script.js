var users = JSON.parse(localStorage.getItem("users")) || [];

function registerUser(){
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var mobile = document.getElementById("mobile").value;
    var password = document.getElementById("password").value;

    if(name==""||email==""||mobile==""||password==""){
        alert("All fields required");
        return;
    }
    if(mobile.length!=10){
        alert("Mobile must be 10 digits");
        return;
    }
    if(password.length<6){
        alert("Password must be minimum 6 characters");
        return;
    }

    for(var i=0;i<users.length;i++){
        if(users[i].email==email){
            alert("Email already exists");
            return;
        }
    }

    users.push({name,email,mobile,password});
    localStorage.setItem("users",JSON.stringify(users));
    displayUsers();
}

function displayUsers(){
    var table="";
    for(var i=0;i<users.length;i++){
        table+="<tr><td>"+users[i].name+"</td><td>"+users[i].email+"</td><td>"+users[i].mobile+"</td><td><button onclick='deleteUser("+i+")'>Delete</button></td></tr>";
    }
    document.getElementById("userTable").innerHTML=table;
}

function deleteUser(index){
    users.splice(index,1);
    localStorage.setItem("users",JSON.stringify(users));
    displayUsers();
}

function clearAll(){
    localStorage.removeItem("users");
    users=[];
    displayUsers();
}

displayUsers();
