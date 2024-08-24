import connection, {closeConnection} from '../Connection/connection2'
import {FieldPacket} from 'mysql2/promise'
import {joinWithCommas as processResults} from './ProcessFunction'
import getQuery from './QueriesStrings/ColumnsQueryFunction'
import sendQuery from './QuerySender'
import {QuerySender2} from './QuerySender'

// READ COLUMNS' NAMES FROM DB
  export default function main(tableName:string = 'mojeprodukty'):Promise<string> {
    let sender:QuerySender2 = new QuerySender2(getQuery())
    const query:Promise<[any, FieldPacket[]]> = connection.then(sender.sendQuery());
    const myProcess:Promise<string> = query.then(processResults);
    // myProcess.then(() => closeConnection());
    return myProcess
  }