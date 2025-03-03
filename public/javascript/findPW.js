function findPWbyEmail(email) {
  const storedUsers = localStorage.getItem("users");
  const parsedUsers = JSON.parse(storedUsers);

  if (storedUsers) {
    const user = parsedUsers.find((user) => user.id === email);
    if (user) {
      document.getElementById("PWDisplay").textContent =
        "Password: " + user.password;
    } else {
      document.getElementById("PWDisplay").textContent = "User not found";
    }
  } else {
    document.getElementById("PWDisplay").textContent = "No user data found.";
  }
}

document.getElementById("findButton").addEventListener("click", function () {
  const id = document.getElementById("id").value;

  findPWbyEmail(id);
});
