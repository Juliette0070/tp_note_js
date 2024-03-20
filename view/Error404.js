export default class Error404{
    async render(){
        let view = `
        <h2>Error 404</h2>
        <p><a href="/#/">Home</a> - <a href="/#/personnages">Personnages</a></p>
        `;
        return view;
    }
}