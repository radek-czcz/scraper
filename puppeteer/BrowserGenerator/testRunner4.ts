let pr1:Promise<string>[]  = [Promise.reject("ra"), Promise.resolve("dek")];

function first(inp:Promise<string>[]) {
	if (inp.length > 0) {
		return inp[0]
	} else throw new Error('empty array')
}

const result:Promise<string> = pr1.reduce((acc:Promise<string>, cur:Promise<string>) => acc.then((res:string) => res, () => cur/*cur.then((res2:string) => res + res2)*/), first(pr1))

result.then((r:string) => console.log(r))