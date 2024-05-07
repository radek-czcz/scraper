import { getBrowserFromParentProcess, getPage } from './puppLoader.js';
import { main } from './puppWriterDB.js';

// 1. GET PLAN DETAILS AS HTML OUTER ELEMENT
export default function connectToExistingInstance() {
	let browser;
	getBrowserFromParentProcess()
	.then((res) => {
		let page
		let bPlan;
		let hPlan;
		let exams;
		let examsPromise;
		let examsPromise2;
		let hPlanPromise;
		let bPlanPromise;
		
		browser = res;
		let pagePromise = getPage()
		.catch(err => console.log('getPage() function failed: ', err));
		let getHtmlString = pagePromise
		.then((res, reject) => {
			function rejected(result) {console.error('rej1: ', result);throw result;}
			function resolved(result) {console.log('res1: ', result); return result}
			console.log('getting plan');
			examsPromise = res.$eval('div.panel.sprawdziany > div:nth-child(4)', res => res.outerHTML)
			// .catch(err => console.error(err));
			let plan;
			plan = res.$$eval('div.panel.plan > div.subDiv.pCont > div', res => res.map(inp => inp.outerHTML)).then(res => res.length===0 ? Promise.reject(new Error("empty eval")) : res)
			console.log('examsPromise: \n', examsPromise, '\n', 'plan: \n', plan)
			hPlanPromise = plan.then(resolved, rejected/*res => bPlan = res[0]*/);
			bPlanPromise = plan.then(resolved, rejected/*res => hPlan = res[1]*/);
			examsPromise2 = examsPromise.then(resolved, rejected) /*=> exams = res; console.log('res: \n', res)})*/;
			let allPromises = Promise.allSettled( [ hPlanPromise, bPlanPromise, examsPromise2 ] ).then((res) => {
				console.log('hPlanPromise: \n', hPlanPromise, '\n', 'bPlanPromise: \n', bPlanPromise, '\n', 'examsPromise2: \n', examsPromise2)
				console.log('res3: \n', res)
				let retVal = res.filter(inp => inp.status === 'fulfilled')

				return retVal.length === 0 ? Promise.reject("no promise fulfilled") : Promise.resolve(retVal);
			})
			return allPromises;
		})
		let writeToDB = getHtmlString
		.then((res) => {
			console.log('res2: \n', res);
			// console.log('rej2: \n', rej);
			browser.disconnect();
			console.log('writing to db');
			main([exams, hPlan, bPlan]);})
		.catch(err => {console.log(err); writeToDB = null})
	})}

connectToExistingInstance();