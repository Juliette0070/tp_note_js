export default class Home{
    async render(){
        document.body.style.backgroundColor = "white";
        return /* html */`
        <section class="section">
            <h1>Home</h1>
            <p class="links"><a href="/#/personnages">Personnages</a> - <a href="/#/e">Error404</a></p>
        </section>
        `
    }
}