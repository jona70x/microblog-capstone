"use strict";

const postFormContainer = document.querySelector(".create-post-container");

const sendPost = async (inputElement) => {
  const postData = { text: inputElement.value };
  const response = await fetch(
    `https://microbloglite.herokuapp.com/api/posts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }
  );
  const responseInfo = await response.json();
  if (response.ok) {
    inputElement.value = "";
  }
  return response;
};

////////

// Generate posts

const createPostsMarkup = async (postsArray) => {
  postsContainer.innerHTML = "";
  for (const post of postsArray) {
    let likes = post.likes.length;
    const isLiked = !!post.likes.find((like) => like.username === username);

    const formattedDate = new Date(post.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    const avatarUrl = await generateAvatar(post.username);
    const generatedPost = document.createElement("div");
    generatedPost.dataset.postId = post._id;
    generatedPost.id = "post-box";

    generatedPost.innerHTML = `
    <div
      class="col-10 media-body u-shadow-v18 g-bg-secondary g-pa-30 border rounded-5 row d-flex flex-column mx-4 mb-4 fade-in-posts justify-content-center" >
      <div class="col-12 d-flex mb-3 justify-content-between">
        <div class="d-flex">
          <div>
            <img
              class="img-size border border-2 rounded-circle g-mt-3 g-mr-15"
              src=${avatarUrl}
              alt="Avatar"
            />
          </div>

          <div class="g-mb-15">
            <h5 class="h5 g-color-gray-dark-v1 mt-2 mb-0">@${post.username}</h5>
            <span class="g-color-gray-dark-v4 g-font-size-12"
              >${formattedDate}</span
            >
          </div>
        </div>
        <div class="justify-content-end">
          <img src="../assets/icons/three-dots.svg" alt="" />
        </div>
      </div>

      <p>
        ${post.text}
      </p>

      <div class="d-flex my-0 justify-content-between">
      
        <p class='text-muted' onmousehover="showWhoLiked(${post._id})" id='likes-container' data-post-id-likes="${
          post._id
        }" >${likes} People liked this</p>
     
      <div class='d-flex gap-1'>
        <button
          class="svg-container svg-container__like rounded border rounded-circle d-flex align-items-center justify-content-center like-functionality ${
            isLiked ? "liked" : ""
          } "
          data-post-id-liked="${post._id}"
        >
          <div class='like-functionality'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-hand-thumbs-up like-functionality"
              viewBox="0 0 16 16"
            >
              <path
              class='like-functionality'
                d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"
              />
            </svg>
          </div>
        </button>
        <button
          class="svg-container svg-container__delete rounded border rounded-circle d-flex align-items-center justify-content-center delete-functionality"
        >
          <div class='delete-functionality'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash delete-functionality"
              viewBox="0 0 16 16"
            >
              <path
              class='delete-functionality'
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
              />
              <path
              class='delete-functionality'
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
              />
            </svg>
          </div>
        </button>
        </div>
      </div>
    </div>
    `;

    generatedPost.addEventListener("click", async (e) => {
      const targetContainer = e.target;

      if (targetContainer.classList.contains("like-functionality")) {
        const postBox = targetContainer.closest("#post-box");
        const postId = postBox.dataset.postId;
        addLike(postId);
      }

      if (targetContainer.classList.contains("delete-functionality")) {
        const postBox = targetContainer.closest("#post-box");
        const postId = postBox.dataset.postId;
        deletePost(postId);
      }
    });

    postsContainer.appendChild(generatedPost);
  }
};

///////
/// form to create a post

async function generatePostForm(formContainer) {
  const avatar = await generateAvatar(username);
  const postForm = `<form class="mb-4 post-form">
  <div
    class="col-10 media-body u-shadow-v18 g-bg-secondary g-pa-30 border rounded-5 row d-flex flex-column mx-4 mb-4"
  >
    <div class="col-12 d-flex mb-3 justify-content-between p-0">
      <div class="d-flex">
        <div>
          <img
            class="img-size border border-2 rounded-circle g-mt-3 g-mr-15"
            src=${avatar}
            alt="Avatar"
          />
        </div>

        <div class="g-mb-15">
          <h5 class="h5 g-color-gray-dark-v1 mt-2 mb-0">
            @${username}
          </h5>
          <span class="g-color-gray-dark-v4 g-font-size-12"
            >Dump a post in the litter box</span
          >
        </div>
      </div>
    </div>
    <textarea
      required
      minlength='10'
      class="form-control text-muted mb-2"
      name="post-textarea"
      id="post-textarea"
      cols="5"
      rows="5"
      placeholder="What are you meowing about?"
    ></textarea>

    <div class="d-flex my-0 mx-0 gap-1 justify-content-between px-0">
      <div class="d-flex mt-2 gap-1">
        <button
          type="reset"
          class="svg-container svg-container__delete rounded border rounded-circle d-flex align-items-center justify-content-center delete-functionality"
        >
          <div class="delete-functionality">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash delete-functionality"
              viewBox="0 0 16 16"
            >
              <path
                class="delete-functionality"
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
              />
              <path
                class="delete-functionality"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
              />
            </svg>
          </div>
        </button>
        <button
          class="svg-container svg-container__add rounded border rounded-circle d-flex align-items-center justify-content-center add-functionality"
        >
          <div class='add-functionality'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-person-fill-add add-functionality"
              viewBox="0 0 16 16"
            >
              <path class='add-functionality'
                d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path class='add-functionality'
                d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"
              />
            </svg>
          </div>
        </button>
        <button
          class="svg-container svg-container__location rounded border rounded-circle d-flex align-items-center justify-content-center geoposition-functionality"
        >
          <div class='geoposition-functionality'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-geo-alt geoposition-functionality"
              viewBox="0 0 16 16"
            >
              <path
              class='geoposition-functionality'
                d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"
              />
              <path
              class='geoposition-functionality'
                d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
              />
            </svg>
          </div>
        </button>
        <button
          class="svg-container svg-container__reaction rounded border rounded-circle d-flex align-items-center justify-content-center emoji-functionality"
        >
          <div class='emoji-functionality'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-emoji-laughing-fill emoji-functionality"
              viewBox="0 0 16 16"
            >
              <path
              class='emoji-functionality'
                d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5c0 .501-.164.396-.415.235C6.42 6.629 6.218 6.5 6 6.5c-.218 0-.42.13-.585.235C5.164 6.896 5 7 5 6.5 5 5.672 5.448 5 6 5s1 .672 1 1.5zm5.331 3a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zm-1.746-2.765C10.42 6.629 10.218 6.5 10 6.5c-.218 0-.42.13-.585.235C9.164 6.896 9 7 9 6.5c0-.828.448-1.5 1-1.5s1 .672 1 1.5c0 .501-.164.396-.415.235z"
              />
            </svg>
          </div>
        </button>
      </div>

      <div class="d-flex mt-2">
        <button
          class="svg-container svg-container__post rounded border rounded-circle d-flex align-items-center justify-content-center post-functionality"
        >
          <div class="post-functionality">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-send post-functionality"
              viewBox="0 0 16 16"
            >
              <path
                class="post-functionality"
                d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  </div>
</form>`;

  formContainer.innerHTML = postForm;
  const postTextarea = document.querySelector("#post-textarea");
  // Adding Event Listeners to form elements
  document
    .querySelector(".create-post-container")
    .addEventListener("click", async (e) => {
      e.preventDefault();

      const { target } = e;

      // sending a post
      if (target.classList.contains("post-functionality")) {
        if (postTextarea.value.length < 10) {
          alert("Your dump is too short 😿 10 characters minimum");
        } else {
          const responseInfo = await sendPost(postTextarea);
          if (responseInfo.ok && window.location.pathname === "/posts/index.html") {
            postsContainer.innerHTML = ''
            const posts = await getPosts();
            if (posts) {
              createPostsMarkup(posts);
            }
          } else if (
            responseInfo.ok &&
            window.location.pathname === "/profile.html"
          ) {
            const posts = await displayMyPosts();
            if (posts) {
              createPostsMarkup(posts);
            }
          }
        }
      }

      // Reset form
      if (target.classList.contains("delete-functionality")) {
        const postForm = document.querySelector(".post-form");
        postForm.reset();
      }

      if (target.classList.contains("add-functionality")) {
        alert("Looking to tag some kittens in your dump? 😼");
      }
      if (target.classList.contains("emoji-functionality")) {
        alert(
          "Use all the emojis you want!!! That makes the pack happy 😻😽🐱🐈"
        );
      }
      if (target.classList.contains("geoposition-functionality")) {
        const geoposition = navigator.geolocation;
        geoposition.getCurrentPosition((geolocation) => {
          const crd = geolocation.coords;
          const { latitude, longitude } = crd;
          alert(
            `We just smelled your location. Latitude: ${latitude}, longitude: ${longitude} 😼`
          );
        });
      }
    });
}

generatePostForm(postFormContainer);

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function example() {
  console.log("Before delay");

  await delay(2000); // Delay of 2000 milliseconds (2 seconds)

  console.log("After delay");
}
