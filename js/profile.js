"use strict";

let postsContainer = document.querySelector(".posts-container");

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
  
let profileName = document.querySelector(".profile-name");
function displayUsername(){
  profileName.innerHTML = `<h2>${username}</h2>`;
}

function showPostsCount(){
  let postCountLi = document.getElementById("postCount");
  postCountLi.innerHTML = `${postsCount} posts`;
}

function showTotalLikes(){
  let likesLi = document.getElementById("totalLikes");
  let likes = 0;
  for (let i = 0; i < postArray.length; i ++){
    likes += postArray[i].likes.length;
  }
  likesLi.innerHTML = `${likes} likes`
}



const showWhoLiked = async function(postId){
  const posts = await getPosts();
  let likesContainer = document.getElementById("likes-container");
  const likedPost = posts.find((post) => post._id === postId);
  let likedBy = [];
  let likesInPost = likedPost.likes;
  for (let i = 0; i < likesInPost.length; i ++){
    likedBy.push(likesInPost[i].username);
  }
  let likedByString="";
  for (let i = 0; i < likedBy.length; i ++){
    if (i != likedBy.length - 1)
      likedByString = likedByString + likedBy[i] + ", ";
    else
    likedByString += likedBy[i];
  }
  console.log(likedPost);
  console.log(likedByString);

  likesContainer += `<div class="hide">Liked by ${likedByString}</div>`
}
showWhoLiked("649cf2fff9ba080f14e2683c");

console.log(postArray);

// profile pictures
// display liked by
// fix posts count