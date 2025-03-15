import { Page, JSONArray } from 'puppeteer'

export default class StorageDataInserter {

	tab:Promise<Page>;

	constructor(tab:Promise<Page>) {
		this.tab = tab
	}

	public insertData(data:[JSONArray, JSONArray]):Promise<void> {
		return this.tab.then((tab:Page) => tab.evaluate(
			(sData) => {
				console.log(sData);
				for (const [key, value] of Object.entries(sData[1])) {
					sessionStorage[key] = value;
				}
				for (const [key, value] of Object.entries(sData[0])) {
					localStorage[key] = value;
				}
			}, data
		))
	}
}