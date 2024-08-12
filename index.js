const posts = [];

const TITLE_VALIDATION_LIMIT = 20;
const TEXT_VALIDATION_LIMIT = 100;

const postTitleInputNode = document.querySelector(".js-post-title-input");
const postTextInputNode = document.querySelector(".js-post-text-input");
const newPostBtnNode = document.querySelector(".js-new-post-btn");
const postsNode = document.querySelector(".js-posts");
const validationMessage = document.getElementById("validationMessage");

newPostBtnNode.addEventListener("click", function () {
  //получить данные из поля ввода
  const postFromUser = getPostFromUser();

  addPost(postFromUser);

  renderPosts();
});

postTitleInputNode.addEventListener("input", function () {
  validation();
});

postTextInputNode.addEventListener("input", function () {
  validation();
});

function validation() {
  const titlelen = postTitleInputNode.value.length;
  const textlen = postTextInputNode.value.length;

  if (titlelen > TITLE_VALIDATION_LIMIT) {
    validationMessage.innerText = `Длина заголовка не должа перевышать ${TITLE_VALIDATION_LIMIT} символов`;
    validationMessage.classList.remove("validationMessage_hidden");
    return;
  }

  if (textlen > TITLE_VALIDATION_LIMIT) {
    validationMessage.innerText = `Длина текста не должа перевышать ${TEXT_VALIDATION_LIMIT} символов`;
    validationMessage.classList.remove("validationMessage_hidden");
    return;
  }

  //Если данные валидны, скрыть сообщение об ошибке
  validationMessage.classList.add("validationMessage_hidden");
}
// сохранить пост

// отобразить пост

function getPostFromUser() {
  const title = postTitleInputNode.value;
  const text = postTextInputNode.value;

  return {
    title: title,
    text: text,
  };
}

function addPost({ title, text }) {
  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();

  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");

  const dt = `${day}.${month}.${year} ${hours}:${minutes}`;

  posts.push({
    dt,
    title,
    text,
  });
}

function getPosts() {
  return posts;
}

function renderPosts() {
  const posts = getPosts();

  let postsHTML = "";

  posts.forEach((post) => {
    postsHTML += `
  <div class='post'>
    <p class='post_date'>${post.dt}</p>
    <p class="post_title">${post.title}</p>
    <p class="post_text">${post.text}</p>
  </div>
  `;
  });

  postsNode.innerHTML = postsHTML;
}
