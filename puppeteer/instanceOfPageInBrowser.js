const pLoader = require('./puppLoader.js');
const pScroller = require('./puppScroller.js')

let browser;
let page;

function loadBrowserAndPage() {

	let urlInp = 'https://www.mediaexpert.pl/komputery-i-tablety/klawiatury-komputerowe/klawiatury/logitech.microsoft.hp.samsung.dell.asus/komunikacja-z-komputerem_bezprzewodowa?sort=price_asc';

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

loadBrowserAndPage();

module.exports = {loadBrowserAndPage};