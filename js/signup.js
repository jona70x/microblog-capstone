'use strict'

function createNewUser() {
    const baseURL = "https://microbloglite.herokuapp.com/api/users";
    const username = document.getElementById("username").value;
    const fullname = document.getElementById("fullname").value;
    const password = document.getElementById("password").value;
    
    const options = {
        method: "POST",
        headers: {
         "Content-Type": "application/json"},
        body: JSON.stringify({
            "username": username,
            "fullName": fullname,
            "password": password
        })
    }

fetch(baseURL, options) 
    .then(response => response.json())
    .then(window.location.href="signin.html")
}