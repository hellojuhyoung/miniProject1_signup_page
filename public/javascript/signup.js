document.addEventListener("DOMContentLoaded", () => {
  const yearSelect = document.getElementById("year");
  const monthSelect = document.getElementById("month");
  const daySelect = document.getElementById("day");

  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= 1900; i--) {
    const option = document.createElement("option");
    option.value = i;
    option.text = i;
    yearSelect.appendChild(option);
  }

  for (let i = 1; i <= 12; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = i;
    monthSelect.appendChild(option);
  }

  for (let i = 1; i <= 31; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = i;
    daySelect.appendChild(option);
  }
});

function confirmEmail() {
  const form = document.getElementById("signupForm");
  const storedUsers = localStorage.getItem("users");

  if (form) {
    const email = form.elements["id"].value;
    const emailInput = form.elements["id"];

    if (!emailInput.checkValidity()) {
      emailError.innerText = "이메일 형식에 맞지 않습니다";
      return null;
    } else {
      if (storedUsers) {
        const parseUsers = JSON.parse(storedUsers);
        const matchingUser = parseUsers.find((user) => user.id === email);
        if (matchingUser) {
          emailError.innerText = "중복입니다";
          return null;
        } else {
          emailError.innerText = "확인";
          return email;
        }
      } else {
        emailError.innerText = "확인";
        return email;
      }
    }
  } else {
    return null;
  }
}

function confirmName() {
  const form = document.getElementById("signupForm");

  function containsNumbers(text) {
    return /\d/.test(text);
  }

  if (form) {
    const name = form.elements["name"].value;
    if (
      name.length !== 0 &&
      name.length !== null &&
      containsNumbers(name) === false
    ) {
      return name;
    } else if (name.length === 0 || name.length === null) {
      nameError.innerText = "이름을 입력해주세요";
      return null;
    } else {
      nameError.innerText = "이름이 형식과 맞지않습니다";
      return null;
    }
  }
}
function confirmPassword() {
  const form = document.getElementById("signupForm");

  if (form) {
    const password = form.elements["password"].value;
    const re_password = form.elements["re-password"].value;

    if (password === re_password && password !== "" && re_password !== "") {
      passwordError.innerText = "확인";
      return password;
    } else if (password.length === 0 || re_password.length === 0) {
      passwordError.innerText = "비밀번호를 입력해주세요";
      return null;
    } else {
      passwordError.innerText = "비밀번호가 일치 하지 않습니다";
      return null;
    }
  } else {
    return null;
  }
}

function confirmGender() {
  //radio button from html (gender)
  const genderInputs = document.querySelectorAll('input[name="gender"]');
  const gender = document.getElementById("genderError");
  let selectedGender;
  for (const input of genderInputs) {
    if (input.checked) {
      selectedGender = input.value;
      return selectedGender;
    } else {
      gender.innerText = "성별을 입력해 주세요";
      return null;
    }
  }
}

function confirmPhoneNum() {
  const form = document.getElementById("signupForm");
  const storedUsers = localStorage.getItem("users");
  const parseUsers = JSON.parse(storedUsers);

  if (form) {
    const phone1 = form.elements["phone1"].value;
    const phone2 = form.elements["phone2"].value;
    const phone3 = form.elements["phone3"].value;
    const phoneNum = phone1 + phone2 + phone3;
    const formatPhoneNum =
      phoneNum.slice(0, 3) +
      "-" +
      phoneNum.slice(3, 7) +
      "-" +
      phoneNum.slice(7, 11);

    if (phoneNum.substring(0, 3) !== "010") {
      phoneNumError.innerText = "시작이 010이 아닙니다";
      return null;
    } else if (phoneNum.length !== 11) {
      phoneNumError.innerText = "전화번호 형식이 아닙니다";
      return null;
    } else if (/^\d+$/.test(phoneNum) === false) {
      //check if it contains only digits
      phoneNumError.innerText = "전화번호 형식이 아닙니다";
      return null;
    } else if (storedUsers) {
      const matchingUser = parseUsers.find(
        (user) => user.phoneNum === phoneNum
      );
      if (matchingUser) {
        phoneNumError.innerText = "중복입니다";
        return null;
      } else {
        phoneNumError.innerText = "확인";
        return phoneNum;
      }
    } else {
      phoneNumError.innerText = "확인";
      return phoneNum;
    }
  }
}

function confirmDOB() {
  const form = document.getElementById("signupForm");

  if (form) {
    const year = form.elements["year"].value;
    const month = form.elements["month"].value;
    const day = form.elements["day"].value;

    const DOB = `${year}-${month}-${day}`;

    return DOB;
  }
}

function handleSubmit() {
  const emailValid = confirmEmail();
  const nameValid = confirmName();
  const passwordValid = confirmPassword();
  const genderValid = confirmGender();
  const phoneNumValid = confirmPhoneNum();
  const DOBValid = confirmDOB();

  if (
    !emailValid ||
    !nameValid ||
    !passwordValid ||
    !genderValid ||
    !phoneNumValid ||
    !DOBValid
  ) {
    alert("오류를 확인하고 정보를 다시 입력해 주세요.");
    return false;
  }

  const id = emailValid;
  const name = nameValid;
  const password = passwordValid;
  const gender = genderValid;
  const phoneNum = phoneNumValid;
  const DOB = DOBValid;

  const newUser = {
    id: id, // Use email as the ID
    name: name,
    password: password,
    gender: gender,
    phoneNum: phoneNum,
    DOB: DOB,
  };

  // Store in local storage:
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  document.getElementById("signupForm").reset();

  return true; // Allow form submission
}
