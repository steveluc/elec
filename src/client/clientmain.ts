import axios from "axios";

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

    authInfo = JSON.parse(authInfo);
    let refreshButton = document.createElement("button");
    refreshButton.innerHTML = "Refresh";
    refreshButton.addEventListener("click", () => {
      axios.get(`http://localhost:3008/auth/refresh/${authInfo.refresh_token}`);
    });

    root.appendChild(refreshButton);
  }

  body.appendChild(root);
});
