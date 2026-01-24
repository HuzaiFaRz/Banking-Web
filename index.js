var registerPasswordEyeSlash = document.querySelector(
  ".register-password-eye-slash",
);
var loginPasswordEyeSlash = document.querySelector(".login-password-eye-slash");
var registerForm = document.querySelector(".register-form");
var registerUserFirstName = document.querySelector("#Register-First-Name");
var registerUserLastName = document.querySelector("#Register-Last-Name");
var registerUserEmail = document.querySelector("#Register-Email");
var registerUserPassword = document.querySelector("#Register-Password");
var userAcountUserName = document.querySelector(".User-Acount-User-Name");
var loginForm = document.querySelector(".login-form");
var loginUserEmail = document.querySelector("#Login-Email");
var loginUserPassword = document.querySelector("#Login-Password");
var bankContainer = document.querySelector(".bank-container");
var logOutBtn = document.querySelector(".log-out");
var deleteAcountBtn = document.querySelector(".delete-account");
var bankAcountUserName = document.querySelector(".user-bank");
var userBankAcountBalance = document.querySelector(".current-balance-value");
var depositWithdrawInput = document.querySelector(".deposit-withdraw-input");
var depositBtn = document.querySelector(".deposit-btn");
var withDrawBtn = document.querySelector(".withdraw-btn");
var bankError = document.querySelector(".number-error");
const topHeader = document.querySelector(".topHeader");

var formChangeBtn = document.querySelector(".formChangeBtn");
var registerError = document.querySelector(".register-error");
var loginError = document.querySelector(".login-error");
function formChangeHandler() {
  formChangeBtn.addEventListener("click", () => {
    formChangeBtn.classList.toggle("active");
    if (formChangeBtn.classList.contains("active")) {
      formChangeBtn.textContent = "SignUp";
      loginForm.style.display = "flex";
      registerForm.style.display = "none";
    } else {
      formChangeBtn.textContent = "LogIn";
      registerForm.style.display = "flex";
      loginForm.style.display = "none";
    }
  });
}
formChangeHandler();

function regisTerLoginPasswordEye() {
  registerPasswordEyeSlash.addEventListener("click", () => {
    registerPasswordEyeSlash.classList.toggle("register-password-eye");
    if (registerPasswordEyeSlash.classList.contains("register-password-eye")) {
      registerUserPassword.setAttribute("type", "text");
    } else {
      registerUserPassword.setAttribute("type", "password");
    }
  });

  loginPasswordEyeSlash.addEventListener("click", () => {
    loginPasswordEyeSlash.classList.toggle("login-password-eye");
    if (loginPasswordEyeSlash.classList.contains("login-password-eye")) {
      loginUserPassword.setAttribute("type", "text");
    } else {
      loginUserPassword.setAttribute("type", "password");
    }
  });
}
regisTerLoginPasswordEye();

function registerFormLoginForm() {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (registerUserFirstName.value === "") {
      return (registerUserFirstName.style.border = "1px solid red");
    } else if (registerUserLastName.value === "") {
      return (registerUserLastName.style.border = "1px solid red");
    } else if (registerUserEmail.value === "") {
      return (registerUserEmail.style.border = "1px solid red");
    } else if (registerUserPassword.value === "") {
      return (registerUserPassword.style.border = "1px solid red");
    } else if (registerUserPassword.value.length < 8) {
      return (registerError.textContent = "Password Must Be 8 Least");
    } else {
      document.querySelector("input").style.border = "none";
      var userKey = "user_" + registerUserEmail.value;

      if (localStorage.getItem(userKey)) {
        return (
          (registerError.innerHTML = "User Already Exists. Please log in."),
          (registerError.style.color = "red")
        );
      }
      var registerFormDataStore = {
        fName: registerUserFirstName.value,
        lName: registerUserLastName.value,
        email: registerUserEmail.value,
        password: registerUserPassword.value,
        amount: 0,
      };

      localStorage.setItem(userKey, JSON.stringify(registerFormDataStore));

      registerError.innerHTML = "Registered Successful!";
      registerError.style.color = "green";

      registerForm.reset();
      registerForm.style.display = "none";
      loginForm.style.display = "flex";
    }
  });
  // deleteAcountBtn.addEventListener("click", function () {
  //   // location.reload();
  // });
  loginForm.addEventListener("submit", function (j) {
    j.preventDefault();

    if (loginUserEmail.value === "") {
      return (loginUserEmail.style.border = "1px solid red");
    } else if (loginUserPassword.value === "") {
      return (loginUserPassword.style.border = "1px solid red");
    } else {
      document.querySelector("input").style.border = "none";
      var userKey = "user_" + loginUserEmail.value;
      var storedUserData = JSON.parse(localStorage.getItem(userKey));

      if (
        storedUserData &&
        storedUserData.email === loginUserEmail.value &&
        storedUserData.password === loginUserPassword.value
      ) {
        loginError.innerHTML = "Login Successful!";
        loginError.style.color = "green";
        topHeader.style.display = "none";
        function bankAppVisible() {
          loginForm.style.display = "none";
          registerForm.style.display = "none";
          bankContainer.style.display = "flex";
          bankAcountUserName.innerHTML =
            "Hello  " + storedUserData.fName + " " + storedUserData.lName;
        }
        bankAppVisible();
      } else {
        loginError.innerHTML = "User Not Found Register Your Info";
        loginError.style.color = "red";
      }
    }
  });

  logOutBtn.addEventListener("click", function () {
    location.reload();
  });
}
registerFormLoginForm();

var currentBankBalance = 0;

function deposit() {
  depositBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var depositAmount = parseFloat(depositWithdrawInput.value);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      bankError.innerHTML = "Enter a valid deposit amount";
    } else {
      currentBankBalance += depositAmount;
      userBankAcountBalance.innerHTML = currentBankBalance.toFixed(2);
      depositWithdrawInput.value = "";
      bankError.innerHTML = "";
    }
  });
}
deposit();

function withdraw() {
  withDrawBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var withdrawAmount = parseFloat(depositWithdrawInput.value);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      bankError.innerHTML = "Enter a valid withdrawal amount";
    } else if (withdrawAmount > currentBankBalance) {
      bankError.innerHTML = "Insufficient balance";
    } else {
      currentBankBalance -= withdrawAmount;
      userBankAcountBalance.innerHTML = currentBankBalance;
      depositWithdrawInput.value = "";
      bankError.innerHTML = "";
    }
  });
}
withdraw();
