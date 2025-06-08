import { Page, Browser, ElementHandle, Frame } from 'puppeteer';
import {ExistingBrowserSubClass} from './ExistingBrowserSubClass';
import LoginOperator from './LoginOperator/LoginOperator';
import creds from './LoginOperator/Credentials';
import CaptchaScreenshot from './Captcha/CaptchaScreenshot';

let ebs:ExistingBrowserSubClass = new ExistingBrowserSubClass();

let br:Promise<Browser> = ebs.browser;

let tab:Promise<Page> = br
.then((browser:Browser) => browser.pages())
.then((tabs:Page[]) => tabs[0]);

let lo:LoginOperator = new LoginOperator(tab, creds as [string, string]);
const capScr:CaptchaScreenshot = new CaptchaScreenshot(tab);

lo.writePassword('input#Haslo1')
// lo.writePassword('input#Haslo')
/*.then(() => */ /*capScr.makeScreenshot()*/ /*)*/
// .then(() => lo.clickNext('button#btLogOn'))
// .catch((err:Error) => console.log(err)) 
.finally(() => ebs.disconnectBrowser())
