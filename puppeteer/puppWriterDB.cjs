const pWriter = require('../NodeMySQL/connection.cjs');

async function main(names, prices, seller) {
  pWriter.insert(names, prices, seller);
}

module.exports = {main};
