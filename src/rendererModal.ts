import { deleteEvent } from './modele/events.js'
const {ipcRenderer} = require('electron')
const _ = require('lodash');
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

ipcRenderer.invoke('test').then((res:any) => {
    let event = res
    if(event.length !== 0 && Array.isArray(event) ){
        console.log(event)
        document.title = (res[0].date).toDateString()
        let cardsDiv = document.getElementById('cards')
        for(let r of res){
            let cardDiv = document.createElement('div')
            cardDiv.classList.add('card')
            cardDiv.id = `card-${r.id}`
            let desc = document.createElement('h2')
            let startTime = document.createElement('p')
            let endTime = document.createElement('p')
            let trashIcon = document.createElement('i')
            trashIcon.addEventListener('click',() => {
                if(confirm(`Do you really want to delete rdv ${r.description}`)){
                    deleteEvent(r.id)
                    ipcRenderer.invoke("reload")
                }
            })
            desc.innerText = r.description
            startTime.innerText = `Start at: ${r.start_event}`
            endTime.innerText = `End at: ${r.end_event}`
            cardDiv?.appendChild(desc)
            cardDiv.appendChild(trashIcon)
            trashIcon.classList.add('fa-solid')
            trashIcon.classList.add('fa-trash')
            desc.append(startTime)
            desc.append(endTime)
            cardsDiv?.appendChild(cardDiv)
        }

        let addButton = document.getElementById('addButton')
        addButton?.addEventListener('click', ()=>{
            ipcRenderer.invoke("addForm")
        })
    }else{
        event = formatDate(new Date(Date.parse(event)))
        let addButton = document.getElementById('addButton')
        let title = document.createElement('h1')
        let container = document.getElementById('mainContainer')
        title.innerText = "No events Recorded"
        container?.appendChild(title)
            addButton?.addEventListener('click', ()=>{
            ipcRenderer.invoke("addForm")

        })
    }
    
})
