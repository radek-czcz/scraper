const writerFS = require('fs')

var dataToWrite = 'cde';

/*writerFS.writeFile('formList.csv', dataToWrite, 'utf8', function (err) {
  if (err) {
    console.log('Some error occured - file either not saved or corrupted file saved.');
  } else{
    console.log('It\'s saved!');
  }
})*/

writerFS.appendFile('formList.csv', ','+dataToWrite, 'utf8', function (err) {
  if (err) {
    console.log('Some error occured - file either not saved or corrupted file saved.');
  } else{
    console.log('It\'s saved!');
  }
});
