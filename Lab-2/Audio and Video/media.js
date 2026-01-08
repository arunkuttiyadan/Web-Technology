var audio = document.getElementById("myAudio");
var video = document.getElementById("myVideo");

audio.addEventListener("timeupdate", function () {
    document.getElementById("audioTime").innerText = audio.currentTime.toFixed(1);
});

video.addEventListener("timeupdate", function () {
    document.getElementById("videoTime").innerText = video.currentTime.toFixed(1);
});
