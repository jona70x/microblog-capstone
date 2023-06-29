"use strict";

async function createNewUser() {
  try {
    const baseURL = "https://microbloglite.herokuapp.com/api/users";
    const username = document.getElementById("username").value;
    const fullname = document.getElementById("fullname").value;
    const password = document.getElementById("password").value;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        fullName: fullname,
        password: password,
      }),
    };

    const response = await fetch(baseURL, options);
   
    if (response.status === 201) {
      alert("Meow! Sign up successfully. Sign in to see the posts!");
      window.location.href = "signin.html";
    }

    if (response.status === 400) {
      alert("Meow! Something went wrong. Try again 😿");
    }
  } catch (error) {}
}
