import { Browser, Page } from 'puppeteer';
import { loadPuppeteer, loadPage } from './puppLoader';
import { spawn } from 'child_process';
import attachFunc from './ProcessListenersManager';

let webPageUrl:string;

function loadBrowserAndPage(): void {

	let browser: Promise<Browser>;
	let page: Page;

	browser = loadPuppeteer(false);
	let resolver: Function;
	let cookiesPromise: Promise<void> = new Promise(res => {resolver = res});

	let cookiesSet = browser.then(() => {
		let processToSetCookies;
		processToSetCookies = spawn('ts-node', ['../CookiesSetter.ts'],{shell: true});
		let name1 = 'Cookies setting';
		attachFunc({
			processObject: processToSetCookies,
			name: name1,
			onData: function(data: string) {
				if ( data.toString() === 'cookies set' ) {
					resolver();
				}
				console.log(`Process of ${name1} produced output:\n  ${data}`);
			}
		})
	})

	Promise.all([cookiesPromise, cookiesSet]).then(goToPage, onError)
}

function goToPage(res: void[]):Promise<Page> {
	return loadPage(webPageUrl);
}

function onError(err: Error): void {
	if (err) {console.dir(err)}
}

function selectPage():void {

	let listOfWebpagesToSelect: string[] = [
		'https://www.olx.pl/motoryzacja/samochody/toyota/q-avensis/?search%5Border%5D=created_at:desc&search%5Bfilter_float_year:from%5D=2006&search%5Bfilter_float_year:to%5D=2008&search%5Bfilter_float_enginesize:to%5D=1900&search%5Bfilter_enum_petrol%5D%5B0%5D=petrol&search%5Bfilter_enum_petrol%5D%5B1%5D=lpg&search%5Bfilter_enum_car_body%5D%5B0%5D=estate-car&search%5Bfilter_float_milage:to%5D=200000',
		'https://uonetplus.vulcan.net.pl/gminawolow'
	]

	console.log('select the webpage to scrap:\n1. olx (cars)\n2. vulcan');
	process.stdin.once('data', (data:Buffer) => {
		console.log(`you selected ${data}`);
		process.stdin.removeAllListeners();
		let selected:number = parseInt(data.toString()) - 1;
		webPageUrl = listOfWebpagesToSelect[selected];
		loadBrowserAndPage();
	});
}

selectPage();
// loadBrowserAndPage();