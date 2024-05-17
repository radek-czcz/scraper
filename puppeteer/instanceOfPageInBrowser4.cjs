const pLoader = require('./puppLoader.cjs');
const cookiesSetter = require('./CookiesSetter.cjs')
const categories = require('./categories.cjs')

// let prodCategory = "Karty pamięci";
// let prodCategory = "Lodówki";
// let prodCategory = "Zmywarki";
let prodCategory = "Klawiatury";
// let prodCategory = "Pendrive";

let urlInp = categories.map.get(prodCategory);
console.log(urlInp)

let browser;

function loadBrowserAndPage() {
	pLoader.getPu().then(res => {browser = res})
	.then(() => cookiesSetter.setCookies())
	// .then(() => pLoader.loadPage(urlInp));
}

loadBrowserAndPage()

module.exports = { browser }