"use strict";

const loginBtn = document.querySelector("#loginButton");
const username = document.querySelector("#username");
const password = document.querySelector("#password");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const loginData = { username: username.value, password: password.value };
  login(loginData);
});
