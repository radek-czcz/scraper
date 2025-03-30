import { readFile } from 'node:fs/promises';

export default class NamesFileReader {
	static 	async readFile(inpText:Promise<string>):Promise<string[]> {
		const text = await inpText;
		switch (true) {
			case text.includes('męskie'):
				return	readFile('./Captcha/mNames.csv', { encoding: 'utf8' })
				.then((res:string) => NamesFileReader.strRep(res));
			break;
			case text.includes('żeńskie'):
				return	readFile('./Captcha/fNames.csv', { encoding: 'utf8' })
				.then((res:string) => NamesFileReader.strRep(res));
			break;
			default: throw "Word -zenski- or -meski- not found"
		}
	}

	private static strRep(inp:string):string[] {
		return inp
		.replaceAll(`"`, '')
		.replaceAll(",", '')
		.replaceAll('\r', '')
		.replaceAll(' ', '')
		.split('\n')
	}
}