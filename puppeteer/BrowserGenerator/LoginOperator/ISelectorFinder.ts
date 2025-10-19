import {ElementHandle} from 'puppeteer';

export interface ISelectorFinder {
	findElement():Promise<ElementHandle<T>>;
	set selector(selector:string):void;
}