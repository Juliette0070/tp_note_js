import Provider from '../services/provider.js';

export default class Personnages{
    async render(page = 1){
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
    async after_render(page = 1){
        document.getElementById('prevPage').addEventListener('click', async () => {
            console.log("aa");
            if (page > 1) {
                page--;
                document.location.href = `#/personnages/pages/${page}`;
            }
        });
        document.getElementById('nextPage').addEventListener('click', async () => {
            console.log("bb");
            page++;
            document.location.href = `#/personnages/pages/${page}`;
        });
    }
}