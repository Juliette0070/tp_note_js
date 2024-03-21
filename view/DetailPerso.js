import Provider from "../services/provider.js";

export default class DetailPerso{
    async render(id){
        let perso = await Provider.fetchPersonnage(id);
        console.log(perso);
        let myList = document.createElement('ul');
        myList.appendChild(document.createElement("li")).textContent = perso.nom;
        myList.appendChild(document.createElement("li")).textContent = perso.maison;
        myList.appendChild(document.createElement("li")).textContent = perso.age;
        let view = /* html*/`
            <h2>Personnage:</h2>
            <p><a href="/#/">Home</a> - <a href="/#/personnages">Personnages</a></p>
            ${myList.outerHTML}
        `;
        return view;
    }
}