let currentStage = 0;

// Temporary data storage
let formData = {
    name: "",
    email: "",
    mobile: "",
    city: "",
    password: ""
};

const stages = document.querySelectorAll(".stage");
const progress = document.getElementById("progress");

function showStage(index) {
    stages.forEach(stage => stage.classList.remove("active"));
    stages[index].classList.add("active");
    progress.style.width = ((index + 1) / stages.length) * 100 + "%";
}

function nextStage() {
    if (!validateStage()) return;
    currentStage++;
    showStage(currentStage);
}

function prevStage() {
    currentStage--;
    showStage(currentStage);
}

function validateStage() {
    clearErrors();

    if (currentStage === 0) {
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();

        if (name === "" || email === "") {
            error1.textContent = "All fields are required.";
            return false;
        }

        formData.name = name;
        formData.email = email;
    }

    if (currentStage === 1) {
        let mobile = document.getElementById("mobile").value.trim();
        let city = document.getElementById("city").value.trim();

        if (!/^\d{10}$/.test(mobile)) {
            error2.textContent = "Mobile must be 10 digits.";
            return false;
        }

        if (city === "") {
            error2.textContent = "City is required.";
            return false;
        }

        formData.mobile = mobile;
        formData.city = city;
    }

    if (currentStage === 2) {
        let password = document.getElementById("password").value;
        let confirm = document.getElementById("confirm").value;

        if (password.length < 6) {
            error3.textContent = "Password must be at least 6 characters.";
            return false;
        }

        if (password !== confirm) {
            error3.textContent = "Passwords do not match.";
            return false;
        }

        formData.password = password;
    }

    return true;
}

function submitForm() {
    if (!validateStage()) return;
    alert("Form submitted successfully!\n\n" + JSON.stringify(formData, null, 2));
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(e => e.textContent = "");
}
