export default class Home{
    async render(){
        document.body.style.backgroundColor = "white";
        return /* html */`
        <div class="container">
            <p class="links"><a href="/#/personnages">Personnages</a> - <a href="/#/favoris">Favoris</a></p>
            <h1>Home</h1>
        </div>
        `
    }
}