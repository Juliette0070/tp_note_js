import Error404 from "./view/Error404.js";
import Home from "./view/Home.js";

const routes = {
    '/': Home
};

const router = async () => {
    let content = document.querySelector("#content");
    let request = parseRequestURL();
    let parsedURL = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '') + (request.verb ? `/${request.verb}` : '');
    let page = routes[parsedURL] ? routes[parsedURL] : new Error404;
    console.log(page);
    content.innerHTML = await page.render();
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);