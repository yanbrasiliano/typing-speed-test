const text = document.querySelector("#text");
const areaText = document.querySelector("#value");
const restart = document.querySelector("#restart");
const result = document.querySelector("#result");
const historic = document.querySelector("#historic");
const theme = document.querySelector("#theme");

const texts = [
  "Example text to type",
  "Another example of text to type",
  "Type this",
  "You can type this here",
];

function newText() {
  const index = Math.floor(Math.random() * texts.length);
  areaText.focus();
  text.textContent = texts[index];
}

function isProgressTest() {
  return JSON.parse(localStorage.getItem("progress")) || false;
}

function setProgressTest(areaText) {
  localStorage.setItem("progress", JSON.stringify(areaText));
}

function start() {
  if (!isProgressTest()) {
    localStorage.setItem("start", new Date().getTime());
    setProgressTest(true);
  }
}

function verify() {
  const end = new Date().getTime();
  const spent = (end - parseInt(localStorage.getItem("start"))) / 1000;
  result.textContent = `Congratulations! You took ${spent.toPrecision(
    2
  )} seconds.`;

  addHistoric(text.textContent, spent);
  setProgressTest(false);
  areaText.value = "";
  newText();
}

function addHistoric(typingText, end) {
  const item = document.createElement("p");
  item.textContent = `Text: "${typingText}" - Time: ${end} seconds`;
  historic.appendChild(item);
}

function update() {
  start();
  const { value } = areaText;
  if (value === text.textContent) {
    verify();
  }
}

function restartGame() {
  areaText.value = "";
  result.textContent = "";
  newText();
  setProgressTest(false);
  historic.innerHTML = "";
}

function changeTheme() {
  if (document.body.classList.contains("default")) {
    document.body.classList.toggle("dark");
    button = document.getElementById("theme");
    button.innerHTML = "Dark";
  }
  if (document.body.classList.contains("dark")) {
    document.body.classList.toggle("default");
    button = document.getElementById("theme");
    button.innerHTML = "Light";
  }
}

function close() {
  console.log("close");
  alert.classList.add("hide");
}

areaText.addEventListener("keyup", () => update());
restart.addEventListener("click", () => restartGame());
theme.addEventListener("click", () => changeTheme());

newText();
