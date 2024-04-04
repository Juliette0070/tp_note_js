import Provider from '../services/provider.js';

export default class Personnages{
    async render(){
        const page = 1;
        const pageSize = 5;
        let personnages = await Provider.fetchPersonnages(page, pageSize);
        document.body.style.backgroundColor = "white";
        let view = /* html*/`
            <div class="container">
                <h2>Tous les Personnages:</h2>
                <p class="links"><a href="/#/">Home</a></p>
                <div class="card">
                    <ul>
                        ${personnages.map(perso => /* html */`
                            <li><strong><a href="/#/personnages/${perso.id}">${perso.nom}</a></strong> (${perso.maison})</li>
                        `).join('')}
                    </ul>
                    <button id="prevPage">Page Précédente</button>
                    <button id="nextPage">Page Suivante</button>
                </div>
            </div>
        `;
        return view;
    }
}

export class Personnages2 {
    async render() {
        let currentPage = 1; // Page initiale
        const pageSize = 5;

        const loadPage = async (page) => {
            const personnages = await Provider.fetchPersonnages(page, pageSize);
            renderCharacters(personnages);
        };

        const renderCharacters = (personnages) => {
            const charactersHTML = personnages.map(perso => /* html */ `
                <li><strong><a href="/#/personnages/${perso.id}">${perso.nom}</a></strong> (${perso.maison})</li>
            `).join('');

            const view = /* html */ `
                <div class="container">
                    <h2>Tous les Personnages:</h2>
                    <p class="links">
                        <button id="prevPage">Page Précédente</button>
                        <button id="nextPage">Page Suivante</button>
                        <a href="/#/">Home</a>
                    </p>
                    <div class="card">
                        <ul>
                            ${charactersHTML}
                        </ul>
                    </div>
                </div>
            `;

            document.querySelector('.app').innerHTML = view;

            // Gestion des clics sur les boutons de navigation
            document.getElementById('prevPage').addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    loadPage(currentPage);
                }
            });

            document.getElementById('nextPage').addEventListener('click', () => {
                currentPage++;
                loadPage(currentPage);
            });
        };

        // Charger les personnages de la page initiale
        await loadPage(currentPage);
    }
}