import mysql, {Connection} from 'mysql2/promise';

  // CREATE DB CONNECTION
    const connection:Promise<Connection> = mysql.createConnection({
      host: '188.210.222.87',
      port:3306,
      database: 'srv59554_mojeprodukty',
      user: 'srv59554_mojeprodukty',
      password: 'XasR1Mh&dcAq8G',
    })

    function closeConnection() {connection.then((res:Connection) => res.end())}

export default connection
export {closeConnection}