import { app, BrowserWindow } from "electron";
import * as express from "express";
import { Request as EReq, Response as ERes } from "express";
import keys from "../../keys.json";
import { createQueryString } from "./util";
// import * as fs from "fs";

const eapp = express();
const port = 3008;

eapp.get("/", (req: EReq, res: ERes) => {
  res.send("Hello express world!");
});

eapp.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

// fs.writeFileSync("testnode","Contents!");

function authenticate(win: BrowserWindow) {
  //authentication code will go here
  let clientId = keys.client_id;
  let redirectURI = "http://localhost/bobify/oauth";
  let scope = "user-read-private user-read-email";

  let params = {
    response_type: "code",
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectURI,
  };

  let authorizeURL =
    "https://accounts.spotify.com/authorize?" + createQueryString(params);

  win.loadURL(authorizeURL);

  // We might need to handle this case hopeuflly not
  // win.webContents.on("did-redirect-navigation", function (event, newUrl) {
  //   console.log(newUrl);
  //   // More complex code to handle tokens goes here
  // });

  win.webContents.on("will-redirect", (event, newUrl) => {
    console.log(newUrl);
    win.loadFile("../dist/index.html");
  });
}

function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  }); // and load the index.html of the app.

  win.loadFile("../dist/index.html");
}

app.on("ready", createWindow);
