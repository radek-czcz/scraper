const pWriter = require('../../NodeMySQL/connectionToVulcan.js');

async function main(inp) {
  let [ex, hP, bP] = inp;
  pWriter.insert(ex, hP, bP);
}

module.exports = {main};
