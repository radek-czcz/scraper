import connection, {closeConnection} from '../Connection/connection2'
import {RowDataPacket, Connection, Query, FieldPacket, ResultSetHeader} from 'mysql2/promise'

let seller = 'www.mediaexpert.pl'

// SELLER NAME PARSING FROM DB
export default function readSellerName():Promise<void> {

  	return connection.then((connection2:Connection) => {
	    return connection2.query(
	      `SELECT sellerName FROM sprzedawcy
          WHERE sellerWebUrl = ` + `'` + seller + `'`  + ' LIMIT 1'
	    )
	  })
  	.then(res => {console.log(res); closeConnection()})
  	
}


readSellerName()

