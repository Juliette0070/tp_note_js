import Provider from "../services/provider.js";

export default class DetailPerso{
    async render(id){
        let perso = await Provider.fetchPersonnage(id);
        console.log(perso);
        let myList = document.createElement('ul');
        myList.appendChild(document.createElement("li")).textContent = perso.nom;
        myList.appendChild(document.createElement("li")).textContent = perso.maison;
        myList.appendChild(document.createElement("li")).textContent = perso.age + " ans";
        if (perso.baguette_maique_id && perso.baguette_maique_id != null) {
            myList.appendChild(document.createElement("li")).textContent = "Baguette:";
            let baguette = document.createElement("ul");
            baguette.appendChild(document.createElement("li")).textContent = perso.baguette.bois;
            baguette.appendChild(document.createElement("li")).textContent = perso.baguette.taille + " cm";
            baguette.appendChild(document.createElement("li")).textContent = perso.baguette.noyau;
            myList.appendChild(baguette);
        }
        if (perso.animal && perso.animal != null) {
            myList.appendChild(document.createElement("li")).textContent = "Animal:";
            let animal = document.createElement("ul");
            animal.appendChild(document.createElement("li")).textContent = perso.animal.nom;
            animal.appendChild(document.createElement("li")).textContent = perso.animal.espece;
            myList.appendChild(animal);
        }
        if (perso.sorts) {
            myList.appendChild(document.createElement("li")).textContent = "Sorts:";
            let sort = document.createElement("ul");
            perso.sorts.forEach(sort => {
                sort.appendChild(document.createElement("li")).textContent = sort.nom;
            });
            if (sort.length == 0) {
                sort.appendChild(document.createElement("li")).textContent = "Aucun sort";
            }
            myList.appendChild(sort);
        }
        if (perso.objets) {
            myList.appendChild(document.createElement("li")).textContent = "Objets:";
            let objets = document.createElement("ul");
            perso.objets.forEach(objet => {
                objets.appendChild(document.createElement("li")).textContent = objet.nom;
            });
            if (objets.length == 0) {
                objets.appendChild(document.createElement("li")).textContent = "Aucun objet";
            }
            myList.appendChild(objets);
        }
        let img = document.createElement("img");
        img.src = perso.image;
        
        let view = /* html*/`
            <h2>Personnage:</h2>
            <p><a href="/#/">Home</a> - <a href="/#/personnages">Personnages</a></p>
            ${img.outerHTML}
            ${myList.outerHTML}
        `;
        return view;
    }
}