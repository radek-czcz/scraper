import { getBrowserFromParentProcess, getPage } from './index';
import { main } from './puppWriterDB.js';
import log from 'why-is-node-running';
import {Page, Browser} from 'puppeteer';

// 1. GET PLAN DETAILS AS HTML OUTER ELEMENT
export default function connectToExistingInstance() {
	let browser:Browser;
	getBrowserFromParentProcess()
	.then((res:Browser) => {
		let bPlan;
		let hPlan;
		let exams;
		
		browser = res;
		let pagePromise:Promise<Page | void> = getPage()
		.catch(err => console.log('getPage() function failed: ', err))

		.then(async (res:Page|void) => {
			let examsPromise2:Promise<void>;
			let hPlanPromise:Promise<void>;
			let bPlanPromise:Promise<void>;
			let examsPromise:Promise<void>;
			let plan:Promise<string>;

			function rejected(result:Error):void {console.error('rej1: ', result); throw result;}
			// function resolved(result:Error):void {console.log('res1: ', result); return result}

			if (typeof res === 'Page' && res.$('span.user-info') !== null) {
				console.log('getting plan');
				examsPromise = res.$eval('div.panel.sprawdziany > div:nth-child(4)', res => res.outerHTML)
				.catch(err => Promise.reject(
					new Error("examsPromise - information about exams could not be found")
				));
				plan = res.$$eval('div.panel.plan > div.subDiv.pCont > div', res => res.map(inp => inp.outerHTML))
				/*.then(res => res.length===0 ? Promise.reject(new Error("empty eval, plan could not be found")) : res)
				hPlanPromise = plan.then(res => res[0] ? hPlan = res[0] : null, rejected);
				bPlanPromise = plan.then(res => res[1] ? bPlan = res[1] : null, rejected);
				examsPromise2 = examsPromise.then( res => exams = res, rejected);
				let allPromises = Promise.allSettled( [ hPlanPromise, bPlanPromise, examsPromise2 ] ).then((res) => {
					console.log('res2: \n');
					res.forEach(elem => console.log(elem.status))
					let retVal = res.filter(inp => inp.status === 'fulfilled')
	
					return retVal.length === 0 ? Promise.reject("no promise fulfilled") : Promise.resolve(retVal);
				})
				return allPromises;*/
			} else throw new Error('user must log in again');
		})

		/*let writeToDB = pagePromise
		.then((res) => {
			browser.disconnect()
			console.log('res3: \n', res);
			console.log('writing to db');
			let objToDB = {}
			exams ? objToDB.exams = exams: null;
			hPlan ? objToDB.hPlan = hPlan: null;
			bPlan ? objToDB.bPlan = bPlan: null;
			main(objToDB);
		})

		.catch(err => {
			console.log(err);
			if (err = 'user must log in again') {browser ? browser.disconnect() : null; throw err;}
			browser ? browser.disconnect() : null
		})*/
	}/*)}*/

connectToExistingInstance();