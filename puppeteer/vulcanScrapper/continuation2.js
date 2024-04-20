const pLoader = require('./puppLoader.js');
const pWriter = require('./puppWriterDB.js')



// 1. GET PLAN DETAILS AS HTML OUTER ELEMENT
function connectToExistingInstance() {
	let pageUrl;
	let browser;
	let page;
	pLoader.connect.then(() => {

		browser = pLoader.getPu();
		let pages = browser.then(res => res.pages())
		.catch(err => console.log(err));
		let titleOfPage;

		pages.then(res => {
			pageUrl = res[0].url();
			console.log('res:');
			console.dir(res, {depth: 1});
			page = res[0]
			return res[0].title();
		})
		.then((res) => {
			console.dir('titleOfPage: ' + res, {depth: 0})
		})
		.then(res => {
			console.log('getting plan');
			return page.$eval('div.panel.sprawdziany > div.subDiv.pCont > div', res => res.outerHTML)
		})
		.then(res => {
			console.log(res);
			console.log('writing to db');
			pWriter.main(res);
		})
		.catch(err => console.log(err))
	})
}

connectToExistingInstance();