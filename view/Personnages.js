import Provider from '../services/provider.js';

export default class Personnages{
    // garder la page pour l'utiliser dans la méthode after_render
    constructor(){this.page = 1;}
    async render(page = 1){
        this.page = page;
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
    async after_render(){
        let content = document.querySelector("#content");
        document.getElementById('prevPage').addEventListener('click', async () => {
            if (this.page > 1) {
                this.page--;
                content.innerHTML = await this.render(this.page);
            }
        });
        document.getElementById('nextPage').addEventListener('click', async () => {
            this.page++;
            content.innerHTML = await this.render(this.page);
        });
    }
}