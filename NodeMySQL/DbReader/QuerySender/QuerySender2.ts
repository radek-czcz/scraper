import {Connection, FieldPacket} from 'mysql2/promise'
import getQuery from '../QueriesStrings/ColumnsQueryFunction'

export class QuerySender2 {
	query:string;

	constructor(queryString:string) {
		this.query = queryString
	}

	sendQuery() {
		let inp:string = this.query;
		function sendQuery(connection1:Connection):Promise<[any, FieldPacket[]]> {return connection1.query(inp)}
		return sendQuery
	}
}