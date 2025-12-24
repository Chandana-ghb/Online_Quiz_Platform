// 🔐 Protect page
let user = JSON.parse(localStorage.getItem("currentUser"));
if (!user) window.location.href = "login.html";

// Get last quiz attempt from localStorage
let lastAttempt = JSON.parse(localStorage.getItem("lastQuizAttempt"));
if (!lastAttempt) {
    alert("No quiz attempt found.");
    window.location.href = "dashboard.html";
}

// Calculate percentage
let score = lastAttempt.score;
let totalMarks = lastAttempt.total;
let percentage = Math.round((score / totalMarks) * 100);

// ❌ Block certificate if failed
if (percentage < 60) {
    alert("Certificate available only for passed users.");
    window.location.href = "dashboard.html";
}

// Fill certificate details
document.getElementById("certName").textContent = user.username;
document.getElementById("certScore").textContent = `${score} / ${totalMarks} (${percentage}%)`;
document.getElementById("certDate").textContent = "Date: " + new Date(lastAttempt.date).toLocaleDateString();

// Download / print
function downloadCertificate() {
    window.print();
}

// Back to dashboard
function goDashboard() {
    window.location.href = "dashboard.html";
}
