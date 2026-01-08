var count=0;

function addTask(){
    var input=document.getElementById("taskInput").value;
    if(input=="") return;

    var task=document.createElement("div");
    task.className="task";
    task.id="task"+count;
    task.draggable=true;
    task.ondragstart=drag;

    var date=new Date().toLocaleDateString();
    task.innerHTML=input+"<br>"+date;

    document.getElementById("todo").appendChild(task);
    document.getElementById("taskInput").value="";
    count++;
}

function drag(ev){
    ev.dataTransfer.setData("id",ev.target.id);
}

function allowDrop(ev){
    ev.preventDefault();
}

function drop(ev){
    ev.preventDefault();
    var id=ev.dataTransfer.getData("id");
    var task=document.getElementById(id);
    ev.target.appendChild(task);

    if(ev.target.id=="done"){
        task.style.background="lightgreen";
        document.getElementById("msg").innerText="Task Completed Successfully";
    }
}
