import { Page, Browser, ElementHandle, Frame } from 'puppeteer';
import {ExistingBrowserSubClass} from './ExistingBrowserSubClass';
import LoginOperator from './LoginOperator/LoginOperator';
import creds from './LoginOperator/Credentials';
import CaptchaManager from './CaptchaManager'

let ebs:ExistingBrowserSubClass = new ExistingBrowserSubClass();

let br:Promise<Browser> = ebs.browser;

let tab:Promise<Page> = br
.then((browser:Browser) => browser.pages())
.then((tabs:Page[]) => tabs[0]);

let lo:LoginOperator = new LoginOperator(tab, creds as [string, string]);
const capMan:CaptchaManager = new CaptchaManager(tab);

function passwordCallback() {
	return lo.writePassword('input#Haslo');
}

capMan.receiveAndProcessResponse()
.then(passwordCallback, passwordCallback)
.then(() => lo.clickNext('button#btLogOn'))
.finally(() => ebs.disconnectBrowser())
