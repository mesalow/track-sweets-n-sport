import { contextBridge, ipcRenderer } from 'electron'

const api = {
  getAllDays: () => ipcRenderer.invoke('getAllDays'),
  updateDay: () => ipcRenderer.invoke('updateDay'),
  getStatistics: () => ipcRenderer.invoke('getStatistics')
}
contextBridge.exposeInMainWorld('myAPI', api)