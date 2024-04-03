import Provider from '../services/provider.js';

export default class Personnages{
    async render(){
        let personnages = await Provider.fetchPersonnages();
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
                </div>
            </div>
        `;
        return view;
    }
}