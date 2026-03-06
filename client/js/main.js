document.addEventListener("DOMContentLoaded", () => {
const loginForm = document.getElementById("loginForm");

if (!loginForm) return;

loginForm.addEventListener("submit", async (e) => {
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
try {
const response = await fetch("http://localhost:3000/api/users/login", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({ email, password })
});

const data = await response.json();

if (data.token) {
localStorage.setItem("token", data.token);
window.location.href = "dashboard.html";
} else {
alert(data.message || "Login failed");
}

} catch (error) {
console.error(error);
alert("Something went wrong");
}
}
});
});