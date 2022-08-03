import { getAllEvents } from "../modele/events.js"
import { IEvents } from "../interfaces/events.js"

const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days") as HTMLDivElement

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

    let date_h1 = document.querySelector('.date h1') as HTMLDivElement
    let date_p = document.querySelector('.date p') as HTMLDivElement

    date_h1.innerHTML = months[date.getMonth()];
    date_p.innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  let events: IEvents[] = []
  let table:Array<string> = []
  getAllEvents().then((data: any) => {
    events = [...data]
  
  for(let e of events){
    table.push(e.date.toString())
  }
  
  let count = 0
  
  for (let i = 1; i <= lastDay; i++) {
    let test = new Date()
    test.setFullYear(date.getFullYear(),date.getMonth(),i)
    test.setMinutes(0)
    test.setHours(0)
    test.setSeconds(0)

    for(let t of table){
      if(t == test.toString()){
        count++
      }
    }

    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      if(table.includes(test.toString())){
      days += `<div class="today">${i}<small class="dot">${count}</small></div>`;
      }else{ 
      days += `<div class="today">${i}</div>`;
      }
    } else {
      if(table.includes(test.toString())){
        days += `<div>${i}<small class="dot">${count}</small></div>`
      }else{
        days += `<div>${i}</div>`;
      }
    }
  count = 0

  }
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }

}).catch(err => {
  throw new Error(err.message)
})

};

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

let days = document.getElementsByClassName('day') as HTMLCollection


// let events: IEvents[] = []

// function displayEvents() {
//     getAllEvents().then((data: any) => {
//         events = [...data]
//         console.log(events)
//     }).catch(err => {
//         throw new Error(err.message)
//     })
// }


// displayEvents()
renderCalendar();