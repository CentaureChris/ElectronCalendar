const mysql = require("mysql2")
let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "live_crud"
})

export function getAll() {
    return new Promise((result, rej) => {
        conn.query("SELECT * FROM utilisateurs", (err: any, res: any) => {
            if (err) rej(err)
            else result(res)
        })
    })
}

export function suppUser(id: number) {
    return new Promise((result, rej) => {
        conn.query("DELETE FROM utilisateurs WHERE id=?", [id], (err: any, res: any) => {
            if (err) rej(err)
            else result(res)
        })
    })
}
export function addUser(nom: string, prenom: string) {
    return new Promise((result, rej) => {
        conn.query("INSERT INTO utilisateurs (nom,prenom) VALUES (?,?)", [
            nom, prenom
        ], (err: any, res: any) => {
            if (err) rej(err)
            else result(res)
        })
    })
}