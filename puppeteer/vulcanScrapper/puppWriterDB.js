const pWriter = require('../../NodeMySQL/connectionToVulcan.js');

async function main(inp) {
  pWriter.insert(inp);
}

module.exports = {main};
