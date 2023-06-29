"use strict";

let postsContainer = document.querySelector(".posts-container");
<<<<<<<<< Temporary merge branch 1
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
    const response = await fetch("https://microbloglite.herokuapp.com/api/posts?limit=500", {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`},
    }); 
    const data = await response.json();
    // console.log(data);
    const username = getLoginData().username;
    let postArray = [];
    for (let i = 0; i < data.length; i ++){
        if (data[i].username === username){
            // divContent.innerHTML += `@${data[i].username}, ${data[i].createdAt}, ${data[i].text} <br>`;
            postArray.push(data[i]);
            console.log(data[i]);
        }
    }
    return postArray;
}
=========
>>>>>>>>> Temporary merge branch 2

// displayMyPosts();

window.addEventListener("load", async () => {
  const posts = await displayMyPosts();
  createPostsMarkup(posts);
  displayUsername();
  showPostsCount();
  showTotalLikes();
});

function redirectHome() {
  window.location.assign("/posts/");
}
  
  //reload
  //logout/home buttons
=========

//reload
//logout/home buttons
>>>>>>>>> Temporary merge branch 2

  //consistent profile pictures