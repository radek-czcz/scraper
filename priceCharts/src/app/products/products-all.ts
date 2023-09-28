import * as mysql from 'mysql2';

class allProducts {

  name5: string = '';

  products: iProduct[] = [];



  export function getAllproductsFromDB(): void {
    const connection: Connection = mysql.createConnection({
      host:'localhost',
      port:3306,
      database:'store',
      user:'root',
      password:'XXX'
    });

    let queryString: string = 'SELECT * FROM ?';

    connection.query(queryString, 'mojeprodukty', (err:MysqlError, res:any, fds:FieldInfo[]) => {
      console.log(res);
    });

  }
}
