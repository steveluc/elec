import { test } from "./login";

window.addEventListener("load", () => {
  const body = document.querySelector("body");

  let root = document.createElement("div");
  root.id = "root";

  let loginButton = document.createElement("button");
  loginButton.innerHTML = "Login";
  loginButton.addEventListener("click", () => {
    test();
  });
  root.appendChild(loginButton);

  body.appendChild(root);
});
