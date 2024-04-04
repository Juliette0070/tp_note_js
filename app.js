import Error404 from "./view/Error404.js";
import Home from "./view/Home.js";
import Utils from "./services/utils.js";
import Personnages from "./view/Personnages.js";
import DetailPerso from "./view/DetailPerso.js";

const routes = {
    '/': Home,
    '/home': Home,
    '/personnages': Personnages,
    '/personnages/:id': DetailPerso,
    '/personnages/pages/:id': Personnages,
};

const router = async () => {
    let content = document.querySelector("#content");
    let request = Utils.parseRequestURL();
    let parsedURL = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '') + (request.verb ? `/${request.verb}` : '');
    let page = routes[parsedURL] ? new routes[parsedURL] : new Error404;
    console.log(page);
    console.log(parsedURL);
    if (parsedURL === '/personnages/:id') {
        content.innerHTML = await page.render(request.id);
        await page.after_render(request.id);
    } else if (page === '/personnages/pages/:id') {
        content.innerHTML = await page.render(request.id);
        await page.after_render(request.id);
    } else if (page === '/personnages/') {
        content.innerHTML = await page.render();
        await page.after_render();
    } else {
        content.innerHTML = await page.render();
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);