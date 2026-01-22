function setError(input, msg) {
  input.classList.add("error");
  input.classList.remove("success");
  document.getElementById("message").innerText = msg;
  document.getElementById("message").style.color = "red";
}

function setSuccess(input) {
  input.classList.remove("error");
  input.classList.add("success");
}

function changeRoleRules() {
  const role = document.getElementById("role").value;
  const skillsDiv = document.getElementById("skillsDiv");

  if (role === "admin") {
    skillsDiv.style.display = "none";
  } else {
    skillsDiv.style.display = "block";
  }
}

function validateEmail(email) {
  return email.endsWith("@gmail.com") || email.endsWith("@vitap.ac.in");
}

function validatePassword(password, role) {
  if (role === "admin") {
    return password.length >= 8 &&
           /[A-Z]/.test(password) &&
           /[0-9]/.test(password);
  } else {
    return password.length >= 6;
  }
}

function validateForm() {
  let valid = true;

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const age = document.getElementById("age");
  const role = document.getElementById("role");
  const skills = document.getElementById("skills");

  if (name.value === "") {
    setError(name, "Name is required");
    valid = false;
  } else setSuccess(name);

  if (!validateEmail(email.value)) {
    setError(email, "Invalid email domain");
    valid = false;
  } else setSuccess(email);

  if (!validatePassword(password.value, role.value)) {
    setError(password, "Weak password for selected role");
    valid = false;
  } else setSuccess(password);

  if (password.value !== confirmPassword.value) {
    setError(confirmPassword, "Passwords do not match");
    valid = false;
  } else setSuccess(confirmPassword);

  if (age.value < 18) {
    setError(age, "Age must be 18+");
    valid = false;
  } else setSuccess(age);

  if (role.value === "") {
    setError(role, "Please select a role");
    valid = false;
  } else setSuccess(role);

  if (role.value !== "admin" && skills.value === "") {
    setError(skills, "Skills required");
    valid = false;
  }

  if (valid) {
    document.getElementById("message").innerText = "Registration Successful!";
    document.getElementById("message").style.color = "green";
  }

  return valid;
}
