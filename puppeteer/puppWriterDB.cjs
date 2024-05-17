const pWriter = require('../NodeMySQL/connection.cjs');

async function main(names, prices, seller) {
  console.log('seller from puppWriterDB ' + seller)
  pWriter.insert(names, prices, seller);
}

module.exports = {main};
