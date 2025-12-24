// 🔐 Protect page
let user = JSON.parse(localStorage.getItem("currentUser"));
if (!user) window.location.href = "login.html";

const resultText = document.getElementById("resultText");
const scoreText = document.getElementById("scoreText");
const feedbackMessage = document.getElementById("feedbackMessage");
const certBtn = document.getElementById("certificateBtn");

async function loadResult() {
    try {
        const res = await fetch(`https://online-quiz-platform-gjin.onrender.com/quizHistory?username=${user.username}`);
        const history = await res.json();

        if (!history || history.length === 0) {
            alert("No quiz history found.");
            window.location.href = "dashboard.html";
            return;
        }

        const lastAttempt = history[history.length - 1];
        const score = lastAttempt.score;
        const totalMarks = lastAttempt.total;
        const percentage = Math.round((score / totalMarks) * 100);

        // PASS / FAIL & certificate
        if (score >= 15) {
            resultText.textContent = "🎉 Congratulations, You Passed!";
            resultText.style.color = "green";
            certBtn.style.display = "inline-block"; // certificate available
        } else {
            resultText.textContent = "❌ Sorry, You Failed";
            resultText.style.color = "red";
            certBtn.style.display = "none"; // certificate not available
        }



        scoreText.textContent = `Score: ${score} / ${totalMarks} (${percentage}%)`;

        // Feedback
        if (percentage >= 90) feedbackMessage.textContent = "🌟 Outstanding! You aced the quiz!";
        else if (percentage >= 75) feedbackMessage.textContent = "👏 Great job! Strong performance.";
        else if (percentage >= 60) feedbackMessage.textContent = "👍 Good work! You passed.";
        else if (percentage >= 40) feedbackMessage.textContent = "🙂 Not bad, but you need more practice.";
        else feedbackMessage.textContent = "💪 Keep practicing! You'll improve.";

        // Save last attempt for certificate
        localStorage.setItem("lastQuizAttempt", JSON.stringify(lastAttempt));

    } catch (err) {
        console.error(err);
        alert("Failed to load quiz result.");
        window.location.href = "dashboard.html";
    }
}

// Buttons
function reattempt() { window.location.href = "quiz.html"; }
function goDashboard() { window.location.href = "dashboard.html"; }
function openCertificate() { window.location.href = "certificate.html"; }

// Load result
loadResult();

