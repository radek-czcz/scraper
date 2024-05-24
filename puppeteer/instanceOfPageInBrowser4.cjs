const pLoader = require('./puppLoader.cjs');
const cookiesSetter = require('./CookiesSetter.cjs');
const categories = require('./categories.cjs');
const pScroller = require('./puppScroller.cjs');

let prodCategory = "Karty pamięci";
// let prodCategory = "Lodówki";
// let prodCategory = "Zmywarki";
// let prodCategory = "Klawiatury";
// let prodCategory = "Pendrive";

// let urlInp = categories.map.get(prodCategory);
let urlInp = categories.urlArr[0].url
console.log(urlInp)

let browser;

function loadBrowserAndPage() {
	let bro = pLoader.getPu();
	let bro2 = bro.then(res => {browser = res; console.log(`brwser: \n`);console.dir(browser,{depth:0})})
	// .then(() => cookiesSetter.setCookies())
	// .then(() => pLoader.loadPage(urlInp))
	.then(() => pLoader.getExistingPage().then(res => res.goto(urlInp)))
	.then(() => pScroller.main())
	.then(() => {
		console.log('disconnecting'); 
		browser.disconnect()
	});
}

loadBrowserAndPage()

module.exports = { browser, loadBrowserAndPage, prodCategory }