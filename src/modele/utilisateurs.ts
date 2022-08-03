const mysql = require("mysql2")
let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "electronapp"
})

export function getAll() {
    return new Promise((result, rej) => {
        conn.query("SELECT * FROM users", (err: any, res: any) => {
            if (err) rej(err)
            else result(res)
        })
    })
}

export function suppUser(id: number) {
    return new Promise((result, rej) => {
        conn.query("DELETE FROM users WHERE id=?", [id], (err: any, res: any) => {
            if (err) rej(err)
            else result(res)
        })
    })
}
export function addUser(nom: string, prenom: string) {
    return new Promise((result, rej) => {
        conn.query("INSERT INTO users (nom,prenom) VALUES (?,?)", [
            nom, prenom
        ], (err: any, res: any) => {
            if (err) rej(err)
            else result(res)
        })
    })
}