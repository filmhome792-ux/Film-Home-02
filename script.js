let movies = JSON.parse(localStorage.getItem("movies")) || [];
let currentMovie = 0;
let adminPass = localStorage.getItem("adminPass") || "1234";

function save() {
  localStorage.setItem("movies", JSON.stringify(movies));
}

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  if (id === "home") loadMovies();
  if (id === "admin") loadAdmin();
  if (id === "details") loadDetails();
  if (id === "player") loadPlayer();
}

function loadMovies() {
  const list = document.getElementById("movieList");
  list.innerHTML = "";
  movies.forEach((m, i) => {
    list.innerHTML += `
      <div class="card" onclick="openDetails(${i})">
        <img src="${m.image}">
        <h3>${m.title}</h3>
      </div>`;
  });
}

function openDetails(i) {
  currentMovie = i;
  showPage("details");
}

function loadDetails() {
  const m = movies[currentMovie];
  document.getElementById("d_title").textContent = m.title;
  document.getElementById("d_image").src = m.image;
  document.getElementById("d_desc").textContent = m.desc;
}

function loadPlayer() {
  const m = movies[currentMovie];
  document.getElementById("p_title").textContent = m.title;
  document.getElementById("p_video").src = m.video || "";
}

function openAdmin() {
  const pass = prompt("رمز مدیریت:");
  if (pass === adminPass) showPage("admin");
  else alert("رمز اشتباه است");
}

function addMovie() {
  const title = document.getElementById("title").value;
  const image = document.getElementById("image").value;
  const desc = document.getElementById("desc").value;
  const video = document.getElementById("video").value;

  if (!title || !image) return alert("نام و عکس اجباری است");

  movies.push({ title, image, desc, video });
  save();
  loadAdmin();
}

function loadAdmin() {
  const list = document.getElementById("adminList");
  list.innerHTML = "";
  movies.forEach((m, i) => {
    list.innerHTML += `
      <div class="card">
        <h3>${m.title}</h3>
        <button onclick="deleteMovie(${i})">حذف</button>
      </div>`;
  });
}

function deleteMovie(i) {
  movies.splice(i, 1);
  save();
  loadAdmin();
}

function changePass() {
  const np = document.getElementById("newPass").value.trim();
  if (!np) return alert("رمز جدید را وارد کن");
  adminPass = np;
  localStorage.setItem("adminPass", np);
  alert("رمز با موفقیت تغییر کرد");
  document.getElementById("newPass").value = "";
}

document.getElementById("search").addEventListener("input", function() {
  const value = this.value.toLowerCase();
  const list = document.getElementById("movieList");
  list.innerHTML = "";
  movies.filter(m => m.title.toLowerCase().includes(value))
    .forEach((m, i) => {
      list.innerHTML += `
        <div class="card" onclick="openDetails(${i})">
          <img src="${m.image}">
          <h3>${m.title}</h3>
        </div>`;
    });
});
