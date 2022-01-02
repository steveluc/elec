import keys from "../../keys.json";
import { createQueryString } from "./util";
import { BrowserWindow } from "electron";
import axios from "axios";
import express from "express";

export function authenticate(win: BrowserWindow) {
  //authentication code will go here
  let clientId = keys.client_id;
  let redirectURI = "http://localhost/bobify/oauth";
  let scope = "user-read-private user-read-email streaming user-top-read user-read-currently-playing user-read-recently-played user-read-playback-state user-modify-playback-state";

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

  win.webContents.on("will-redirect", async (event, newUrl) => {
    let accessToken = extractToken(newUrl);
    let authInfo = await exchangeToken(accessToken, false);
    process.env.AUTH = JSON.stringify(authInfo);
    win.loadFile("../dist/index.html");
  });
}

function extractToken(url: string) {
  let token = url.split("code=")[1];
  return token;
}

async function exchangeToken(token: string, refresh: boolean) {
  let redirectURI = "http://localhost/bobify/oauth";

  let body = refresh
    ? {
        grant_type: "refresh_token",
        refresh_token: token,
      }
    : {
        code: token,
        redirect_uri: redirectURI,
        grant_type: "authorization_code",
      };

  let base64 = Buffer.from(keys.client_id + ":" + keys.client_secret).toString(
    "base64"
  );

  let config = {
    headers: {
      Authorization: "Basic " + base64,
    },
  };

  let url = "https://accounts.spotify.com/api/token";

  let bearer = await axios.post(url, createQueryString(body), config);

  return bearer.data;
}

export const authRouter = express.Router();

authRouter.get("/refresh/:token", async (req, res) => {
  let result = await exchangeToken(req.params.token, true);
  res.send(result);
});
