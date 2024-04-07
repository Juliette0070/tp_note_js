import Provider from "../services/provider.js";

export default class Favoris {
    async getFavorites() {
        let favorisIds = JSON.parse(localStorage.getItem('favoris')) || [];
        let favoris = [];
        for (let id of favorisIds) {
            if (typeof id !== 'int') {id = parseInt(id);}
            let perso = await Provider.fetchPersonnage(id);
            favoris.push(perso);
        }
        return favoris;
    }
    async render() {
        let favoris = await this.getFavorites();
        let favorisContainer = document.createElement('div');
        if (favoris.length === 0) {
            favorisContainer.innerHTML = '<p>Aucun favori pour le moment.</p>';
        } else {
            favoris.forEach(personnage => {
                let personnageElement = document.createElement('div');
                personnageElement.textContent = personnage;
                favorisContainer.appendChild(personnageElement);
            });
        }
        let view = /* html */`
            <div class="container">
                <p class="links"><a href="/#/personnages">Personnages</a> - <a href="/#/favoris">Favoris</a></p>
                <h1>Favoris</h1>
                <div class="card">
                    <ul>
                        ${favoris.map(perso => /* html */`
                            <li>
                            <strong><a href="/#/personnages/${perso.id}">${perso.nom}</a></strong> (${perso.maison})
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
        return view;
    }
    async after_render() {
        // Ajouter des gestionnaires d'événements ou d'autres opérations après le rendu
    }
}
