import { contextBridge, ipcRenderer } from 'electron'
import { DayDTO } from './backend/api/updateDay'
import { Month } from './frontend/components/calendar/helper'

export type electronAPI = {
  getAllDays: (year:number, month:number) => Promise<DayDTO[]>,
  fillMonth: (year:number, month:number, numberOfDays: number) => Promise<any>, 
  updateDay: (dayDTO: DayDTO) => Promise<any>,
  getStatistics: () => Promise<any>
}

const api: electronAPI = {
  getAllDays: (year: number, month:number) => ipcRenderer.invoke('getAllDays', year, month),
  fillMonth: (year:number, month:number, numberOfDays: number) => ipcRenderer.invoke('fillMonth', year, month, numberOfDays),
  updateDay: (day: DayDTO) => ipcRenderer.invoke('updateDay', day),
  getStatistics: () => ipcRenderer.invoke('getStatistics')
}
contextBridge.exposeInMainWorld('myAPI', api)