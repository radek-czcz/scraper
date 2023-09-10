import mysql2 from 'mysql2';


// UTWORZENIE POŁĄCZENIA Z BAZĄ DANYCH

  const connection = mysql2.createConnection({
    host: /*'localhost'*/ '188.210.222.87',
    user: /*'hapi-server'*/ 'srv59554_mojeprodukty',
    password: /*'asd2%yhfA'*/ '2!gTaC83GwseD',
    database: /*'store'*/ 'srv59554_mojeprodukty'
  });


// OBIEKT db DO OBSŁUGI ZAPYTAŃ DO MYSQL

  export const db = {

    connect: () => connection.connect(),

    query: (queryString, escapedValues) =>
      new Promise((resolve, rej) => {
        connection.query(queryString, escapedValues, (err, res, fields) => {
          if (err) rej(err);
          resolve(res);
        })
      }),

    end: () => connection.end()

  }
