function findEmailbyPhoneNumber(phoneNumber) {
  const storedUsers = localStorage.getItem("users");
  const parseUsers = JSON.parse(storedUsers);

  if (storedUsers) {
    const user = parseUsers.find((user) => user.phoneNum === phoneNumber);

    if (user) {
      document.getElementById("emailDisplay").textContent = "Email: " + user.id;
    } else {
      document.getElementById("emailDisplay").textContent = "User not found";
    }
  } else {
    document.getElementById("emailDisplay").textContent = "No user data found.";
  }
}

document.getElementById("findButton").addEventListener("click", function () {
  const form = document.getElementById("findIDForm");
  const phone1 = form.elements["phone1"].value;
  const phone2 = form.elements["phone2"].value;
  const phone3 = form.elements["phone3"].value;
  const phoneNum = phone1 + phone2 + phone3;

  findEmailbyPhoneNumber(phoneNum);
});

// const phone1 = form.elements["phone1"].value;
// const phone2 = form.elements["phone2"].value;
// const phone3 = form.elements["phone3"].value;
// const phoneNum = phone1 + phone2 + phone3;
