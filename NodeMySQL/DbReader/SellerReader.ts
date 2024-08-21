import connection, {closeConnection} from '../Connection/connection2'
import {RowDataPacket, Connection, Query, FieldPacket, ResultSetHeader} from 'mysql2/promise'
import getQuery from './QueriesStrings/SellerNameQueryString'
import {QuerySender2} from './QuerySender'
import {logResult as processResult} from './ProcessFunction'

// SELLER NAME QUERYING FROM DB
	export default function readSellerName():Promise<string> {
		let sender:QuerySender2 = new QuerySender2(getQuery())
		const query:Promise<[any, FieldPacket[]]> = connection.then(sender.sendQuery());
		const myProcess:Promise<string> = query.then(processResult);
		return myProcess;
	}

