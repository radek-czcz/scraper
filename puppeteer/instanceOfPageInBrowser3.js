
// modyfikacja w celu znalezienia sposobu obejscia capcha


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
	.then(async res => {
		// res[0].mouse.click(50,50);
		let selector1 = await res[0].waitForSelector(
			// 'label.ctp-checkbox-label>input',
			'#onetrust-accept-btn-handler',
			 {timeout: 10000}
		);

		await res[0].click('#onetrust-accept-btn-handler');

		// const rect = await res[0].evaluate(el => {
		//     const {x, y} = el.getBoundingClientRect();
		//     console.log({x, y});
		//     return {x, y};
		// }, selector1);



		// res[0].mouse.click(50,50);
		// document.querySelector('label.ctp-checkbox-label>input')
		let seconds = 20
		let n = 0;
		let counter = function() {
			n++;
			console.log(n);
			n === seconds ? clearInterval(intervalFunc) : {};
		}
		let intervalFunc = setInterval(counter, 1000)
		return new Promise((resolve, reject) => {
			setTimeout(resolve, seconds*1000)
		})

	})
	.then(res => {
		/*const page = res[0];
		console.log(page);
		page.evaluate(() => new Promise((resolve) => {
			const check = document.querySelector('label.ctp-checkbox-label > input');
			console.log(check);
		}));*/

		console.log(res);
	})


	.catch(err => {console.dir(err, {depth:0})})
	.then(res => {
		page = res;
		pScroller.main();
	})
	.then(res => setTimeout(() => console.log('script ends.'), 1000));
}

module.exports = { loadBrowserAndPage, prodCategory };