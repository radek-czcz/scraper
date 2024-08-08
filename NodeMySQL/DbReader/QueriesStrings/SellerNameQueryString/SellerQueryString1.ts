// let queryString:string = 'SELECT sellerName FROM sprzedawcy WHERE sellerWebUrl = '

export default function editQuery(tableName:string = 'sprzedawcy', seller:string='www.mediaexpert.pl'):string {
	return 	`SELECT sellerName FROM ${tableName}
          	WHERE sellerWebUrl ='${seller}' LIMIT 1`
}