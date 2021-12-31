import { app, BrowserWindow } from "electron";
// import * as fs from "fs";

// fs.writeFileSync("testnode","Contents!");

function createWindow () {
    // Create the browser window.
    let win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    });  // and load the index.html of the app.
    win.loadFile('../dist/index.html');
  }app.on('ready', createWindow);