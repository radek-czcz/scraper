let queryString:string = "SHOW COLUMNS FROM "

export default function editQuery(tableName:string = 'mojeprodukty'):string {return queryString+=tableName}