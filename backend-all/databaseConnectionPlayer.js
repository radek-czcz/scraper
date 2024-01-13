import mysql2 from 'mysql2';
import connSettings from './connectionSettingsPlayer.js'


// UTWORZENIE POŁĄCZENIA Z BAZĄ DANYCH
  const connection = mysql2.createPool(connSettings.settings);
  //console.log(connection);
  connection.on('close', () => console.log('closing - info'));
  connection.on('error', () => console.log(connection));

// OBIEKT db DO OBSŁUGI ZAPYTAŃ DO MYSQL
  export const db = {

    /*connect: () => connection.connect(err => {
        if (err) {
          console.log(err);
        }
    }),*/

    query: (queryString, escapedValues) =>
    new Promise((resolve, reject) => {
      connection.query(queryString, escapedValues, (err, res, fields) => {
        if (err) {
          console.log('error from db: ', err);
          reject(err)
        };
        resolve(res);
      })
    })/*.catch(err => console.log(err))*/ ,

    end: () => connection.end()
  }
