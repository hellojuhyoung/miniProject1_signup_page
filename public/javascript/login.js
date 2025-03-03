document
  .getElementById("loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = document.getElementById("id").value;
    const password = document.getElementById("password").value;
    const errorDiv = document.getElementById("loginError");

    try {
      const storedUsers = localStorage.getItem("users");
      if (!storedUsers) {
        errorDiv.textContent = "등록된 사용자가 아닙니다.";
        return;
      }

      const users = JSON.parse(storedUsers);
      const user = users.find((u) => u.id === id && u.password === password);

      if (user) {
        errorDiv.textContent = "Login successful";
        window.location.href = "/welcome?name=" + user.name;

        try {
          const response = await axios.post("/login", {
            id: id,
            password: password,
          });
          console.log(response.data);
        } catch (error) {
          console.error("error sending login information to the server", error);
        }
      } else {
        errorDiv.textContent = "Invalid email or password";
      }
    } catch (error) {
      console.error("Login error:", error);
      errorDiv.textContent = "An error occurred during login";
    }
  });
