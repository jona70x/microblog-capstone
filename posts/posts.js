/* Posts Page JavaScript */

"use strict";
const postsContainer = document.querySelector(".posts-container");
const addLikeBtn = document.querySelector(".add-like");
const userNameSearch = document.querySelector("#username_search");
const sortPostDropdown = document.querySelector("#sort-posts");

window.addEventListener("load", async () => {
  const posts = await getPosts();
  sortByLatestPosts(posts);
  createPostsMarkup(posts);
});

window.location.pathname;
userNameSearch;

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

function sortByLatestPosts(posts) {
  return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function sortByOldestPosts(posts) {
  return posts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
}

sortPostDropdown.addEventListener("change", async () => {
  const selectedIndex = sortPostDropdown.selectedIndex;
  const selectedOption = sortPostDropdown[selectedIndex];

  if (selectedOption.value === "latest") {
    const posts = await getPosts();
    sortByLatestPosts(posts);
    postsContainer.innerHTML = "";
    createPostsMarkup(posts);
  }
  if (selectedOption.value === "oldest") {
    const posts = await getPosts();
    sortByOldestPosts(posts);
    postsContainer.innerHTML = "";
    createPostsMarkup(posts);
  }
});
