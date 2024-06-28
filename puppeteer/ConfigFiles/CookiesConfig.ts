import {seller} from './index';
// import config from './mediaExpert/CookiesPaths';

const configForSpecifiedSeller = [

	{ 
		seller: 'www.mediaexpert.pl',
		config: './mediaExpert/CookiesPaths'
	},
	{
		seller: 'www.whirlpool.pl',
		config: './whirlpool/CookiesPaths'
	}

]

let config = async function():Promise<{	
	pathToCookies:string;
	setterRelativePath:string;
	fetcherRelativePath:string;
}> {return await import(configForSpecifiedSeller.find((inp:{seller:string;config:string;}) => inp.seller === seller)!.config)}

export default config