class ViewPlayerState {}
import axios from "axios";

export async function viewPlayer() {
  let container = document.createElement("div");

  let trackDisplay = document.createElement("img");
  trackDisplay.src =
    "https://i.scdn.co/image/ab67616d0000b273318443aab3531a0558e79a4d";
  container.appendChild(trackDisplay);

  let trackName = document.createElement("span");
  trackName.innerHTML = "Shake it Off";
  container.appendChild(trackName);

  let state = await (
    await axios.get("http://localhost:3008/spotify/playback")
  ).data;
  trackName.innerHTML = (state as any).item.name;
  trackDisplay.src = (state as any).item.album.images[0].url;

  let playbackButton = document.createElement("button");
  playbackButton.innerHTML = "Play/Pause";
  playbackButton.addEventListener("click", async () => {
    let state = await (
      await axios.get("http://localhost:3008/spotify/playback")
    ).data;
    trackName.innerHTML = (state as any).item.name;
    trackDisplay.src = (state as any).item.album.images[0].url;
    let playbackState = "play";
    if ((state as any).is_playing) {
      playbackState = "pause";
    }
    await axios.get(`http://localhost:3008/spotify/${playbackState}`);
  });
  container.appendChild(playbackButton);

  let nextButton = document.createElement("button");
  nextButton.addEventListener("click", async () => {
    await axios.get("http://localhost:3008/spotify/next");
    let state = await (
      await axios.get("http://localhost:3008/spotify/playback")
    ).data;
    trackName.innerHTML = (state as any).item.name;
    trackDisplay.src = (state as any).item.album.images[0].url;
  });
  nextButton.innerHTML = "Next";
  container.appendChild(nextButton);

  let prevButton = document.createElement("button");
  prevButton.addEventListener("click", async () => {
    await axios.get("http://localhost:3008/spotify/previous");
    let state = await (
      await axios.get("http://localhost:3008/spotify/playback")
    ).data;
    trackName.innerHTML = (state as any).item.name;
    trackDisplay.src = (state as any).item.album.images[0].url;
  });
  prevButton.innerHTML = "Prev";
  container.appendChild(prevButton);

  return container;
}
