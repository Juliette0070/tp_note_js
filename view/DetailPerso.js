import Provider from "../services/provider.js";

export default class DetailPerso{
    async render(id){
        let perso = await Provider.fetchPersonnage(id);
        let personnage = document.createElement('ul');
        let baguette = document.createElement("ul");
        let animal = document.createElement("ul");
        let objets = document.createElement("ul");
        let listSort = document.createElement("ul");
        let img = document.createElement("img");
        img.src = perso.image;
        personnage.appendChild(document.createElement("li")).textContent = perso.nom;
        personnage.appendChild(document.createElement("li")).textContent = perso.maison;
        personnage.appendChild(document.createElement("li")).textContent = perso.age + " ans";
        personnage.appendChild(document.createElement("li")).textContent = "niveau " + perso.niveau;
        personnage.appendChild(document.createElement("li")).textContent = perso.xp + " points d'expérience";
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
                let elem = document.createElement("li")
                elem.classList.add("object");
                objets.appendChild(elem).textContent = objet.nom;
            });
            if (perso.objets.length == 0) {
                objets.appendChild(document.createElement("li")).textContent = "Aucun objet";
            }
            objets.classList.add("object-container");
        }
        if (perso.sorts) {
            perso.sorts.forEach(sort => {
                let elem = document.createElement("li")
                elem.classList.add("spell");
                listSort.appendChild(elem).textContent = sort.nom;
            });
            if (perso.sorts.length == 0) {
                listSort.appendChild(document.createElement("li")).textContent = "Aucun sort";
            }
            listSort.classList.add("spell-container");
        }

        // liste des sorts existants
        let sortsExistants = document.createElement("ul");
        let sorts = await Provider.fetchSorts();
        sorts.forEach(sort => {
            let elem = document.createElement("li");
            elem.classList.add("spell");
            sortsExistants.appendChild(elem).textContent = sort.nom;
        });
        sortsExistants.classList.add("spell-container");
        
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
                        <button id="entrainer">Entrainer</button>
                    </div>
                    <div class="card">
                        <div class="column card">
                            <h3>Baguette magique:</h3>
                            ${baguette.outerHTML}
                        </div>
                        <div class="column card">
                            <h3>Animal:</h3>
                            ${animal.outerHTML}
                        </div>
                    </div>
                    <div class="card">
                        <h3>Objets:</h3>
                        <div class="object-container">
                            ${objets.outerHTML}
                        </div>
                    </div>
                    <div class="card">
                        <h3>Sorts:</h3>
                        <div class="spell-container">
                            ${listSort.outerHTML}
                        </div>
                    </div>
                    <div class="card">
                        <h3>Sorts existants:</h3>
                        <div class="spell-container">
                            ${sortsExistants.outerHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;
        return view;
    }
    async after_render(id){
        let perso = await Provider.fetchPersonnage(id);
        let button = document.querySelector("#entrainer");
        button.addEventListener("click", async function() {
            perso.xp += 10;
            console.log("Expérience du personnage incrémentée de 10 : ", perso.xp);
            // vérifier si des niveaux sont passés
            while (perso.xp/100 >= perso.niveau) {
                perso.niveau += 1;
                console.log("Niveau du personnage incrémenté de 1 : ", perso.niveau);
            }
            await Provider.updatePersonnage(perso);
            // Recharger la page
            window.location.reload();
        });

        // Sélectionnez l'élément avec la classe 'perso'
        var persoElement = document.querySelector('.perso');
        // Vérifier la maison du personnage et appliquer le style de fond en conséquence
        if (perso.maison == "Gryffondor") {
            persoElement.style.backgroundColor = "red";
        } else if (perso.maison == "Serdaigle") {
            persoElement.style.backgroundColor = "blue";
        } else if (perso.maison == "Poufsouffle") {
            persoElement.style.backgroundColor = "yellow";
        } else if (perso.maison == "Serpentard") {
            persoElement.style.backgroundColor = "green";
        } else {
            persoElement.style.backgroundColor = "white";
        }
    }
}