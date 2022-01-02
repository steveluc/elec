import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("auth", {
  login: () => ipcRenderer.invoke("auth:login"),
  authInfo: () => ipcRenderer.invoke("auth:authInfo"),
});
