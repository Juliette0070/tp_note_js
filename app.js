import Error404 from "./view/Error404.js";
import Home from "./view/Home.js";
import Utils from "./services/utils.js";
import Personnages from "./view/Personnages.js";
import DetailPerso from "./view/DetailPerso.js";
import Favoris from "./view/Favoris.js";

const routes = {
    '/': Home,
    '/home': Home,
    '/personnages': Personnages,
    '/personnages/:id': DetailPerso,
    '/favoris': Favoris
};

const router = async () => {
    let content = document.querySelector("#content");
    let request = Utils.parseRequestURL();
    let parsedURL = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '') + (request.verb ? `/${request.verb}` : '');
    let page = routes[parsedURL] ? new routes[parsedURL] : new Error404;
    console.log(page);
    console.log(parsedURL);
    if (parsedURL === '/personnages/:id') {
        console.log("detail perso");
        content.innerHTML = await page.render(request.id);
    } else {
        console.log("autre");
        content.innerHTML = await page.render();
    }
    if (typeof page.after_render === 'function') {await page.after_render();}
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);