import { IUser } from "./interfaces/user.js"
import { addUser, getAll, suppUser } from "./modele/utilisateurs.js"

const nomEncours = document.getElementById('nom') as HTMLInputElement
const prenomEnCours = document.getElementById('prenom') as HTMLInputElement
const btnAjout = document.getElementById('ajouter')
const result = document.getElementById('result')



let users: IUser[] = []

function afficheUser() {
    getAll().then((data: any) => {
        users = [...data]
        if (result) {
            result.innerHTML = ""
            for (let i in users) {
                let ligne = document.createElement("tr")
                let caseId = document.createElement("td")
                let casePrenom = document.createElement("td")
                let caseNom = document.createElement("td")
                let caseOption = document.createElement("td")
                let idEnCours = users[i].id
                if (idEnCours) {
                    caseId.innerHTML = idEnCours.toString()
                }
                else {
                    caseId.innerHTML = "0"
                }
                casePrenom.innerHTML = users[i].prenom
                caseNom.innerHTML = users[i].nom
                caseOption.innerHTML = "Supprimer"
                caseOption.addEventListener("click", () => {
                    supp(parseInt(i))
                })
                ligne.appendChild(caseId)
                ligne.appendChild(casePrenom)
                ligne.appendChild(caseNom)
                ligne.appendChild(caseOption)
                result.appendChild(ligne)
            }
        }

    }).catch(err => {
        throw new Error(err.message)
    })
}

function supp(index: number) {
    let id = users[index].id
    if (id) {
        suppUser(id).then((data: any) => {
            afficheUser()
        }).catch((err: any) => {
            throw new Error(err.message)
        })
    }
}
btnAjout?.addEventListener("click", () => {
    addUser(nomEncours.value, prenomEnCours.value).then((data: any) => {
        afficheUser()
    }).catch((err: any) => {
        throw new Error(err.message)
    })
})
afficheUser()
