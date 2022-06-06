import { contextBridge, ipcRenderer } from 'electron'
import { DayDTO } from './backend/api/updateDay'

export type electronAPI = {
  getAllDays: (year:number, month:number) => Promise<DayDTO[]>,
  updateDay: (dayDTO: DayDTO) => Promise<any>,
  getStatistics: () => Promise<any>
}

const api: electronAPI = {
  getAllDays: (year: number, month:number) => ipcRenderer.invoke('getAllDays', year, month),
  updateDay: () => ipcRenderer.invoke('updateDay'),
  getStatistics: () => ipcRenderer.invoke('getStatistics')
}
contextBridge.exposeInMainWorld('myAPI', api)