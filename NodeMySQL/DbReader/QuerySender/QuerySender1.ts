import {Connection, FieldPacket} from 'mysql2/promise'
import getQuery from '../QueriesStrings/ColumnsQueryFunction'

export default function sendQuery(connection1:Connection):Promise<[any, FieldPacket[]]> {return connection1.query(getQuery())}