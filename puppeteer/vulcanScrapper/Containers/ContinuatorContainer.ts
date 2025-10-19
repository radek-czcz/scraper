import {container, Lifecycle} from 'tsyringe';
import {Registrator} from '../Registrator'
import {BrowserSubClass} from '../../BrowserGenerator/BrowserSubClass';
import {IndexVulcan} from '../IndexVulcan';
import {ExistingBrowserSubClass} from '../../BrowserGenerator/ExistingBrowserSubClass';
import {Continuator} from '../Continuator';
import {Page} from 'puppeteer';
import {CookiesManager} from '../../BrowserGenerator/CookiesManager';
import {Navigator} from '../../BrowserGenerator/Navigator';
import {ISelectorFinder} from '../../BrowserGenerator/LoginOperator/ISelectorFinder';
import {SelectorFinder1} from '../../BrowserGenerator/LoginOperator/SelectorFinder1';
import {SelectorFinder3} from '../../BrowserGenerator/LoginOperator/SelectorFinder3';
import {InputBoxWriter} from '../../BrowserGenerator/LoginOperator/InputBoxWriter'
import creds from '../../BrowserGenerator/LoginOperator/Credentials';
import {ScreenshotMethod2} from '../../BrowserGenerator/Captcha/ScreenshotMethod2';
import GenderReader from '../../BrowserGenerator/Captcha/GenderReader';
import GenderReader2 from '../../BrowserGenerator/Captcha/GenderReader2';
import RequestSender from '../../BrowserGenerator/Captcha/RequestSender';
import {NamesFileReader} from '../../BrowserGenerator/Captcha/NamesFileReader';
import {NamesFileReader2} from '../../BrowserGenerator/Captcha/NamesFileReader2';



//Browser starter, 
	// class BrowserSubClass
	container.register('headless', {useValue:false})
	container.register('port', {useValue:8088})
	// class IndexVulcan
	const firstBrowserSymbol = Symbol.for('firstBrowserSymbol');
	container.register(firstBrowserSymbol, {useClass:BrowserSubClass})
	container.register('1st-runner', {useClass:IndexVulcan});

// existing browser for all rest processes
	container.register(ExistingBrowserSubClass, {useClass:ExistingBrowserSubClass}, {lifecycle: Lifecycle.Singleton});
	container.register(Registrator, {useClass:Registrator});

//Navigate
	// class ContinuatorHere
container.register('nav-time', {useValue:'networkidle2'/*'domcontentloaded'*/})
container.register<string>('cookies-path', {useValue:'../../puppeteer/ConfigFiles/vulcan/cookies.json',});
container.register('nav-destination', {useValue:'https://dziennik-uczen.vulcan.net.pl/gminawolow'})
container.register('sel-finder', {useClass:SelectorFinder1}, {lifecycle: Lifecycle.Singleton});
container.register('selector', {useValue:'a.extra-button.extra-button-gray'})
container.register('selector-inputbox', {useValue:'input#Login'});
container.register('credentials', {useValue:creds});

container.register<string>('captcha-selector', {useValue:'img.v-captcha-image'});
container.register<string>('captcha-path', {useValue:'../BrowserGenerator/Captcha/output1.png'});
container.register('screenshot-function', {useClass:ScreenshotMethod2});
container.register<GenderReader>(GenderReader, {useClass:GenderReader2});
container.register(RequestSender, {useClass:RequestSender});
container.register('sel-finder-gender', {useClass:SelectorFinder3}, {lifecycle: Lifecycle.Singleton});
container.register(NamesFileReader, {useClass:NamesFileReader});
container.register('names-filePath-provider', {useClass:GenderReader2});
// container.register(NamesFileReader, {useClass:NamesFileReader2});



// container.register(CaptchaScreenshot, {useClass:CaptchaScreenshot});


// container.register(Navigator, {useClass:Navigator});

// container.register('port', {useValue:8089});
// container.register(CookiesManager, {useClass:CookiesManager});

// 	container.register('cookies-urls', {useValue:[
// 		'https://uonetplus.vulcan.net.pl/gminawolow', 
// 		'https://uonetplus-cdn.vulcan.net.pl', 
// 		'https://home.pl'
// 	]});


export {container}