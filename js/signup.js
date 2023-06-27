'use strict'

async function createNewUser() {

    try {
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
    
    const response = await fetch(baseURL, options)
    console.log(response)
   if(response.status === 201){
    window.location.href="signin.html"

   }
    
        
    } catch (error) {
        
    }
  
}