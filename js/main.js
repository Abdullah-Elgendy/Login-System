//======== Variables ========
//login fields
var loginEmail = document.querySelector("#loginEmail");
var loginPassword = document.querySelector("#loginPassword");

//register fields
var registerName = document.querySelector("#registerName");
var registerEmail = document.querySelector("#registerEmail");
var registerPassword = document.querySelector("#registerPassword");

//displayed username
var userName = document.querySelector("#userName");

//signup and login buttons
var signUpBtn = document.querySelector("#signUpBtn");
var loginBtn = document.querySelector("#loginBtn");

//accounts JSON
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
    document.querySelector(".name-error").classList.replace("d-none", "d-block");
    registerName.classList.remove("is-valid");
    registerName.classList.add("is-invalid");
  } else {
    document.querySelector(".name-error").classList.replace("d-block", "d-none");
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
    document.querySelector(".email-error").classList.replace("d-none", "d-block");
    registerEmail.classList.remove("is-valid");
    registerEmail.classList.add("is-invalid");
    return false;
  } 
  else {
    document.querySelector(".email-error").classList.replace("d-block", "d-none");
    return emailUnique();
  }
}

//function to check if email already exists
function emailUnique() {
  for (var i = 0; i < accounts.length; i++) {
    if (registerEmail.value == accounts[i].email) {
      document.querySelector(".email-exists").classList.replace("d-none", "d-block");
      registerEmail.classList.remove("is-valid");
      registerEmail.classList.add("is-invalid");
      return false;
    }
  }
  document.querySelector(".email-exists").classList.replace("d-block" , "d-none");
  registerEmail.classList.remove("is-invalid");
  registerEmail.classList.add("is-valid");
  return true;
}

//password length between 8-30
//must contain at least one character (?=.*[a-z]) and at least one digit (?=.*\d)
//can't contain white spaces (?=\S+)
function validPassword(){
  var pattern = /^(?=.*[a-z])(?=.*\d)(?=\S+)[A-Za-z\d@.#$!%*?&]{8,30}$/;
  var result = pattern.test(registerPassword.value);
  if (!result) {
    document.querySelector(".password-error").classList.replace("d-none", "d-block");
    registerPassword.classList.remove("is-valid");
    registerPassword.classList.add("is-invalid");
  } else {
    document.querySelector(".password-error").classList.replace("d-block", "d-none");
    registerPassword.classList.remove("is-invalid");
    registerPassword.classList.add("is-valid");
  }
  return result;
}

//======== Functions ========

function addAccount() {
  var account = {
    name: registerName.value,
    email: registerEmail.value,
    password: registerPassword.value,
  };
  accounts.push(account);
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("accounts", JSON.stringify(accounts));
}

//======== Event Listeners ========

//event listener to call validation functions when signing up
signUpBtn.addEventListener("click", function () {
  if (validName() && validEmail() && validPassword()) {
    addAccount();
  } else {
    console.log("invalid");
  }
});
