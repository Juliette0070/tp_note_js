import Provider from "../services/provider.js";

const currentWindow = window;

export default class DetailPerso{
    // garder l'id du personnage pour l'utiliser dans la méthode after_render
    static idPerso = 1;
    async render(id){
        DetailPerso.idPerso = id;
        let perso = await Provider.fetchPersonnage(DetailPerso.idPerso);
        let personnage = document.createElement('ul');
        personnage.id = "personnage";
        let baguette = document.createElement("ul");
        baguette.id = "baguette";
        let animal = document.createElement("ul");
        animal.id = "animal";
        let objets = document.createElement("ul");
        objets.id = "objets";
        let listSort = document.createElement("ul");
        listSort.id = "sorts";
        let img = document.createElement("img");
        img.id = "perso-image";
        img.classList.add("lazy-image");
        img.dataset.src = perso.image;
        img.style.maxWidth = "200px";
        img.style.maxHeight = "200px";
        personnage.appendChild(document.createElement("li")).textContent = perso.nom;
        personnage.appendChild(document.createElement("li")).textContent = perso.maison;
        personnage.appendChild(document.createElement("li")).textContent = perso.age + " ans";
        let niv = document.createElement("li");
        niv.id = "niveau";
        niv.textContent = "niveau " + perso.niveau;
        personnage.appendChild(niv);
        let xp = document.createElement("li");
        xp.id = "xp";
        xp.textContent = perso.xp + " points d'expérience";
        personnage.appendChild(xp);
        if (perso.baguette_magique_id && perso.baguette_magique_id != null) {
            baguette.appendChild(document.createElement("li")).textContent = perso.baguette.bois;
            baguette.appendChild(document.createElement("li")).textContent = perso.baguette.coeur;
            baguette.appendChild(document.createElement("li")).textContent = perso.baguette.longueur + " cm";
            let imgBaguette = document.createElement("img");
            imgBaguette.dataset.src = perso.baguette.image;
            imgBaguette.classList.add("lazy-image");
            imgBaguette.style.maxWidth = "100px";
            imgBaguette.style.maxHeight = "100px";
            baguette.appendChild(imgBaguette);
        }
        if (perso.animal && perso.animal != null) {
            animal.appendChild(document.createElement("li")).textContent = perso.animal.nom;
            animal.appendChild(document.createElement("li")).textContent = perso.animal.espece;
            animal.appendChild(document.createElement("li")).textContent = perso.animal.description;
            let imgAnimal = document.createElement("img");
            imgAnimal.dataset.src = perso.animal.image;
            imgAnimal.classList.add("lazy-image");
            imgAnimal.style.maxWidth = "100px";
            imgAnimal.style.maxHeight = "100px";
            animal.appendChild(imgAnimal);
        }
        if (perso.objets) {
            perso.objets.forEach(objet => {
                let elem = document.createElement("li")
                elem.classList.add("object");
                objets.appendChild(elem).appendChild(document.createElement("span")).textContent = objet.nom;
                let imgObjet = document.createElement("img");
                imgObjet.dataset.src = objet.image;
                imgObjet.classList.add("lazy-image");
                imgObjet.style.maxWidth = "75px";
                imgObjet.style.maxHeight = "75px";
                elem.appendChild(imgObjet);
            });
            if (perso.objets.length == 0) {
                let elem = document.createElement("li");
                elem.classList.add("no-object");
                elem.textContent = "Aucun objet";
                objets.appendChild(elem);
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
                let elem = document.createElement("li");
                elem.classList.add("no-spell");
                elem.textContent = "Aucun sort";
                listSort.appendChild(elem);
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

        // bouton favoris
        let btnFavoris = document.createElement("button");
        btnFavoris.id = "favoris";
        //si le personnage est déjà dans les favoris, changer le texte du bouton
        let favoris = JSON.parse(localStorage.getItem('favoris')) || [];
        if (favoris.some(fav => fav === perso.id)) {btnFavoris.textContent = "Retirer des favoris";}
        else {btnFavoris.textContent = "Ajouter aux favoris";}
        
        let view = /* html*/`
            <div class="container">
                <p class="links"><a href="/#/">Home</a> - <a href="/#/personnages">Personnages</a> - <a href="/#/favoris">Favoris</a></p>
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
                        ${btnFavoris.outerHTML}
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
    async after_render(){
        let perso = await Provider.fetchPersonnage(DetailPerso.idPerso);
        // charger l'image du personnage
        let imgElement = document.getElementById('perso-image');
        imgElement.src = perso.image;

        // Ajouter un événement au bouton d'entraînement
        let btnEntrainer = document.querySelector("#entrainer");
        const cooldownDuration = 5000;
        function cooldownButton(button, cooldownTime) {
            let remainingTime = cooldownTime;
            button.disabled = true;
            button.textContent = `Entrainement en cours (${Math.ceil(remainingTime / 1000)} secondes)`;
        
            const interval = setInterval(() => {
                remainingTime -= 1000;
                if (remainingTime > 0) {
                    button.textContent = `Entrainement en cours (${Math.ceil(remainingTime / 1000)} secondes)`;
                } else {
                    clearInterval(interval);
                    button.textContent = "Entrainer";
                    button.disabled = false;
                }
            }, 1000);
        }
        async function newLevel() {
            perso.niveau += 1;
            console.log("Niveau du personnage incrémenté de 1 : ", perso.niveau);
            if (perso.niveau % 10 == 0) {
                // ajouter un objet aléatoire au personnage
                let objets = await Provider.fetchObjets();
                let randomObjet = objets[Math.floor(Math.random() * objets.length)];
                // si la personne n'a pas déjà cet objet
                if (!perso.objets.some(obj => obj.id === randomObjet.id)) {
                    console.log("Objet aléatoire trouvé :", randomObjet.id, randomObjet.nom);
                    console.log("Objets possédés par le personnage :", perso.objets);
                    perso.objets_ids.push(randomObjet.id);
                    await Provider.updatePersonnage(perso);
                    console.log("Objet aléatoire ajouté au personnage :", randomObjet.id, randomObjet.nom);
                    // actualiser l'affichage des objets
                    let objets = document.getElementById('objets');
                    let elem = document.createElement("li");
                    elem.classList.add("object");
                    objets.appendChild(elem).textContent = randomObjet.nom;
                    let imgObjet = document.createElement("img");
                    imgObjet.src = randomObjet.image;
                    imgObjet.dataset.src = randomObjet.image;
                    imgObjet.classList.add("lazy-image");
                    imgObjet.style.maxWidth = "75px";
                    imgObjet.style.maxHeight = "75px";
                    if (perso.objets.length == 0) {objets.removeChild(objets.querySelector(".no-object"));}
                    elem.appendChild(imgObjet);
                } else {
                    console.log("Objet aléatoire déjà possédé par le personnage :", randomObjet.id, randomObjet.nom);
                }
            }
        }
        btnEntrainer.addEventListener("click", async function() {
            perso.xp += 1000;
            console.log("Expérience du personnage incrémentée de 10 : ", perso.xp);
            // vérifier si des niveaux sont passés
            while (perso.xp/100 >= perso.niveau) {
                newLevel();
            }
            await Provider.updatePersonnage(perso);
            document.getElementById('niveau').textContent = "niveau " + perso.niveau;
            document.getElementById('xp').textContent = perso.xp + " points d'expérience";
            cooldownButton(btnEntrainer, cooldownDuration);
        });

        // Ajouter un événement au bouton favoris
        let btnFavoris = document.querySelector("#favoris");
        function addToFavorites(personnage) {
            let present = false;
            // Vérifier si les favoris existent déjà dans le stockage local
            let favoris = JSON.parse(localStorage.getItem('favoris')) || [];
            // Ajouter le personnage aux favoris s'il n'est pas déjà présent
            if (!favoris.some(fav => fav === personnage.id)) {
                favoris.push(personnage.id);
                localStorage.setItem('favoris', JSON.stringify(favoris));
                console.log('Personnage ajouté aux favoris :', personnage.id);
                present = true;
            } else {
                //retirer le personnage des favoris
                favoris = favoris.filter(fav => fav !== personnage.id);
                localStorage.setItem('favoris', JSON.stringify(favoris));
                console.log('Personnage retiré des favoris :', personnage.id);
            }
            return present;
        }
        // Mettre à jour le bouton favoris
        this.updateFavorisBtn = function() {
            let favoris = JSON.parse(localStorage.getItem('favoris')) || [];
            if (favoris.some(fav => fav === perso.id)) {btnFavoris.textContent = "Retirer des favoris";}
            else {btnFavoris.textContent = "Ajouter aux favoris";}
        }
        btnFavoris.addEventListener('click', () => {
            // Obtenez les informations du personnage que vous souhaitez ajouter aux favoris
            let personnage = perso;
            addToFavorites(personnage);
            this.updateFavorisBtn();
        });

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

        // lazy loading
        let imgElements = document.querySelectorAll('.lazy-image');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy-image');
                    observer.unobserve(lazyImage);
                }
            });
        });
        imgElements.forEach(img => {
            observer.observe(img);
        });
    }
}