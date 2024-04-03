import Provider from "../services/provider.js";

export default class DetailPerso{
    async render(id){
        let perso = await Provider.fetchPersonnage(id);
        let personnage = document.createElement('ul');
        let baguette = document.createElement("ul");
        let animal = document.createElement("ul");
        let objets = document.createElement("ul");
        let listSort = document.createElement("ul");
        personnage.appendChild(document.createElement("li")).textContent = perso.nom;
        personnage.appendChild(document.createElement("li")).textContent = perso.maison;
        personnage.appendChild(document.createElement("li")).textContent = perso.age + " ans";
        if (perso.baguette_magique_id && perso.baguette_magique_id != null) {
            baguette.appendChild(document.createElement("li")).textContent = perso.baguette.bois;
            baguette.appendChild(document.createElement("li")).textContent = perso.baguette.coeur;
            baguette.appendChild(document.createElement("li")).textContent = perso.baguette.longueur + " cm";
        }
        if (perso.animal && perso.animal != null) {
            animal.appendChild(document.createElement("li")).textContent = perso.animal.nom;
            animal.appendChild(document.createElement("li")).textContent = perso.animal.espece;
            animal.appendChild(document.createElement("li")).textContent = perso.animal.description;
        }
        if (perso.objets) {
            perso.objets.forEach(objet => {
                objets.appendChild(document.createElement("li")).textContent = objet.nom;
            });
            if (perso.objets.length == 0) {
                objets.appendChild(document.createElement("li")).textContent = "Aucun objet";
            }
        }
        if (perso.sorts) {
            perso.sorts.forEach(sort => {
                listSort.appendChild(document.createElement("li")).textContent = sort.nom;
            });
            if (perso.sorts.length == 0) {
                listSort.appendChild(document.createElement("li")).textContent = "Aucun sort";
            }
        }
        let img = document.createElement("img");
        img.src = perso.image;
        
        let view = /* html*/`
            <div class="container">
                <p class="links"><a href="/#/">Home</a> - <a href="/#/personnages">Personnages</a></p>
                <h2>Personnage:</h2>
                <div class="card perso">
                    <div class="card">
                        <div class="left-column">
                            ${img.outerHTML}
                        </div>
                        <div class="right-column">
                            ${personnage.outerHTML}
                        </div>
                    </div>
                    <div class="column card">
                        <h3>Baguette magique:</h3>
                        ${baguette.outerHTML}
                    </div>
                    <div class="column card">
                        <h3>Animal:</h3>
                        ${animal.outerHTML}
                    </div>
                    <div class="card">
                        ${objets.outerHTML}
                    </div>
                    <div class="card">
                        ${listSort.outerHTML}
                    </div>
                </div>
            </div>
        `;
        return view;
    }
}