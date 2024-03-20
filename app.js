import Error404 from "./view/Error404";

const routes = {
    '/': 'home'
};

const router = async () => {
    let content = document.querySelector("#content");
    let request = parseRequestURL();
    let parsedURL = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '') + (request.verb ? `/${request.verb}` : '');
    let page = routes[parsedURL] ? routes[parsedURL] : Error404;
    console.log(page);
    content.innerHTML = await page.render();
}