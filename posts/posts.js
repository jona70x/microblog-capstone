/* Posts Page JavaScript */

"use strict";
const postsContainer = document.querySelector(".posts-container");
const addLikeBtn = document.querySelector(".add-like");

const userNameSearch = document.querySelector("#username_search");


window.addEventListener("load", async () => {
  const posts = await getPosts();
  createPostsMarkup(posts);
});

console.log(window.location.pathname);
console.log(userNameSearch);


userNameSearch.addEventListener("keyup", async (e) => {
  
  if (e.keyCode === 13) {
    postsContainer.innerHTML = "";
    const posts = await getPosts();
    const filteredArray = posts.filter((post) =>
      post.username.includes(userNameSearch.value)
    );
    createPostsMarkup(filteredArray);
  }
});
