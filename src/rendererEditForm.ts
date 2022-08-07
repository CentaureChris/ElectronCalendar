const { ipcRenderer } = require('electron')
import { updateEvent } from "./modele/events.js";
import { getEventById } from './modele/events.js'
import { deleteEvent } from './modele/events.js'


let test:any = null

ipcRenderer.invoke('loadEvent').then((res:any) => {
    getEventById(res.id).then((data:any) => {
        test = data[0]
        console.log(test)
        const description = document.getElementById('description') as HTMLInputElement
        const start = document.getElementById('startTime') as HTMLInputElement
        const end = document.getElementById('endTime') as HTMLInputElement
        const editEventButton = document.getElementById('editEventButton');
        const delEventButton = document.getElementById('deleteEventButton');
        delEventButton?.addEventListener('click',() => {
            if(confirm(`Do you really want to delete rdv ${res.description}`)){
                deleteEvent(res.id)
                ipcRenderer.invoke('reload')
            }
        })
        description.value = test.description
        start.value = test.start_event
        end.value = test.end_event

        editEventButton?.addEventListener('click',() => {
            updateEvent(res.id,description.value,start.value,end.value)
            alert(('Events have been updated!'))
        })
    })
})