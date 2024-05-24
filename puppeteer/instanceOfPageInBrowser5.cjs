const pLoader = require('./puppLoader.cjs');

function loadBrowserAndPage() {

	pLoader.loadPuppeteer(false)
	.then((res, err) => {
		if (err) {console.dir(err)}
		else {
		console.log('browserWsEndpoint: ' + res.wsEndpoint());
		}
	})
}

loadBrowserAndPage()
