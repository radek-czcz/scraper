const pLoader = require('./puppLoader.js');
const pScroller = require('./puppScroller.js')
const categories = require('./categories.js')

let browser;
let page;
// let prodCategory = "Karty pamięci";
// let prodCategory = "Lodówki";
let prodCategory = "Zmywarki";
// let prodCategory = "Klawiatury";
// let prodCategory = "Pendrive";

function loadBrowserAndPage() {

	let urlInp = categories.map.get(prodCategory);

	pLoader.loadPuppeteer(false)
	.then((res, err) => {
		if (err) {console.dir(err)}
		else {
		//browser = res;
		console.log('browserWsEndpoint: ' + res.wsEndpoint());
		return pLoader.loadPage(urlInp);
		}
	})
	.catch(err => {console.dir(err, {depth:0})})
	.then(res => {
		page = res;
		pScroller.main();
	})
	.then(res => setTimeout(() => console.log('script ends.'), 1000));
}

module.exports = { loadBrowserAndPage, prodCategory };