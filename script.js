const contactForm = document.getElementById("contactForm");
const responseList = document.getElementById("responseList");
const themeToggle = document.getElementById("themeToggle");

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxMTijJiePCKoy1jHBPVmpCrKVWflhdpisXgfs_7MgDmGpNSVfuxrqk70wQonEfDDuB7Q/exec";


contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const formData = new URLSearchParams();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    fetch(WEB_APP_URL, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert("Response submitted successfully!");

        contactForm.reset();

        loadResponses();
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    });
});


function loadResponses() {

    fetch(WEB_APP_URL)
        .then(response => response.json())
        .then(data => {

            responseList.innerHTML = "";

            if (data.length <= 1) {
                responseList.innerHTML = "<p>No responses yet.</p>";
                return;
            }

            data.slice(1).forEach(function(response) {

                const responseDiv = document.createElement("div");

                responseDiv.innerHTML = `
                    <h3>${response[0]}</h3>
                    <p><strong>Email:</strong> ${response[1]}</p>
                    <p><strong>Message:</strong> ${response[2]}</p>
                    <p><strong>Submitted:</strong> ${response[3]}</p>
                    <hr>
                `;

                responseList.appendChild(responseDiv);
            });
        })
        .catch(error => {
            console.error("Error loading responses:", error);
        });
}

loadResponses();

themeToggle.addEventListener("click", function() {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "Light Mode";
    } else {
        themeToggle.textContent = "Dark Mode";
    }

});