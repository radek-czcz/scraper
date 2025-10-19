import { readFile } from 'node:fs/promises';
import {Gender} from './GenderReader';
import stringFunction from './NamesFileProcessFunction';
import {autoInjectable, inject} from 'tsyringe';
import GenderReader from './GenderReader'
import {IFilePathProvider} from './IFilePathProvider';

@autoInjectable()
export class NamesFileReader2 extends NamesFileReader {

	constructor(
		private _genReader:GenderReader,
		@inject('names-filePath-provider') private _filePathProvider:IFilePathProvider
	) {super(_genReader)}

	async readFile():Promise<ReturnType<typeof stringFunction>> {
		const path:string = await this._filePathProvider.filePath;
		console.log(this);
		// switch (true) {
		// 	case gender===Gender.Male:
				return	readFile(path, { encoding: 'utf8' })
			// 	.then((res:string) => stringFunction(res));
			// break;
			// case gender===Gender.Female:
			// 	return	readFile('../BrowserGenerator/Captcha/fNames.csv', { encoding: 'utf8' })
			// 	.then((res:string) => stringFunction(res));
			// break;
			// default: throw "Word -zenski- or -meski- not found"
		// }
	}
}