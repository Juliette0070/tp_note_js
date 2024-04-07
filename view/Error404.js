export default class Error404{
    async render(){
        document.body.style.backgroundColor = "white";
        let view = `
        <div class="container">
            <p class="links"><a href="/#/">Home</a> - <a href="/#/personnages">Personnages</a> - <a href="/#/favoris">Favoris</a></p>
            <h2>Error 404</h2>
        </div>
        `;
        return view;
    }
}