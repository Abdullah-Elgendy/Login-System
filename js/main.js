//======== Variables ========
//login fields
var loginEmail = document.querySelector("#loginEmail");
var loginPassword = document.querySelector("#loginPassword");

//register fields
var registerName = document.querySelector("#registerName");
var registerEmail = document.querySelector("#registerEmail");
var registerPassword = document.querySelector("#registerPassword");

//home displayed username
var userName = document.querySelector("#userName");

//signup, login and logout buttons
var signUpBtn = document.querySelector("#signUpBtn");
var loginBtn = document.querySelector("#loginBtn");
var logOutBtn = document.querySelector("#logOutBtn");

//logged in user
var loginUser = null;

//if loginUser exists
if (JSON.parse(sessionStorage.getItem("loginUser"))) {
  //get loginUser from sessionStorage
  loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

  //if path is not index.html and not /
  if (
    window.location.pathname != "/index.html" &&
    window.location.pathname != "/"
  ) {
    //open index.html and display the name
    displayHome();
  } else {
    //if path is already correct then just display the name
    userName.innerHTML = `Welcome ${loginUser.name}`;
  }
  //else if loginUser doesn't exist
} else {
  //if path is index.html or /
  if (
    window.location.pathname == "/index.html" ||
    window.location.pathname == "/"
  )
    //redirect to login page
    window.open("./login.html", "_self");
}

//accounts array
var accounts = [];

if (JSON.parse(localStorage.getItem("accounts"))) {
  accounts = JSON.parse(localStorage.getItem("accounts"));
}

//======== Validation Functions ========

//name length must be between 3-30 characters
//name can't contain special characters or white space, except for _
//name can't start with a number
function validName() {
  var pattern = /^[a-zA-Z][a-zA-Z0-9_]{2,30}$/;
  var result = pattern.test(registerName.value);
  if (!result) {
    document
      .querySelector(".name-error")
      .classList.replace("d-none", "d-block");
    registerName.classList.remove("is-valid");
    registerName.classList.add("is-invalid");
  } else {
    document
      .querySelector(".name-error")
      .classList.replace("d-block", "d-none");
    registerName.classList.remove("is-invalid");
    registerName.classList.add("is-valid");
  }
  return result;
}

//email format must be valid and unique
function validEmail() {
  var pattern = /^[\w.%+-]+@[a-zA-Z0-9.-]{2,}.[a-zA-Z]{2,}$/;
  var result = pattern.test(registerEmail.value);
  if (!result) {
    document
      .querySelector(".email-error")
      .classList.replace("d-none", "d-block");
    registerEmail.classList.remove("is-valid");
    registerEmail.classList.add("is-invalid");
    return false;
  } else {
    document
      .querySelector(".email-error")
      .classList.replace("d-block", "d-none");
    return emailUnique();
  }
}

//function to check if email already exists
function emailUnique() {
  for (var i = 0; i < accounts.length; i++) {
    if (registerEmail.value == accounts[i].email) {
      document
        .querySelector(".email-exists")
        .classList.replace("d-none", "d-block");
      registerEmail.classList.remove("is-valid");
      registerEmail.classList.add("is-invalid");
      return false;
    }
  }
  document
    .querySelector(".email-exists")
    .classList.replace("d-block", "d-none");
  registerEmail.classList.remove("is-invalid");
  registerEmail.classList.add("is-valid");
  return true;
}

//password length between 8-30
//must contain at least one character (?=.*[a-z]) and at least one digit (?=.*\d)
//can't contain white spaces (?=\S+)
function validPassword() {
  var pattern = /^(?=.*[a-z])(?=.*\d)(?=\S+)[A-Za-z\d@.#$!%*?&]{8,30}$/;
  var result = pattern.test(registerPassword.value);
  if (!result) {
    document
      .querySelector(".password-error")
      .classList.replace("d-none", "d-block");
    registerPassword.classList.remove("is-valid");
    registerPassword.classList.add("is-invalid");
  } else {
    document
      .querySelector(".password-error")
      .classList.replace("d-block", "d-none");
    registerPassword.classList.remove("is-invalid");
    registerPassword.classList.add("is-valid");
  }
  return result;
}

//======== Functions ========

//function to add account to array
function addAccount() {
  var account = {
    name: registerName.value,
    email: registerEmail.value,
    password: registerPassword.value,
  };
  accounts.push(account);
  saveToLocalStorage();
}

//function to check if user exists to log in
function loginAccount() {
  for (var i = 0; i < accounts.length; i++) {
    if (
      loginEmail.value.toLowerCase() == accounts[i].email.toLowerCase() &&
      loginPassword.value == accounts[i].password
    ) {
      loginUser = accounts[i];
      //save the account in session storage
      sessionStorage.setItem("loginUser", JSON.stringify(loginUser));
      return true;
    }
  }
  return false;
}

//function to save updated array in local storage
function saveToLocalStorage() {
  localStorage.setItem("accounts", JSON.stringify(accounts));
}

//function to open index.html and display the username in the homepage
function displayHome() {
  window.open("./index.html", "_self");
  userName.innerHTML = `Welcome ${loginUser.name}`;
}

//function to log out user
function logOutAccount() {
  sessionStorage.removeItem("loginUser");
  window.open("./login.html", "_self");
}

//======== Event Listeners ========

//event listener on sign up button to call validation functions when signing up
if (signUpBtn != null) {
  signUpBtn.addEventListener("click", function () {
    if (validName() && validEmail() && validPassword()) {
      addAccount();
      window.open("./login.html", "_self");
    }
  });
}

//event listener on log in button to check if user exists
if (loginBtn != null) {
  loginBtn.addEventListener("click", function () {
    if (loginAccount()) {
      document
        .querySelector(".invalid-login")
        .classList.replace("d-block", "d-none");
        loginEmail.classList.remove("is-invalid");
        loginPassword.classList.remove("is-invalid");
      displayHome();
    } else {
      document
        .querySelector(".invalid-login")
        .classList.replace("d-none", "d-block");
        loginEmail.classList.add("is-invalid");
        loginPassword.classList.add("is-invalid");
    }
  });
}

//event listener on log out button
if (logOutBtn != null) {
  logOutBtn.addEventListener("click", function () {
    logOutAccount();
  });
}
