var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


ctx.fillStyle = "blue";
ctx.fillRect(20, 20, 120, 80);


ctx.beginPath();
ctx.arc(250, 150, 40, 0, 2 * Math.PI);
ctx.fillStyle = "red";
ctx.fill();
ctx.closePath();


ctx.beginPath();
ctx.moveTo(350, 50);
ctx.lineTo(450, 200);
ctx.strokeStyle = "black";
ctx.stroke();
ctx.closePath();


ctx.font = "24px Arial";
ctx.fillStyle = "green";
ctx.fillText("HTML5 Canvas", 140, 280);
