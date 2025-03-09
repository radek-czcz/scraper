import CommonBrowsers from './CommonBrowsers'
import {BrowserSubClass} from "../puppeteer/BrowserGenerator/BrowserSubClass";
import {Browser} from 'puppeteer'
import 'jasmine';

let resolver:Function;

function resFunction(res:Function, rej:Function) {
        resolver = res;
}

export let pr:Promise<void> = new Promise(resFunction);

export default async function beforeF(this:{
	url:string;
	br2:BrowserSubClass;
	br:Browser;
}) {
                            
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000                
        this.url = 'www.google.com'                             
                                                                
        // this.br2 = await new BrowserSubClass();              
        this.br2 = await CommonBrowsers.bsc();                  
                                                                
        // this.br = await this.br2.browser                     
        this.br = await CommonBrowsers.browser()
        
        this.br2.establishNetServer();
        resolver();

}