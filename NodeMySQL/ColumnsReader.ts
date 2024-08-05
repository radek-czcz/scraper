import connection from './connection2'
import {Connection, Query, FieldPacket, ResultSetHeader} from 'mysql2/promise'

const queryString:string = "SHOW COLUMNS FROM"

function sendQuery(connection1:Connection):Promise<Query> {connection1.query(queryString)}

function processResults(res:[any, FieldPacket[]]) {console.log(res[0].map((inp:any) => inp.Field).reduce((x:string, y:string) => x+', '+y))}

function closeConnection(connection1:Promise<Connection>) {connection1.then((res:Connection) => res.end())}

export default function main(tableName:string = ' mojeprodukty') {
  queryString=+tableName
  const query:Promise<[any, FieldPacket[]]> = connection.then(sendQuery);
  const process:Promise<void> = query.then(processResults);
  process.then((res:void) => closeConnection(connection));
}
