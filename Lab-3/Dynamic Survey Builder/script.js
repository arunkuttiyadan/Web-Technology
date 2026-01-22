const questions = [
  {
    id: 1,
    text: "Enter your name",
    type: "text",
    required: true,
    maxLength: 20
  },
  {
    id: 2,
    text: "Select your gender",
    type: "radio",
    required: true,
    options: ["Male", "Female"]
  },
  {
    id: 3,
    text: "Select your skills",
    type: "checkbox",
    required: true,
    minSelect: 1,
    maxSelect: 3,
    options: ["HTML", "CSS", "JavaScript", "Python"]
  }
];

const surveyDiv = document.getElementById("survey");

questions.forEach(q => {
  const div = document.createElement("div");
  div.className = "question";
  let html = `<label>${q.text}</label><br>`;

  if (q.type === "text") {
    html += `<input type="text" id="q${q.id}">`;
  }

  if (q.type === "radio") {
    q.options.forEach(opt => {
      html += `<input type="radio" name="q${q.id}" value="${opt}"> ${opt}<br>`;
    });
  }

  if (q.type === "checkbox") {
    q.options.forEach(opt => {
      html += `<input type="checkbox" name="q${q.id}" value="${opt}"> ${opt}<br>`;
    });
  }

  html += `<div class="error" id="err${q.id}"></div>`;
  div.innerHTML = html;
  surveyDiv.appendChild(div);
});

function validateSurvey() {
  let valid = true;

  questions.forEach(q => {
    const error = document.getElementById(`err${q.id}`);
    error.innerText = "";

    if (q.type === "text") {
      const value = document.getElementById(`q${q.id}`).value.trim();
      if (q.required && value === "") {
        error.innerText = "This field is required";
        valid = false;
      } else if (value.length > q.maxLength) {
        error.innerText = `Maximum ${q.maxLength} characters allowed`;
        valid = false;
      }
    }

    if (q.type === "radio") {
      const selected = document.querySelector(`input[name="q${q.id}"]:checked`);
      if (q.required && !selected) {
        error.innerText = "Please select one option";
        valid = false;
      }
    }

    if (q.type === "checkbox") {
      const selected = document.querySelectorAll(`input[name="q${q.id}"]:checked`);
      if (selected.length < q.minSelect || selected.length > q.maxSelect) {
        error.innerText =
          `Select between ${q.minSelect} and ${q.maxSelect} options`;
        valid = false;
      }
    }
  });

  return valid;
}
