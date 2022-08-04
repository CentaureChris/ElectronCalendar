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

