import {urlArr, Browser, Page}, browser from './index';

function newTabs():Promise<Page>[] {
	return arrUrl
	.slice(0, arrUrl.length - 1)
	.map((url:string) => browser
		.then((res:Browser) => res.newPage())
	)
};

export let tabs:Promise<Page[]> = brow1
.then(() => Promise.all([...newTabs()]))