const { ipcRenderer } = require('electron')
import { getAllEvents, getEventByDate } from "./modele/events.js"
import { IEvents } from "./interfaces/events.js"

const date = new Date();

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


const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days") as HTMLDivElement
  monthDays.innerHTML = ""
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

    const date_h1 = document.querySelector('.date h1')
    const date_p = document.querySelector('.date p')
  if(date_h1 !== null && date_p !== null){

    date_h1.innerHTML = months[date.getMonth()];
    date_p.innerHTML = new Date().toDateString();

    const days = document.createElement('div')

    for (let x = firstDayIndex; x > 0; x--) {
      const prevDays = document.createElement('div')
      prevDays.classList.add('prev-date')
      prevDays.innerHTML = `${prevLastDay - x + 1}`
      monthDays.appendChild(prevDays)
    }

    let events: IEvents[] = []
    let table:Array<Date> = []
    getAllEvents().then((data: any) => {
      events = [...data]
      for(let e of events){
        table.push(e.date)
      }
    
      let count = 0
  
      for (let i = 1; i <= lastDay; i++) {
        let dtime = new Date()
        dtime.setFullYear(date.getFullYear(),date.getMonth(),i)
        dtime.setMinutes(0)
        dtime.setHours(0)
        dtime.setSeconds(0)
    
        for(let t of table){
          if(t.toDateString() == dtime.toDateString()){
            count++
          }
        }

        if (
          i === new Date().getDate() &&
          date.getMonth() === new Date().getMonth()
        ) {
          if(table.find(date =>date.toDateString() === dtime.toDateString(),)){
            const day = document.createElement('div')
            day.classList.add('today')
            day.id = `${dtime}`
            day.innerHTML = `${i}<small class="dot">${count}</small>`
            monthDays.appendChild(day)
          }else{ 
          const day = document.createElement('div')
            day.classList.add('today')
            day.id = `${dtime}`
            day.innerHTML = `${i}`
            monthDays.appendChild(day)
          }
        } else {
          if(table.find(date =>date.toDateString() === dtime.toDateString(),)){
            const day = document.createElement('div')
            day.id = `${dtime}`
            day.innerHTML = `${i}<small class="dot">${count}</small>`
            monthDays.appendChild(day)
          }else{
            const day = document.createElement('div')
            day.id = `${dtime}`
            day.innerHTML = `${i}`
            monthDays.appendChild(day)
          }
        }      
      count = 0
    }
    for (let j = 1; j <= nextDays; j++) {
      const nextDays = document.createElement('div')
      nextDays.classList.add('next-date')
      nextDays.innerHTML = `${j}`
      monthDays.appendChild(nextDays)
    }

    [...monthDays.children].forEach((el) => {
      el.addEventListener('click', () => {
        getEventByDate(formatDate(new Date(el.id)))
          .then((event: any) => {
            console.log(event)
            ipcRenderer.invoke("open-modal",event.length == 0 ?el.id :event)
          })
          
        }) 
      })
    })
  }
}

let prev = document.querySelector('.prev') as HTMLDivElement
prev.addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

let next = document.querySelector('.next') as HTMLDivElement
next.addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar()
