const pWriter = require('../NodeMySQL/connection.js');

async function main(names, prices) {
  pWriter.insert(names, prices);
}

module.exports = {main};
