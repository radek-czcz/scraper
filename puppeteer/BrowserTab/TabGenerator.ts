import {browser, urlArr, Browser, Page, ISitesAndCategories} from './index';

let arrUrl:string[] = [];
urlArr.forEach((inp:ISitesAndCategories) => arrUrl.push(inp.url));
let brwsr:Promise<Browser> = browser(undefined);

function newTabs():Promise<Page>[] {
	return arrUrl
	.slice(0, arrUrl.length - 1)
	.map((url:string) => brwsr
		.then((res:Browser) => res.newPage())
	)
};

export let tabs:Promise<Page[]> = brwsr
.then(() => Promise.all([...newTabs()]))