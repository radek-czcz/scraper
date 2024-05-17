const fs = require('fs');
const pupp = require('./puppLoader.cjs')

// 1. TYPE IN LOGIN AND PASSWORD
// 2. CLICK SUBMIT BUTTON
function setCookies() {
		let page;
		let cookies;

		function getCookies() {
			return new Promise ((res1, rej) => fs.readFile('./cookies.json', function(err, data) {
				if(err) {
					console.log('reading cookies file failed');
					throw err;
				}
				cookies = JSON.parse(data);
				res1(cookies)
			}))
		}

		let cookieF = getCookies();

		cookieF.then((res) => {console.dir(res, {depth: 0}); cookies = res})

		let pageF = pupp.getExistingPage();

		pageF.then((res) => {console.dir(res, {depth: 0}), page = res})
		
		let ret2 = Promise.all([page, cookieF]).then(res => {
	    	return page.setCookie(...cookies).then(() => console.log('cookies set'));
	    })

	    // .then((res, err) => {
	    // 	if (!err) {
	    // 		console.log('cookies have been set')
	    // 		process.stdout.write('cookies set')
	    // 	} else console.error(err);
	    // 	// page.browser().disconnect();
	    // })
	    .catch(err => console.log('cookies could not been set'));
	    return ret2
}

module.exports = { setCookies }
