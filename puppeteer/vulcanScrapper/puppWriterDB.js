import { insert } from './connectionToVulcan.js';

async function main(inp) {
  let {exams, hPlan, bPlan} = inp;
  insert(exams, hPlan, bPlan);
}

export {main};
