const pLoader = require('./puppLoader.cjs');
const cookiesSetter = require('./CookiesSetter.cjs');
const categories = require('./categories.cjs');
const pScroller = require('./puppScroller.cjs');
const why = require('why-is-node-running')

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
	// .then(() => cookiesSetter.setCookies())
	.then(() => pLoader.loadPage(urlInp))
	.then(() => pScroller.main())
	.then(() => {
		console.log('disconnecting'); 
		browser.disconnect();
		setTimeout(() => why(), 5000);
	});
}

loadBrowserAndPage()

module.exports = { browser }