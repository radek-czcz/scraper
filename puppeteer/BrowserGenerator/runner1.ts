import {BrowserSubClass} from './BrowserSubClass'
import {Navigator} from './Navigator'

let brs = new BrowserSubClass();

brs.establishNetServer();

new Navigator(brs.browser
	.then(browser => browser.pages())
	.then(pages => pages[0])
).goToPage('https://dziennik-uczen.vulcan.net.pl/gminawolow')