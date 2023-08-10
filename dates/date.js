
let da = new Date();

function getOnlyYMD (inpDate) {
console.log(inpDate.toLocaleString('pl',{year:'numeric', month:'numeric', day:'numeric'}));
}

function dateToSqlFormat (inpDate) {
  let month = inpDate.getMonth() + 1;
  month = month < 9 ? ('0'+month) : month + 1;
  let day = inpDate.getDate() < 10 ? ('0'+inpDate.getDate()) : inpDate.getDate();
  return inpDate.getFullYear()+'-'+month+'-'+day;
}

console.log(dateToSqlFormat(new Date()));

module.exports = {getOnlyYMD, dateToSqlFormat};
