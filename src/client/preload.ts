import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("test", {});
