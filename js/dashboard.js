// 🔐 Protect page
let user = JSON.parse(localStorage.getItem("currentUser"));
if (!user) window.location.href = "login.html";

// DOM elements
const welcomeEl = document.getElementById("welcome");
const emailEl = document.getElementById("email");
const lastScoreEl = document.getElementById("lastScore");
const bestScoreEl = document.getElementById("bestScore");
const historyTableBody = document.querySelector("#historyTable tbody");
const leaderboardBody = document.querySelector("#leaderboardTable tbody");

welcomeEl.textContent = "Welcome, " + user.username;
emailEl.textContent = "Email: " + user.email;

// Logout function
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

// Start Quiz
function startQuiz() {
    const selectedCategory = document.getElementById("quizCategory").value;
    const selectedDifficulty = document.getElementById("quizDifficulty").value;

    if (!selectedCategory || !selectedDifficulty) {
        alert("Please select category and difficulty");
        return;
    }

    localStorage.setItem("selectedCategory", selectedCategory);
    localStorage.setItem("selectedDifficulty", selectedDifficulty);

    window.location.href = "instructions.html";
}

// ======================
// Load Quiz History & Leaderboard
// ======================
async function loadHistory() {
    try {
        // Fetch all quiz history from JSON-server
        const resHistory = await fetch("https://online-quiz-platform-gjin.onrender.com/quizHistory");
        const history = await resHistory.json();

        // Fetch all users from JSON-server
        const resUsers = await fetch("https://online-quiz-platform-gjin.onrender.com/users");
        const allUsers = await resUsers.json();
        const validUsernames = allUsers.map(u => u.username);

        // ---- User History ----
        const userHistory = history.filter(h => h.username === user.username);
        historyTableBody.innerHTML = "";

        userHistory.forEach(h => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${h.date}</td><td>${h.score}</td><td>${h.total}</td>`;
            historyTableBody.appendChild(row);
        });

        if (userHistory.length > 0) {
            const lastAttempt = userHistory[userHistory.length - 1];
            const best = Math.max(...userHistory.map(h => h.score));
            lastScoreEl.textContent = `${lastAttempt.score} / ${lastAttempt.total}`;
            bestScoreEl.textContent = `${best} / ${lastAttempt.total}`;
        } else {
            lastScoreEl.textContent = "-";
            bestScoreEl.textContent = "-";
        }

        // ---- Leaderboard ----
        leaderboardBody.innerHTML = "";
        const bestScores = {};

        // Filter history for valid users only
        history.filter(h => validUsernames.includes(h.username))
               .forEach(h => {
                    if (!bestScores[h.username] || h.score > bestScores[h.username].score) {
                        bestScores[h.username] = h;
                    }
               });

        Object.values(bestScores)
            .sort((a, b) => b.score - a.score)
            .slice(0, 5) // top 5
            .forEach((item, index) => {
                const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1;
                const row = document.createElement("tr");
                row.innerHTML = `<td>${medal}</td><td>${item.username}</td><td>${item.score} / ${item.total}</td>`;
                leaderboardBody.appendChild(row);
            });

    } catch (err) {
        console.error(err);
        alert("Failed to load quiz history or leaderboard");
    }
}

// Load history and leaderboard on page load
loadHistory();

