const mysql = require("mysql2")
let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "electronapp"
})



export function getAllEvents() {
    return new Promise((result, rej) => {
        conn.query("SELECT * FROM events", (err: any, res: any) => {
            if (err) rej(err)
            else result(res)
        })
    })
}

export function getAllEventsFromDay(date:any) {
    return new Promise((result, rej) => {
        conn.query(`SELECT * FROM events WHERE date = '${date}' ORDER BY start_event ASC`, (err: any, res: any) => {
            if (err) rej(err)
            else result(res)
        })
    })
}

export function getEventByDate(date:string){
    return new Promise((result,rej) => {
        conn.query(`SELECT * FROM events WHERE date = '${date}'`,(err:any, res:any) => {
            if (err)
                rej(err);
            else
                result(res);
        });
    });
}

export function getEventById(id:number){
    return new Promise((result,rej) => {
        conn.query(`SELECT * FROM events WHERE id = ${id}`,(err:any, res:any) => {
            if (err)
                rej(err);
            else
                result(res);
        });
    });
}

export function addEvent(date:string,desc:string,start:string,end:string){
    return new Promise((result,rej) => {
        conn.query(`INSERT INTO events (date, description, start_event, end_event) VALUES ('${date}', '${desc}', '${start}','${end}');`,(err:any, res:any) => {
            if (err)
                rej(err);
            else
                result(res);
        });
    });
}

export function deleteEvent(id:number){
    return new Promise((result,rej) => {
        conn.query(`DELETE FROM events WHERE id = ${id} `,(err:any, res:any) => {
            if (err)
                rej(err);
            else
                result(res);
        });
    });
}

export function updateEvent(id:string, desc:string,start:string,end:string){
    return new Promise((result,rej) => {
        conn.query(`UPDATE events SET description = '${desc}', start_event = '${start}', end_event = '${end}' WHERE id = ${id}`,(err:any, res:any) => {
            if (err)
                rej(err);
            else
                result(res);
        });
    });
}