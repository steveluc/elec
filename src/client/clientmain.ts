import { test } from "./login";

window.addEventListener("load", async () => {
  const body = document.querySelector("body");

  let root = document.createElement("div");
  root.id = "root";

  let authInfo = await (window as any).auth.authInfo();

  if (authInfo === undefined) {
    let loginButton = document.createElement("button");
    loginButton.innerHTML = "Login";
    loginButton.addEventListener("click", () => {
      (window as any).auth.login();
    });
    root.appendChild(loginButton);
  } else {
    let displayAuth = document.createElement("div");
    displayAuth.innerHTML = authInfo;
    root.appendChild(displayAuth);
  }

  body.appendChild(root);
});
