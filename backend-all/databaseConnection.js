import mysql2 from 'mysql2';

const connection = mysql2.createConnection({
  host: 'localhost',
  user: 'hapi-server',
  password: 'asd2%yhfA',
  database: 'store'
});

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
