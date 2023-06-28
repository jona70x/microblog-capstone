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

//reload
//logout/home buttons
