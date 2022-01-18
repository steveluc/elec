import express from "express";
import axios from "axios";

export const spotifyRouter = express.Router();

spotifyRouter.get("/play", async (req, res) => {
  let authInfo = JSON.parse(process.env.AUTH);

  let config = {
    headers: {
      Authorization: `Bearer ${authInfo.access_token}`,
    },
  };

  let trackInfo = {};
  let deviceId = "1b2e644d3af5204592ccf17e80b88caad9da59bc";

  try {
    let spotifyResult = await axios.put(
      `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      trackInfo,
      config
    );

    res.send(spotifyResult.data);
  } catch (e) {
    res.send(e.response.data);
  }
});

spotifyRouter.get("/pause", async (req, res) => {
  let authInfo = JSON.parse(process.env.AUTH);
  let deviceId = "1b2e644d3af5204592ccf17e80b88caad9da59bc";

  let config = {
    headers: {
      Authorization: `Bearer ${authInfo.access_token}`,
    },
  };

  try {
    let spotifyResult = await axios.put(
      `https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`,
      {},
      config
    );

    res.send(spotifyResult.data);
  } catch (e) {
    res.send(e.response.data);
  }
});

spotifyRouter.get("/devices", async (req, res) => {
  let authInfo = JSON.parse(process.env.AUTH);

  let config = {
    headers: {
      Authorization: `Bearer ${authInfo.access_token}`,
    },
  };

  try {
    let spotifyResult = await axios.get(
      `https://api.spotify.com/v1/me/player/devices`,
      config
    );

    res.send(spotifyResult.data);
  } catch (e) {
    res.send(e.response.data);
  }
});

spotifyRouter.get("/playback", async (req, res) => {
  let authInfo = JSON.parse(process.env.AUTH);

  let config = {
    headers: {
      Authorization: `Bearer ${authInfo.access_token}`,
    },
  };

  try {
    let spotifyResult = await axios.get(
      `https://api.spotify.com/v1/me/player`,
      config
    );
    res.send(spotifyResult.data);
  } catch (e) {
    res.send(e.response.data);
  }
});

spotifyRouter.get("/next", async (req, res) => {
  let authInfo = JSON.parse(process.env.AUTH);

  let config = {
    headers: {
      Authorization: `Bearer ${authInfo.access_token}`,
    },
  };

  try {
    let spotifyResult = await axios.post(
      `https://api.spotify.com/v1/me/player/next`,
      {},
      config
    );

    res.send(spotifyResult.data);
  } catch (e) {
    res.send(e.response.data);
  }
});

spotifyRouter.get("/previous", async (req, res) => {
  let authInfo = JSON.parse(process.env.AUTH);

  let config = {
    headers: {
      Authorization: `Bearer ${authInfo.access_token}`,
    },
  };

  try {
    let spotifyResult = await axios.post(
      `https://api.spotify.com/v1/me/player/previous`,
      {},
      config
    );

    res.send(spotifyResult.data);
  } catch (e) {
    res.send(e.response.data);
  }
});
