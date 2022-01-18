import { app, BrowserWindow, ipcMain } from "electron";
import * as express from "express";
import { Request as EReq, Response as ERes } from "express";
import { authenticate, authRouter } from "./auth";
import path from "path";
import { spotifyRouter } from "./spotify";
// import * as fs from "fs";

const eapp = express();
const port = 3008;

eapp.get("/", (req: EReq, res: ERes) => {
  res.send("Hello express world!");
});

eapp.use("/auth", authRouter);
eapp.use("/spotify", spotifyRouter);

eapp.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

// fs.writeFileSync("testnode","Contents!");

function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  }); // and load the index.html of the app.

  win.loadFile("../dist/index.html");

  ipcMain.handle("auth:login", () => {
    authenticate(win);
  });

  ipcMain.handle("auth:authInfo", () => {
    return process.env.AUTH;
  });
}

app.on("ready", createWindow);
