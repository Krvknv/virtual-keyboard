import "../assets/styles/style.css";
import "../assets/styles/style.scss";
import ruLang from "./keys";

const suitableValues = ruLang.map((item) => item.code);
let lang = window.localStorage.getItem("lang") || "en";
let isCapsLock = false;

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

function createBoard() {
  const board = document.createElement("div");
  board.classList.add("board");
  container.append(board);
}
createBoard();

function createKey(options) {
  const key = document.createElement("div");
  const [lower] = options[lang];
  key.classList.add(options.type);
  key.setAttribute("data-code", options.code);
  key.setAttribute("data-low-ru", options.ru[0]);
  key.setAttribute("data-upper-ru", options.ru[1]);
  key.setAttribute("data-low-en", options.en[0]);
  key.setAttribute("data-upper-en", options.en[1]);
  key.innerHTML = lower;
  return key;
}

const board = document.querySelector(".board");
const textArea = document.querySelector(".textArea");

function renderKeys(keys) {
  keys.forEach((item) => {
    const key = createKey(item);
    board.append(key);
  });
}

renderKeys(ruLang);

function changeLang(language) {
  window.localStorage.setItem("lang", language);
}

board.addEventListener("mousedown", (event) => {
  const curKey = event.target;
  const isDataCode = event.target.hasAttribute("data-code");

  if (isDataCode) {
    const elem = ruLang.find((item) => item.code === curKey.dataset.code);
    curKey.classList.add("pressed");

    switch (elem.type) {
      case "letter":
        textArea.value += elem[lang][event.shiftKey || isCapsLock ? 1 : 0];
        break;
      case "number":
        textArea.value += elem[lang][event.shiftKey ? 1 : 0];
        break;

      case "backspace":
        textArea.value = textArea.value.substring(0, textArea.value.length - 1);
        break;

      case "enter":
        textArea.value += "\n";
        break;

      case "tab":
        textArea.value += "    ";
        break;

      case "capsLock":
        if (!isCapsLock) {
          document.querySelectorAll(".letter").forEach((item) => {
            item.innerHTML = item.getAttribute(`data-upper-${lang}`);
          });
          isCapsLock = true;
        } else {
          document.querySelectorAll(".letter").forEach((item) => {
            item.innerHTML = item.getAttribute(`data-low-${lang}`);
          });
          isCapsLock = false;
        }
        break;
      case "shiftLeft":
      case "shiftRight":
        document.querySelectorAll(".letter").forEach((item) => {
          item.innerHTML = item.getAttribute(`data-upper-${lang}`);
        });
        document.querySelectorAll(".number").forEach((item) => {
          item.innerHTML = item.getAttribute(`data-upper-${lang}`);
        });
        break;
      case "space":
        textArea.value += " ";
        break;
      case "arrow":
        textArea.value += curKey.innerHTML;
        break;
      default:
        console.log("default");
    }
  }
});

board.addEventListener("mouseup", (event) => {
  document.querySelectorAll(".pressed")?.forEach((el) => {
    el.classList.remove("pressed");
  });
  if (
    event.target.classList.contains("shiftLeft") ||
    event.target.classList.contains("shiftRight")
  ) {
    document.querySelectorAll(".letter").forEach((item) => {
      item.innerHTML = item.getAttribute(`data-low-${lang}`);
    });
    document.querySelectorAll(".number").forEach((item) => {
      item.innerHTML = item.getAttribute(`data-low-${lang}`);
    });
  }
});

document.addEventListener("keydown", (event) => {
  if (suitableValues.includes(event.code)) {
    event.preventDefault();
    if (event.code === "AltLeft" || event.code === "AltRight") {
      event.preventDefault();
    }
    if (event.code === "Tab") {
      textArea.value += "    ";
    }
    const key = document.querySelector(`[data-code=${event.code}]`);

    key.classList.add("pressed");
    if (key.classList.contains("arrow")) {
      textArea.value += key.innerHTML;
    }
    if (key.classList.contains("letter")) {
      textArea.value += key.getAttribute(
        `data-${event.shiftKey || isCapsLock ? "upper" : "low"}-${lang}`
      );
    }
    if (key.classList.contains("number")) {
      textArea.value += key.getAttribute(
        `data-${event.shiftKey ? "upper" : "low"}-${lang}`
      );
    }
    if (
      key.classList.contains("shiftLeft") ||
      key.classList.contains("shiftRight")
    ) {
      document.querySelectorAll(".letter").forEach((item) => {
        item.innerHTML = item.getAttribute(`data-upper-${lang}`);
      });
      document.querySelectorAll(".number").forEach((item) => {
        item.innerHTML = item.getAttribute(`data-upper-${lang}`);
      });
    }
    if (key.classList.contains("backspace")) {
      textArea.value = textArea.value.substring(0, textArea.value.length - 1);
    }
    if (key.classList.contains("space")) {
      textArea.value += " ";
    }
    if (key.classList.contains("enter")) {
      textArea.value += "\n";
    }
    if (event.ctrlKey && event.altKey) {
      const languages = {
        en: "ru",
        ru: "en",
      };
      lang = languages[lang];
      changeLang(lang);
      document.querySelectorAll(".letter").forEach((item) => {
        item.innerHTML = item.getAttribute(
          `data-${event.shiftKey || isCapsLock ? "upper" : "low"}-${lang}`
        );
      });
    }
  }
});
document.addEventListener("keyup", (event) => {
  if (suitableValues.includes(event.code)) {
    const key = document.querySelector(`[data-code=${event.code}]`);
    key.classList.remove("pressed");
    if (event.code === "CapsLock") {
      if (!isCapsLock) {
        document.querySelectorAll(".letter").forEach((item) => {
          item.innerHTML = item.getAttribute(`data-upper-${lang}`);
        });
        isCapsLock = true;
      } else {
        document.querySelectorAll(".letter").forEach((item) => {
          item.innerHTML = item.getAttribute(`data-low-${lang}`);
        });
        isCapsLock = false;
      }
    }
    if (!isCapsLock) {
      if (
        key.classList.contains("shiftLeft") ||
        key.classList.contains("shiftRight")
      ) {
        document.querySelectorAll(".letter").forEach((item) => {
          item.innerHTML = item.getAttribute(`data-low-${lang}`);
        });
        document.querySelectorAll(".number").forEach((item) => {
          item.innerHTML = item.getAttribute(`data-low-${lang}`);
        });
      }
    } else {
      document.querySelectorAll(".number").forEach((item) => {
        item.innerHTML = item.getAttribute(`data-low-${lang}`);
      });
    }
  }
});

function createText() {
  const text = document.createElement("p");
  text.classList.add("text");
  text.innerHTML =
    "Клавиатура создана в операционной системе Windows <br> Для переключения языка комбинация: левыe ctrl + alt";
  container.append(text);
}

createText();
window.addEventListener("DOMContentLoaded", () => {
  textArea.focus();
});
