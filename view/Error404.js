export default class Error404{
    async render(){
        let view = `
        <h2>Error 404</h2>
        <p><a href="/page.html#/">Go to Home</a></p>
        `;
        return view;
    }
}