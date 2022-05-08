import "../assets/styles/style.css";
import "../assets/styles/style.scss";

function createContainer() {
  const container = document.createElement("div");
  container.classList.add("container");
  document.body.append(container);
}
createContainer();
const container = document.querySelector(".container");
function createTextArea() {
  const textArea = document.createElement("textarea");
  textArea.classList.add("textArea");
  textArea.rows = 13;
  textArea.cols = 60;
  container.append(textArea);
}
createTextArea();
