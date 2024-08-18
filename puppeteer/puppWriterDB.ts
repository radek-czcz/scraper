import pWriter from '../NodeMySQL/WriterToDB';

async function main(names:string[], prices:string[], seller:string):Promise<void> {
  pWriter(names, prices, seller);
}

export {main};
