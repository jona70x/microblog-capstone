
'use strict'


const token = getLoginData().token;
console.log(token);


const divContent = document.getElementById("content");
const newPost = document.getElementById("postInfo");

const sendPost = async () => {
    const postData = {text: newPost.value};
    const response = await fetch(`https://microbloglite.herokuapp.com/api/posts`, {
        method: "POST",
        headers: {Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"},
        body: JSON.stringify(postData),
    });
    const posts = await response.json();
    console.log(posts);
}

const displayMyPosts = async () => {
    const response = await fetch("https://microbloglite.herokuapp.com/api/posts", {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`},
    }); 
    const data = await response.json();
    console.log(data);
    findMyPosts(data);
}

displayMyPosts();
const username = getLoginData().username;


function findMyPosts(array){
    for (let i = 0; i < array.length; i ++){
        if (array[i].username === username){
            console.log(array[i].text);
        }
    }
}

