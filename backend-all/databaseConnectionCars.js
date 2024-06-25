import mysql2 from 'mysql2';
import connSettings from './connectionSettingsCars.js'


// UTWORZENIE POŁĄCZENIA Z BAZĄ DANYCH
  const connection = mysql2.createPool(connSettings.settings);
  //console.log(connection);
  connection.on('close', () => console.log('closing - info'));
  connection.on('error', () => console.log(connection));

// OBIEKT db DO OBSŁUGI ZAPYTAŃ DO MYSQL
  export const db = {
    query: (queryString, escapedValues) =>
    new Promise((resolve, reject) => {
      connection.query(queryString, escapedValues, (err, res, fields) => {
        if (err) {
          console.log('error from db: ', err);
          reject(err)
        };
        resolve(res);
      })
    }),
    end: () => connection.end()
  }
