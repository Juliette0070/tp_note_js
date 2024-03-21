import Provider from '../services/provider.js';

export default class Personnages{
    async render(){
        let personnages = await Provider.fetchPersonnages();
        let view = /* html*/`
            <h2>Tous les Personnages:</h2>
            <p><a href="/#/">Home</a></p>
            <ul>
                ${personnages.map(perso => /* html */`
                    <li><strong><a href="/#/personnages/${perso.id}">${perso.nom}</a></strong> (${perso.maison})</li>
                `).join('')}
            </ul>
        `;
        return view;
    }
}