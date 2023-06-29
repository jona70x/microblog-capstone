"use strict";

let postsContainer = document.querySelector(".posts-container");
const profileAvatar = document.querySelector(".profile-avatar");

window.addEventListener("load", async () => {
  const posts = await displayMyPosts();
  createPostsMarkup(posts);
  loadProfile();
  displayUsername();
  showPostsCount();
  showTotalLikes();
});

function redirectHome() {
  window.location.assign("/posts/");
}


// functions for profile header section

let profileName = document.querySelector(".profile-name");
function displayUsername() {
  profileName.innerHTML = `<h2>${username}</h2>`;
}

function showPostsCount() {
  let postCountLi = document.getElementById("postCount");
  postCountLi.innerHTML = `${postsCount} posts`;
}

function showTotalLikes() {
  let likesLi = document.getElementById("totalLikes");
  let likes = 0;
  for (let i = 0; i < postArray.length; i++) {
    likes += postArray[i].likes.length;
  }
  likesLi.innerHTML = `${likes} likes`;
}

//functions for profile user info/bio section
let displayName = document.getElementById("profileDisplayName");
let bio = document.getElementById("profileBio");

function loadProfile(){
  function initialInfo(info){
    if(info.textContent === ""){
      info.textContent = username;
      localStorage.setItem("displayName", username);
    } else if (info.textContent === "bio"){
      localStorage.setItem("bio", bio.textContent);
      info.textContent = localStorage.getItem("bio");
    }
    return info.textContent;
  }
  localStorage.setItem("displayName", initialInfo(displayName));
  
  localStorage.setItem("bio", initialInfo(bio));
}

function editProfile(){
  let buttonsDiv = document.getElementById("editSaveButtons");

  displayName.innerHTML= `<input type="text" id="displayNameInput" placeholder="display name"></input>`;
  bio.innerHTML = `<textarea id="bioInput" placeholder="bio"></textarea>`;
  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  buttonsDiv.appendChild(saveButton);

  let displayNameInput = document.getElementById("displayNameInput");
  let bioInput = document.getElementById("bioInput");
  saveButton.addEventListener("click", saveChanges);

  function saveChanges(){
    localStorage.setItem("displayName", JSON.stringify(displayNameInput.value));
    displayName.innerHTML = `<h3>${displayNameInput.value}</h3>`;

    localStorage.setItem("bio", JSON.stringify(bioInput.value))
    bio.innerHTML = `<div>${bioInput.value}<div>`;
    saveButton.style.visibility = "hidden";
  }
}

const showWhoLiked = async function(postId){
  const posts = await getPosts();
  let likesContainer = document.getElementById("likes-container");
  const likedPost = posts.find((post) => post._id === postId);
  let likedBy = [];
  let likesInPost = likedPost.likes;
  for (let i = 0; i < likesInPost.length; i++) {
    likedBy.push(likesInPost[i].username);
  }
  let likedByString = "";
  for (let i = 0; i < likedBy.length; i++) {
    if (i != likedBy.length - 1)
      likedByString = likedByString + likedBy[i] + ", ";
    else likedByString += likedBy[i];
  }
  likedPost;
  likedByString;

  likesContainer += `<div class="hide">Liked by ${likedByString}</div>`;
};
showWhoLiked("649cf2fff9ba080f14e2683c");

postArray;

window.addEventListener('load', async () => {
  const avatar = await generateAvatar(username)
  profileAvatar.src = avatar
})

// display liked by
// user info
//posts ive liked
