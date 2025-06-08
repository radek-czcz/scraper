

function prom(inp:string|null):Promise<string> {

	type my1type = (resolve:Function, reject:Function) => void;

	const func1:my1type = (resolve:Function, reject:Function) => {
		inp ? resolve(inp) : reject('some error');
	}

	return new Promise(func1)
}

function f2() {
	return prom(null)
		.then((res) => res, (err) => {throw new Error('big error')})
}

f2().then(res => console.log(res), (err:Error) => console.error(err))