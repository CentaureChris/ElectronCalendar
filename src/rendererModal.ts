const {ipcRenderer} = require('electron')

ipcRenderer.invoke('test').then((res:any) => {
    let event = res
    console.log(event)

    document.title = (res[0].date).toDateString()

    let cardsDiv = document.getElementById('cards')
    for(let r of res){
        let cardDiv = document.createElement('div')
        cardDiv.classList.add('card')
        cardDiv.id = `card-${r.id}`
        let desc = document.createElement('h2')
        let time = document.createElement('p')
        desc.innerText = r.description
        time.innerText = r.time
        cardDiv?.appendChild(desc)
        desc.append(time)
        cardsDiv?.appendChild(cardDiv)
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        cardDiv.style.backgroundColor = `#${randomColor}`
    }
})
