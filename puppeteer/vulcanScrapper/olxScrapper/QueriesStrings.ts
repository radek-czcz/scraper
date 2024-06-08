export interface IstringToQuery {
	query1:string,
	query2:string,
	query2Ask:string,
	updateDateQuery:string
}

export const queries:IstringToQuery = {
	query1:
		`INSERT INTO offers (idNum, prodYear, mileage, price, city, descr, offerDate, brand, model, fetchDate)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
	query2:
		`INSERT INTO prices (prodYear, mileage, city, fetchDate, price)
			VALUES (?, ?, ?, ?, ?)`,
	query2Ask:
	    `SELECT * FROM prices 
	      WHERE
	        prodYear = ? AND
	        mileage = ? AND
	        city = ?
	        ORDER BY fetchDate DESC
	        LIMIT 1`,
	updateDateQuery:
	    `UPDATE prices
	      SET lastSeen = CURDATE()
	        WHERE 
	          prodYear = ? AND
	          mileage = ? AND
	          city = ? AND
	          price = ?`
}