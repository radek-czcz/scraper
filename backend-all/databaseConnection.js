import mysql2 from 'mysql2';


// UTWORZENIE POŁĄCZENIA Z BAZĄ DANYCH
  const connection = mysql2.createConnection({
    host: /*'localhost'*/ '188.210.222.87',
    user: /*'hapi-server'*/ 'srv59554_mojeprodukty',
    password: /*'asd2%yhfA'*/ '2!gTaC83GwseD',
    database: /*'store'*/ 'srv59554_mojeprodukty'
  });

 setInterval(() => {
    console.log(connection);
    for (let mem in connection) {console.log(mem)}
  },120000);
  connection.on('close', () => console.log('closing - info'));
  connection.on('error', () => console.log(connection));


// OBIEKT db DO OBSŁUGI ZAPYTAŃ DO MYSQL
  export const db = {

    connect: () => connection.connect(err => {
        if (err) {
          console.log(err);
        }
    }),

    query: (queryString, escapedValues) =>
      new Promise((resolve, rej) => {
        connection.query(queryString, escapedValues, (err, res, fields) => {
          if (err) rej(err);
          resolve(res);
        })
    }).catch(err => console.log(err)),

    end: () => connection.end()
  }
