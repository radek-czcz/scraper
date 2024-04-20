const pLoader = require('./puppLoader.js');
var net = require('net');

// 1. TYPE IN LOGIN AND PASSWORD
// 2. CLICK SUBMIT BUTTON
function connectToExistingInstance() {
	let pageUrl;
	let page;
	let client;

let connect = new Promise((res) => {
  client = net.connect({port: 8088}, function() {
   console.log('net.client says: connected to server!');  
  });

  client.on('data', function(data) {
    console.log('net.client says: data received - ', data.toString());
    // endpoint = data.toString();
    // client.end();
    res(client);
  });

  client.on('end', function() { 
   console.log('net.client says: disconnected from server');
  });
})

	connect.then((res) => {

		let pages = pLoader.getPu().then(res => res.pages())
		.catch(err => console.log('pages() function failed: ', err));
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
			console.log('writing login');
			return page.type('#LoginName', 'kamila.@gmail.com', {delay: 100})
			.then((res, err) => {
				console.log('writing password');
				return page.type('#Password', '', {delay: 100});
			})
			.then((res, err) => {
				return page.click('div.center > input[type="submit"]')
			})
		})
	}).then(res => res.write('close server, please'))
}

connectToExistingInstance();