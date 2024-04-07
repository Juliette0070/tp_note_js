import Provider from '../services/provider.js';

export default class Personnages{
    // garder la page pour l'utiliser dans la méthode after_render
    static page = 1;
    static nbPages = 1;
    async render(page = -1){
        if (page === -1) {page = Personnages.page;}
        const pageSize = 5;
        let result = await Provider.fetchPersonnages(page, pageSize);
        let personnages = result[0];
        Personnages.nbPages = result[1];
        document.body.style.backgroundColor = "white";
        let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
        let view = /* html */`
            <div class="container">
                <p class="links"><a href="/#/">Home</a> - <a href="/#/favoris">Favoris</a></p>
                <h2>Tous les Personnages:</h2>
                <div class="card">
                    <ul>
                        ${personnages.map(perso => /* html */`
                            <li>
                            <strong><a href="/#/personnages/${perso.id}">${perso.nom}</a></strong> (${perso.maison})
                            <span class="fav" data-id="${perso.id}">${favoris.some(fav => fav === perso.id) ? '★' : '☆'}</span>
                            </li>
                        `).join('')}
                    </ul>
                    <button id="prevPage">Page Précédente</button>
                    <span>Page ${Personnages.page}/${Personnages.nbPages}</span>
                    <button id="nextPage">Page Suivante</button>
                </div>
            </div>
        `;
        return view;
    }
    async after_render(){
        let content = document.querySelector("#content");
        document.getElementById('prevPage').addEventListener('click', async () => {
            if (Personnages.page > 1) {
                Personnages.page--;
                content.innerHTML = await this.render(Personnages.page);
                await this.after_render();
            }
        });
        document.getElementById('nextPage').addEventListener('click', async () => {
            if (Personnages.page < Personnages.nbPages) {
                Personnages.page++;
                content.innerHTML = await this.render(Personnages.page);
                await this.after_render();
            }
        });
    }
}