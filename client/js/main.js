document.addEventListener("DOMContentLoaded", () => {
const loginForm = document.getElementById("loginForm");

if (!loginForm) return;

loginForm.addEventListener("submit", (e) => {
e.preventDefault();

const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value.trim();

let errors = [];

const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

if (email === "") {
errors.push("Email is required");
} else if (!email.match(emailPattern)) {
errors.push("Invalid email format");
}

if (password === "") {
errors.push("Password is required");
} else if (password.length < 6) {
errors.push("Password must be at least 6 characters");
}

if (errors.length > 0) {
alert(errors.join("\n"));
} else {
alert("Login successful 🎉");

// Fake login session
localStorage.setItem("loggedIn", "true");

// Optional redirect
window.location.href = "dashboard.html";
}
});
});