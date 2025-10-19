import "reflect-metadata";
import {autoInjectable, Lifecycle, inject, injectable} from 'tsyringe';
import {container} from './Containers/ContinuatorContainer';
import {Registrator} from './Registrator'
import {Continuator} from './Continuator';
import {Page, ElementHandle} from 'puppeteer';
import {CookiesManager} from '../BrowserGenerator/CookiesManager';
import {ExistingBrowserSubClass} from '../BrowserGenerator/ExistingBrowserSubClass';
import {Navigator} from '../BrowserGenerator/Navigator';
import {ISelectorFinder} from '../BrowserGenerator/LoginOperator/ISelectorFinder';
import {InputBoxWriter} from '../BrowserGenerator/LoginOperator/InputBoxWriter';

// @injectable()
@autoInjectable()
class ContinuatorHere<T> extends Continuator<T> {
	constructor(
		private registrator:Registrator, // Regisrator should be first always
		private _tab:Promise<Page>,
		private _cm:CookiesManager,
		private nav:Navigator,
		protected _existing:ExistingBrowserSubClass,
		@inject('sel-finder') private selF:ISelectorFinder,
		private _inputBoxWriter:InputBoxWriter,
	) {super(_existing)}

	get cm():CookiesManager {
		return this._cm
	}
	get existing():ExistingBrowserSubClass {
		return this._existing;
	}
	get navigator():Navigator {
		return this.nav;
	}
	get selectorFinder():ISelectorFinder {
		return this.selF;
	}
	get tab() {
		return this._tab
	}
	get inputBoxWriter():InputBoxWriter {
		return this._inputBoxWriter;
	}
}

container.register(Continuator, {useClass:ContinuatorHere}, {lifecycle: Lifecycle.Singleton}) 

const continuator:ContinuatorHere<Page> = container.resolve(Continuator) as ContinuatorHere<Page>;



continuator.resume()
.then(() => {return continuator.navigator.goToPage()})
.then(() => Promise.all([
	continuator.cm.insertStorageData(),
	continuator.cm.setCookies()
]))
.then(() => continuator.selectorFinder.findElement())
.then((elH:ElementHandle<HTMLElement>) => elH.click())
.then(() => {
	continuator.inputBoxWriter.selector = 'input#Login';
	return continuator.inputBoxWriter.writeToInputbox(0)
})
.then(() => continuator.tab
	.then((page:Page) => page.keyboard.press('Enter')
		.then(() => {
			continuator.selectorFinder.selector = 'input#Haslo';
			// return continuator.selectorFinder.findElement()
		})
	)
)
.then(() => continuator.inputBoxWriter.writeToInputbox(1)
	.then(() => continuator.tab
		.then((page:Page) => page.keyboard.press('Enter'))
	)
)
.then(() => continuator.existing.disconnectBrowser())