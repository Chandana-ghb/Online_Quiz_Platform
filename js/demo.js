 const correctSound = new Audio("assets/sounds/correct.mp3");
    const wrongSound = new Audio("assets/sounds/wrong.mp3");

    // DOM elements
    const questionCard = document.querySelector(".question-card");
    const demoEnd = document.querySelector(".demo-end");

    // Demo questions
    const questions = [
      { question: "Which HTML tag is used for the largest heading?", options: ["<h6>", "<h1>", "<head>", "<title>"], answer: "<h1>" },
      { question: "Which property is used to change text color in CSS?", options: ["font-style", "text-color", "color", "background-color"], answer: "color" },
      { question: "Which JavaScript method converts JSON to object?", options: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.convert()"], answer: "JSON.parse()" },
      { question: "What does CSS 'flex-direction: column;' do?", options: ["Aligns items in a column", "Aligns items in a row", "Makes font larger", "Hides elements"], answer: "Aligns items in a column" },
      { question: "Which HTML attribute is used for inline styles?", options: ["class", "id", "style", "link"], answer: "style" },
      { question: "Which keyword is used to declare a constant in JS?", options: ["var", "let", "const", "constant"], answer: "const" },
      { question: "Which HTTP method is used to update a resource?", options: ["GET", "POST", "PUT", "DELETE"], answer: "PUT" },
      { question: "In CSS, 'position: absolute;' positions relative to?", options: ["Viewport", "Parent element", "Document body", "Itself"], answer: "Parent element" },
      { question: "Which JS event triggers when a page loads?", options: ["onload", "onclick", "onchange", "onhover"], answer: "onload" },
      { question: "Which HTML element is used for JavaScript?", options: ["<script>", "<js>", "<code>", "<javascript>"], answer: "<script>" }
    ];

    // Shuffle questions
    let shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);

    let index = 0;
    let score = 0;

    // Hide demo end initially
    demoEnd.style.display = "none";

    // Load first question
    loadQuestion();

    function loadQuestion() {
      const q = shuffledQuestions[index];
      questionCard.innerHTML = "";

      // Question heading
      const h3 = document.createElement("h3");
      h3.textContent = `${index + 1}. ${q.question}`;
      questionCard.appendChild(h3);

      // Shuffle options
      const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);

      shuffledOptions.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "option";
        btn.textContent = opt;
        btn.addEventListener("click", () => checkAnswer(btn, q));
        questionCard.appendChild(btn);
      });
    }

    function checkAnswer(btn, question) {
      const allBtns = questionCard.querySelectorAll(".option");

      if (btn.textContent === question.answer) {
        btn.classList.add("correct");
        score += 1; // Each question = 1 point
        correctSound.play();
      } else {
        btn.classList.add("wrong");
        wrongSound.play();
        allBtns.forEach(b => {
          if (b.textContent === question.answer) b.classList.add("correct");
        });
      }

      allBtns.forEach(b => b.disabled = true);

      setTimeout(() => {
        index++;
        if (index < shuffledQuestions.length) loadQuestion();
        else finishDemo();
      }, 1000);
    }

    function finishDemo() {
      questionCard.style.display = "none";

      const totalMarks = shuffledQuestions.length; // Total questions = 10

      demoEnd.innerHTML = `
        <h2>🎉 Demo Completed!</h2>
        <p>Your Score: <strong>${score} / ${totalMarks}</strong></p>
        <p>
          Login or Sign up to save your scores, earn certificates, and appear on leaderboard.
        </p>
        <div class="demo-buttons">
          <a href="login.html" class="btn-primary">Login</a>
          <a href="signup.html" class="btn-outline">Sign Up</a>
          <a href="index.html" class="btn-accent">Back to Landing Page</a>
        </div>
      `;

      demoEnd.style.display = "block";

      console.log("Demo Score:", score, "/", totalMarks);
    }