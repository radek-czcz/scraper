import { getBrowserFromParentProcess, getPage, writerDB, refreshPage } from './index';
import {Browser, Page, ElementHandle} from 'puppeteer';
const log = require('why-is-node-running');

// 1. GET PLAN DETAILS AS HTML OUTER ELEMENT
export default function connectToExistingInstance() {
	let browser:Browser;
	getBrowserFromParentProcess()
	.then((res:Browser) => {
		// variable initializations
			browser = res;

		// get page from connected browser
			let pagePromise:Promise<Page> = getPage()
			.catch((err:Error) => {console.log('getPage() function failed: ', err); throw err});

		// refresh the page
			// let refresh:Promise<any> = pagePromise.then(page => {/*Promise.resolve()*/page.reload({ waitUntil: 'domcontentloaded' }); return page})
			// .then((page) => page.waitForSelector('div.css-1d90tha'))

		// get all offers divs and extract data
			let getHtmlString:Promise<any> = Promise.all([pagePromise/*, refresh*/]).then((res:Array<Page|void>) => <Page>res[0])
			.then(async (res:Page) => {
				browser = res.browser();
				let selectorNo1:boolean|void = await res.$('div.css-1d90tha').then(res => res !== null)
				.catch((err:Error) => {console.log(err)/*;throw err*/})
				if (selectorNo1) {
					console.log('getting offers');
					let examsPromise:Promise<any> = res.$$eval('div.css-1venxj6', divs => divs.map(function(inp) {
						function getPrice():string { let str:string = inp.querySelector('p.css-tyui9s.er34gjf0').textContent; 
							str = str.replace(' ', '').replace(' zł', '')
							return str.endsWith('do negocjacji') ? str.replace('do negocjacji', '') : str };
						function getYearAndMileage():string { return inp.querySelector('span.css-efx9z5').textContent }
						function getYear():string { return getYearAndMileage().split(' - ')[0] }
						function getMileage():number { return parseInt(getYearAndMileage().split(' - ')[1].replace(' km', '')) }
						function getCityAndDate():string { return inp.querySelector('p.css-1a4brun.er34gjf0').textContent }
						function getCity():string { return getCityAndDate().split(' - ')[0] }
						function getDate():string {  return getCityAndDate().split(' - ')[1]  }
						function getDescription():string { return inp.querySelector('h6.css-16v5mdi.er34gjf0').textContent }
						function getBrand():string|null { return getDescription().toLowerCase().includes('toyota') ? 'Toyota' : null}
						function getModel():string|null { return getDescription().toLowerCase().includes('avensis') ? 'Avensis' : null}
						function GFG_Fun():string { let date = new Date(); return date.toISOString().slice(0, 19).replace('T', ' ') }
						return {
							price: getPrice(),
							prodYear: getYear(),
							mileage: getMileage(),
							city: getCity(),
							offerDate: getDate(),
							descr: getDescription(),
							brand: getBrand(),
							model: getModel(),
							fetchDate: GFG_Fun()
						}
					}))
					.catch((err:Error) => {
						console.log(err);
						Promise.reject(new Error("offers could not be found"))
					});
					return examsPromise;
				} else throw 'user must log in again';
			})

		// disconnect browser and write data to DB
			let writeToDB = getHtmlString
			.then((res) => {
				browser.disconnect();
				console.log('writing to db');
				let big = 8;
				let small = 7;
				let counter = 0;
				let resolver:any;

				let promiseCounter = function() {
					console.log('from counter');
					let calc:number = big - small
					console.log(calc, counter, counter<=calc);
					counter === calc ? resolver() : counter++;
				}

				let promiseAllInsertsDone = new Promise(resolve => {
					resolver = resolve;
				})

				for (let nth=7; nth<=8/*res.length-1*/; nth++) {
					/*try {*/
						writerDB(res[nth]).then(promiseCounter)
						.catch(err => console.log('error in writing'))
					/*} catch (err:any) {
						if (err.errorno === 1062) {console.log('continue in Fetcher'); continue}
						else {console.log('here2');}
					}*/
				}

				promiseAllInsertsDone.then(() => {console.log('closing browser connection'); setTimeout(() => log(), 1000)/*; browser.isConnected() ? browser.disconnect() : {}*/})
				// browser.isConnected() ? browser.disconnect() : {};
			})

		// catcher
			.catch((err:Error) => {
				console.log('from catcher');
				// browser.isConnected() ? browser.disconnect() : {};
				console.log('from catcher 2');
			})
	})}
refreshPage()
.then(() => connectToExistingInstance());