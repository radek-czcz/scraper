let pr1:Promise<number> = new Promise((resolve:Function, reject:Function) => resolve(2));

// const first:Promise<number> = pr1.then((inp:number) => {console.log(inp); /*return inp*/ throw "error test"});
const first:Promise<number> = pr1.then((inp:number) => {console.log(inp); if ('a') return 'c'; else throw "error test"});

const second:Promise<number> = first.finally(() => {console.log('a'); throw "finally error"});

const second2:Promise<number> = second.finally(() => {console.log('b')});

const catchVar:Promise<void|number> = second2.catch((err:Error) => {console.log('error log:');console.error(err)/*; return 4*/})

second2.then((inp:number/*|void*/) => console.log(inp! + 1));