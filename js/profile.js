"use strict";

let postsContainer = document.querySelector(".posts-container");

// displayMyPosts();

window.addEventListener("load", async () => {
  const posts = await displayMyPosts();
  createPostsMarkup(posts);
});

function redirectHome() {
  window.location.assign("/posts/");
}
  
let profileName = document.querySelector(".profile-name");
function displayUsername(){
  profileName.innerHTML = `<h2>${username}</h2>`;
}

displayUsername();
  //reload
  //logout/home buttons
  //posts count