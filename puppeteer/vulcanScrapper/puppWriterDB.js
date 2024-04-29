import { insert } from './connectionToVulcan.js';

async function main(inp) {
  let [ex, hP, bP] = inp;
  insert(ex, hP, bP);
}

export {main};
