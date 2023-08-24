import mysql2 from 'mysql2';


// UTWORZENIE POŁĄCZENIA Z BAZĄ DANYCH

  const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'hapi-server',
    password: 'asd2%yhfA',
    database: 'store'
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
