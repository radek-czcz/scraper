import connection, {closeConnection} from '../Connection/connection2'
import {Connection, Query, FieldPacket, ResultSetHeader} from 'mysql2/promise'
import processResults from './ProcessFunction'
import getQuery from './QueriesStrings/ColumnsQueryFunction'
import sendQuery from './QuerySender'
import queryString from './QueriesStrings/ColumnsQueryFunction'

export default function main(tableName:string = 'mojeprodukty') {
  const query:Promise<[any, FieldPacket[]]> = connection.then(sendQuery);
  const myProcess:Promise<void> = query.then(processResults);
  myProcess.then((res:void) => closeConnection());
}

main()