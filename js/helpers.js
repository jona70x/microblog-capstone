"use strict";

// This file  contains the helpers functions to generate avatars, posts, and the functionality that posts and profile sharte.  It will make it available for everyone to use.
let { token, username } = getLoginData();

const avatarStyles = [
  "big-smile",
  "bottts",
  "fun-emoji",
  "big-ears",
  "micah",
  "thumbs",
  "pixel-art",
  "personas",
  "miniavs",
  "adventurer",
  "shapes",
  "adventurer-neutral",
  "avataaars",
  "big-ears",
];
const seedStyles = ["Felix", "Aneka"];

const getRandomElement = (queryArr) => {
  const randomIndex = Math.floor(Math.random() * queryArr.length);
  return queryArr[randomIndex];
};

const generateAvatar = async () => {
  const response = await fetch(
    `https://api.dicebear.com/6.x/${getRandomElement(
      avatarStyles
    )}/svg?seed=${getRandomElement(seedStyles)}`
  );
  const { url } = response;
  return url;
};

const addLike = async function (postId) {
  let response;
  const postObject = { postId: postId };
  const likeButton = document.querySelector(`[data-post-id-liked='${postId}'`);
  const posts = await getPosts();
  let likes;
  const likedPost = posts.find((post) => post._id === postId);
  const likeId = likedPost.likes.find((like) => like.postId === likedPost._id);
  likes = likedPost.likes.length;
  const likesContainer = document.querySelector(
    `[data-post-id-likes='${postId}']`
  );

  if (!likeButton.classList.contains("liked")) {
    response = await fetch(apiBaseURL + "/api/likes", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postObject),
    });
    if (response.ok) {
      likeButton.classList.add("liked");
      likes++;
      likesContainer.textContent = `${likes} People liked this`;
    }
  } else {
    response = await fetch(apiBaseURL + "/api/likes/" + likeId._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postObject),
    });
    likeButton.classList.remove("liked");
    likes--;
    likesContainer.textContent = `${likes} People liked this`;
  }
  return response;
};

const deletePost = async (postId) => {
  const postToDelete = document.querySelector(`[data-post-id="${postId}"]`);

  const confirmation = confirm("Are you sure you want to delete this post? 😿");

  if (confirmation) {
    const response = await fetch(apiBaseURL + "/api/posts/" + postId, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId }),
    });

    if (response.ok) {
      postToDelete.classList.add("fade-in-animation");

      setTimeout(function () {
        postToDelete.remove();
      }, 500);
    }
  }
};

// Get all posts

const getPosts = async () => {
  const response = await fetch(`${apiBaseURL}/api/posts?limit=600`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const posts = await response.json();
  return posts;
};

// Sammi's function
const displayMyPosts = async () => {
  const response = await fetch(
    "https://microbloglite.herokuapp.com/api/posts?limit=500",
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const data = await response.json();
  // console.log(data);
  const username = getLoginData().username;
  let postArray = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].username === username) {
      // divContent.innerHTML += `@${data[i].username}, ${data[i].createdAt}, ${data[i].text} <br>`;
      postArray.push(data[i]);
      console.log(data[i]);
    }
  }
  return postArray;
};