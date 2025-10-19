import {autoInjectable, inject} from 'tsyringe';
import {ElementHandle} from 'puppeteer';
import {SelectorFinder1} from './SelectorFinder1';
import {ISelectorFinder} from './ISelectorFinder';

//temp
import { Page, Frame } from 'puppeteer'
//temp

@autoInjectable()
export class SelectorFinder3<T extends HTMLElement> extends SelectorFinder1<T> implements ISelectorFinder {

	findElement():Promise<ElementHandle<T>> {
		const element = this.page
		.then((tab:Page|Frame) => 
			tab.$(this.slctr)
		)
		return element.then((res:ElementHandle<T> | null) => {
			if (!res) return Promise.reject('Element hidden')
			else return res
		})
	}
}