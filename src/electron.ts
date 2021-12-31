import { app, BrowserWindow } from "electron";
import * as express from "express";
import { Request as EReq, Response as ERes } from "express";
// import * as fs from "fs";

const eapp = express();
const port = 3008;

eapp.get( "/", ( req: EReq, res: ERes ) => {
  res.send( "Hello express world!" );
} );

eapp.listen( port, () => {
  console.log( `server started at http://localhost:${ port }` );
} );

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
  }
  
  app.on('ready', createWindow);