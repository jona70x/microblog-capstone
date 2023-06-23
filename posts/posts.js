/* Posts Page JavaScript */

"use strict";
const postsContainer = document.querySelector(".posts-container");
const { token } = getLoginData();

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
];
const seedStyles = ["Felix", "Aneka"];

const getRandomElement = (queryArr) => {
  const randomIndex = Math.floor(Math.random() * queryArr.length);
  return queryArr[randomIndex];
};

const getPosts = async () => {
  const response = await fetch(`${apiBaseURL}/api/posts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const posts = await response.json();
  console.log(posts);
  return posts;
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

const createPostsMarkup = async () => {
  const posts = await getPosts();

  let html = "";
  for (const post of posts) {
    const formattedDate = new Date(post.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    const avatarUrl = await generateAvatar();
    html += `<div class="col-md-8">
    <div class="media g-mb-30 media-comment">
      <img
        class="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
        src="${avatarUrl}"
        alt="Image Description"
      />
      <div class="media-body u-shadow-v18 g-bg-secondary g-pa-30">
        <div class="g-mb-15">
          <h5 class="h5 g-color-gray-dark-v1 mb-0">${post.username}</h5>
          <span class="g-color-gray-dark-v4 g-font-size-12"
            >${formattedDate}</span
          >
        </div>
    
        <p>
         ${post.text}
        </p>
    
        <ul class="list-inline d-sm-flex my-0">
          <li class="list-inline-item g-mr-20">
            <a
              class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
              href="#!"
            >
              <i class="fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3"></i>
              ${post.likes.length}
            </a>
          </li>
          <li class="list-inline-item g-mr-20">
            <a
              class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
              href="#!"
            >
              <i class="fa fa-thumbs-down g-pos-rel g-top-1 g-mr-3"></i>
              34
            </a>
          </li>
          <li class="list-inline-item ml-auto">
            <a
              class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
              href="#!"
            >
              <i class="fa fa-reply g-pos-rel g-top-1 g-mr-3"></i>
              Reply
            </a>
          </li>
        </ul>
      </div>
    </div>
    </div>
    `;
  }

  postsContainer.insertAdjacentHTML("beforeend", html);
};

createPostsMarkup();
