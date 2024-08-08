import connection, {closeConnection} from '../Connection/connection2'
import {FieldPacket} from 'mysql2/promise'
import {logResult as processResults} from './ProcessFunction'
import getQuery from './QueriesStrings/ColumnsQueryFunction'
import sendQuery from './QuerySender'
import {QuerySender2} from './QuerySender'

export default function main(tableName:string = 'mojeprodukty') {
  let sender:QuerySender2 = new QuerySender2(getQuery())
  const query:Promise<[any, FieldPacket[]]> = connection.then(sender.sendQuery());
  const myProcess:Promise<void> = query.then(processResults);
  myProcess.then((res:void) => closeConnection());
}

main()
