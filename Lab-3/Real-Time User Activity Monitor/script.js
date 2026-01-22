let activityLog = [];
let clickCount = 0;
const CLICK_THRESHOLD = 10;

const logContainer = document.getElementById("activityLog");
const warningDiv = document.getElementById("warning");

function logActivity(type, event, phase) {
  const activity = {
    type: type,
    target: event.target.tagName,
    phase: phase,
    time: new Date().toLocaleTimeString()
  };

  activityLog.push(activity);
  displayLog();

  if (type === "Click") {
    clickCount++;
    if (clickCount > CLICK_THRESHOLD) {
      warningDiv.innerText = "Warning: Too many clicks detected!";
    }
  }
}

function displayLog() {
  logContainer.innerHTML = "";
  activityLog.forEach(act => {
    const li = document.createElement("li");
    li.innerText =
      `[${act.time}] ${act.type} on ${act.target} (${act.phase})`;
    logContainer.appendChild(li);
  });
}

document.addEventListener("click", e =>
  logActivity("Click", e, "Bubbling"), false);

document.addEventListener("click", e =>
  logActivity("Click", e, "Capturing"), true);

document.addEventListener("keydown", e =>
  logActivity("Key Press", e, "Bubbling"), false);

document.addEventListener("focusin", e =>
  logActivity("Focus", e, "Bubbling"), false);

function resetLog() {
  activityLog = [];
  clickCount = 0;
  warningDiv.innerText = "";
  displayLog();
}

function exportLog() {
  let text = "User Activity Log:\n\n";
  activityLog.forEach(act => {
    text += `[${act.time}] ${act.type} on ${act.target} (${act.phase})\n`;
  });

  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "activity_log.txt";
  link.click();
}
