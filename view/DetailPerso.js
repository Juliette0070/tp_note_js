import Provider from "../services/provider.js";

export default class DetailPerso{
    async render(id){
        let perso = await Provider.fetchPersonnage(id);
        let myList = document.createElement('ul');
        let baguette = document.createElement("ul");
        let animal = document.createElement("ul");
        let objets = document.createElement("ul");
        let listSort = document.createElement("ul");
        myList.appendChild(document.createElement("li")).textContent = perso.nom;
        myList.appendChild(document.createElement("li")).textContent = perso.maison;
        myList.appendChild(document.createElement("li")).textContent = perso.age + " ans";
        if (perso.baguette_magique_id && perso.baguette_magique_id != null) {
            myList.appendChild(document.createElement("li")).textContent = "Baguette:";
            baguette.appendChild(document.createElement("li")).textContent = perso.baguette.bois;
            baguette.appendChild(document.createElement("li")).textContent = perso.baguette.coeur;
            baguette.appendChild(document.createElement("li")).textContent = perso.baguette.longueur + " cm";
            myList.appendChild(baguette);
        }
        if (perso.animal && perso.animal != null) {
            myList.appendChild(document.createElement("li")).textContent = "Animal:";
            animal.appendChild(document.createElement("li")).textContent = perso.animal.nom;
            animal.appendChild(document.createElement("li")).textContent = perso.animal.espece;
            myList.appendChild(animal);
        }
        if (perso.objets) {
            myList.appendChild(document.createElement("li")).textContent = "Objets:";
            perso.objets.forEach(objet => {
                objets.appendChild(document.createElement("li")).textContent = objet.nom;
            });
            if (perso.objets.length == 0) {
                objets.appendChild(document.createElement("li")).textContent = "Aucun objet";
            }
            myList.appendChild(objets);
        }
        if (perso.sorts) {
            myList.appendChild(document.createElement("li")).textContent = "Sorts:";
            perso.sorts.forEach(sort => {
                listSort.appendChild(document.createElement("li")).textContent = sort.nom;
            });
            if (perso.sorts.length == 0) {
                listSort.appendChild(document.createElement("li")).textContent = "Aucun sort";
            }
            myList.appendChild(listSort);
        }
        let img = document.createElement("img");
        img.src = perso.image;
        
        let view = /* html*/`
            <div class="container">
                <p class="links"><a href="/#/">Home</a> - <a href="/#/personnages">Personnages</a></p>
                <h2>Personnage:</h2>
                <div class="card">
                    ${img.outerHTML}
                    <div class="column card">
                        ${baguette.outerHTML}
                    </div>
                    <div class="column card">
                        ${animal.outerHTML}
                    </div>
                    ${myList.outerHTML}
                </div>
            </div>
        `;
        return view;
    }
}