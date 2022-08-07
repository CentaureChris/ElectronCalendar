const { ipcRenderer } = require('electron')
import { addEvent } from "./modele/events.js"

function formatDate(date:Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
  
    return [year, month, day].join('-');
}

ipcRenderer.invoke('loadDay').then((res:any) => {
    if(Array.isArray(res)){
        let event = res
        console.log(event)
        const date = formatDate(event[0].date)
        const addEventButton = document.getElementById('addEventButton')
        const description = document.getElementById('description') as HTMLInputElement
        const startTime = document.getElementById('startTime') as HTMLInputElement
        const endTime = document.getElementById('endTime') as HTMLInputElement

        addEventButton?.addEventListener('click', () => {
            if(description){
                console.log(document.title)
                addEvent(date, description.value.toString(),startTime.value.toString()+':00',endTime.value.toString()+':00' )
                alert('You add an events successfully')
                description.value = ""
                startTime.value = ""
                endTime.value = ""
                ipcRenderer.invoke('reload')
            }
        })
    }else{
        let event = formatDate(new Date(Date.parse(res)))
        console.log(event)
        const date = event
        const addEventButton = document.getElementById('addEventButton')
        const description = document.getElementById('description') as HTMLInputElement
        const startTime = document.getElementById('startTime') as HTMLInputElement
        const endTime = document.getElementById('endTime') as HTMLInputElement

        addEventButton?.addEventListener('click', () => {
            if(description){
                console.log(document.title)
                addEvent(date, description.value.toString(),startTime.value.toString()+':00',endTime.value.toString()+':00' )
                alert('You add an events successfully')
                description.value = ""
                startTime.value = ""
                endTime.value = ""
                ipcRenderer.invoke('reload')
            }
        })
    }
})