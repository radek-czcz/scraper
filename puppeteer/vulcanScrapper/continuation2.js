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
			console.log('getting plan');
			examsPromise = res.$eval('div.panel.sprawdziany > div:nth-child(4)', res => res.outerHTML)
			.catch(err => console.error(err));
			let plan;
			plan = res.$$eval('div.panel.plan > div.subDiv.pCont > div', res => res.map(inp => inp.outerHTML))
			hPlanPromise = plan.then(res => bPlan = res[0]);
			bPlanPromise = plan.then(res => hPlan = res[1]);
			function rejected(result) {
  				console.error('rej: ', result);
			}
			function resolved(result) {
  				console.log('res: ', result);
			}
			examsPromise2 = examsPromise.then(resolved, rejected) /*=> exams = res; console.log('res: \n', res)})*/;
			return Promise.all( [ hPlanPromise, bPlanPromise, examsPromise2 ] )
		})
		let writeToDB = getHtmlString
		.then((res, rej) => {
			browser.disconnect();
			console.log('writing to db');
			main([exams, hPlan, bPlan]);})
		.catch(err => console.log(err))
	})}

connectToExistingInstance();