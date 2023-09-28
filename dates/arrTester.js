const dates = require('./date.js')

let arr = new Array(2,2);
arr[0][0] = 'abc';
arr[0][1] = 'cde';
arr[1][0] = 'pqr';
arr[1][1] = 'hgf';


let dateNow = dates.dateToSqlFormat(new Date());

console.log(dateNow/*arr[0][1]*/);


