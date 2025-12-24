async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorEl = document.getElementById("error");

  if (!email || !password) {
    errorEl.textContent = "Please enter email and password";
    return;
  }

  try {
    const res = await fetch(`https://online-quiz-platform-gjin.onrender.com/users?email=${email}`);
    const users = await res.json();

    if (users.length === 0) {
      errorEl.textContent = "This email is not registered";
      return;
    }

    const user = users[0];

    if (user.password !== password) {
      errorEl.textContent = "Wrong password";
      return;
    }

    // ✅ STORE USER (VERY IMPORTANT)
    localStorage.setItem("currentUser", JSON.stringify(user));

    // ✅ DEBUG (REMOVE LATER)
    console.log("Logged in user:", user);

    // Redirect
    if (user.role === "admin") {
      window.location.href = "admin-panel.html";
    } else {
      window.location.href = "dashboard.html";
    }

  } catch (err) {
    console.error(err);
    errorEl.textContent = "Login failed";
  }
}

