document.addEventListener("DOMContentLoaded", () => {

const loginForm = document.getElementById("loginForm");

if (loginForm) {
loginForm.addEventListener("submit", async (e) => {
e.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

const response = await fetch("http://localhost:5000/api/users/login", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({ email, password })
});

const data = await response.json();

if (response.ok) {
localStorage.setItem("userId", data.userId);
window.location.href = "dashboard.html";
} else {
alert(data.message || "Login failed");
}
});
}

});
