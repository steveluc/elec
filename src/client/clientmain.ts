import { viewPlayer } from "./viewplayer";

window.addEventListener("load", async () => {
  const body = document.querySelector("body");

  let root = document.createElement("div");
  root.id = "root";

  let authInfo = await (window as any).auth.authInfo();
  window.localStorage.setItem("authInfo", authInfo);
  authInfo = window.localStorage.getItem("authInfo");

  if (authInfo === "undefined") {
    let loginButton = document.createElement("button");
    loginButton.innerHTML = "Login";
    loginButton.addEventListener("click", () => {
      (window as any).auth.login();
    });
    root.appendChild(loginButton);
  } else {
    // This is where main view panes will be rendered
    let navbar = document.createElement("div");
    root.appendChild(navbar);

    interface viewgoo {
      [key: string]: () => Promise<HTMLElement>;
    }

    let views: viewgoo = {
      player: viewPlayer,
      search: viewSearch,
    };
    interface OC2 extends ObjectConstructor {
      keys2<T extends object>(o: T): (keyof T)[];
    }

    interface Shape {
      area(): number;
    }

    interface Circle extends Shape {
      radius: number;
    }

    let ga = function getArea<T extends Shape>(sh: T) {
      return sh.area();
    };
    ga({ area: () => 2 });

    let o2 = Object as OC2;
    Object.keys(views).forEach((key) => {
      let cButton = document.createElement("button");
      cButton.addEventListener("click", async () => {
        render(container, await views[key]());
      });
      cButton.innerHTML = key;
      navbar.appendChild(cButton);
    });

    let container = document.createElement("div");
    root.appendChild(container);
    render(container, await viewPlayer());

    // navbar contains buttons, buttons onclick renders each
    // view plane for the corresponding button allowing changing
    // of views

    // authInfo = JSON.parse(authInfo);
    // let refreshButton = document.createElement("button");
    // refreshButton.innerHTML = "Refresh";
    // refreshButton.addEventListener("click", () => {
    //   axios.get(`http://localhost:3008/auth/refresh/${authInfo.refresh_token}`);
    // });
    // root.appendChild(refreshButton);
  }

  body.appendChild(root);
});

function render(parent: HTMLElement, child: HTMLElement) {
  clearElement(parent);
  parent.appendChild(child);
}

function clearElement(element: HTMLElement) {
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
  return element;
}

async function viewSearch() {
  let container = document.createElement("div");
  container.innerHTML = "ViewSearch";
  return container;
}
