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

export function getEvent(date:string){
    return new Promise((result,rej) => {
        conn.query(`SELECT * FROM events WHERE date = '${date}'`,(err:any, res:any) => {
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