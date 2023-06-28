/* Posts Page JavaScript */

"use strict";
const postsContainer = document.querySelector(".posts-container");
const logoutBtn = document.querySelector(".logout-btn");
const addLikeBtn = document.querySelector(".add-like");
const profileButton = document.querySelector(".profile-btn");

// logoutBtn.addEventListener("click", () => {
//   alert("You have been logged out");
//   logout();
// });
// profileButton.addEventListener("click", () => {
//   window.location.assign("/profile.html");
// });

window.addEventListener("load", async () => {
  const posts = await getPosts();
  createPostsMarkup(posts);
});

console.log(window.location.pathname);
