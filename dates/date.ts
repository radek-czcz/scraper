

function getOnlyYMD(inpDate:Date) {
console.log(inpDate.toLocaleString('pl',{year:'numeric', month:'numeric', day:'numeric'}));
}

function dateToSqlFormat(inpDate:Date):string {
  let month:number = inpDate.getMonth();
  let monthS:string = month <= 9 ? ('0'+(month+1).toString()) : '' + (month + 1).toString();
  let day:string = inpDate.getDate() < 10 ? ('0'+inpDate.getDate().toString()) : inpDate.getDate().toString();
  return inpDate.getFullYear()+'-'+monthS+'-'+day;
}

function dateToClockTime(inpDate:Date):string {
  let form = new Intl.DateTimeFormat('pl', {timeStyle: 'short'})
  return form.format(inpDate);
}

export {getOnlyYMD, dateToSqlFormat, dateToClockTime};