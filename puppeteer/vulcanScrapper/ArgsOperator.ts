// import process from 'node:process';
import { argv } from 'node:process';

export interface InumInArgsArr {
	"noInArrayOfTabs":string
}

let allArgs:InumInArgsArr;

function initialize():void {
	let argsOb:Function =  function() {
		let ob:{[key:string]: string} = {}
		argv.forEach((inp, index) => {
			// console.log('ob: ', index, inp);
			if (inp.split("=").length === 2) ob[inp.split("=")[0]] = inp.split("=")[1]
			else ob[index] = inp
		})
		// console.log(ob);

		return ob;
	}
	allArgs = argsOb();
}

export function getArg(name:string):string {
	if (!allArgs) initialize();
	return allArgs[name as keyof InumInArgsArr];
}

initialize();
