const usernameInput = document.getElementById("username");
const feedback = document.getElementById("feedback");
const form = document.getElementById("registerForm");

let usernameAvailable = false;

usernameInput.addEventListener("input", function()
{
    let username = usernameInput.value.trim();

    if(username === "")
    {
        feedback.innerHTML = "";
        return;
    }

    feedback.innerHTML = "Checking availability...";
    feedback.className = "loading";

    fetch("./usernames.json")

    .then(response => {
        if(!response.ok)
        throw new Error("File not found");
        return response.json();
    })

    .then(data => {

        if(data.usernames.includes(username))
        {
            feedback.innerHTML = "Username already taken";
            feedback.className = "taken";
            usernameAvailable = false;
        }
        else
        {
            feedback.innerHTML = "Username available";
            feedback.className = "available";
            usernameAvailable = true;
        }

    })

    .catch(error => {

        console.error(error);

        feedback.innerHTML = "Error checking username";
        feedback.className = "taken";

    });

});

form.addEventListener("submit", function(event)
{
    if(!usernameAvailable)
    {
        event.preventDefault();
        alert("Username not available");
    }
});
