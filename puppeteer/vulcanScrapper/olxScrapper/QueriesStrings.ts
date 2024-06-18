// QUERIES' STRINGS
export let queries = {
  query1: 
    `INSERT INTO offers (idNum, prodYear, mileage, price, city, descr, offerDate, brand, model, fetchDate)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

  query2:
    `INSERT INTO prices (prodYear, mileage, city, fetchDate, price)
    VALUES (?, ?, ?, ?, ?)`,

  // let query2Ask =
  //   `SELECT * FROM offers WHERE
  //   prodYear = ${prodYear} AND
  //   mileage = ${mileage} AND
  //   fetchDate = ${fetchDate}`

  // let query2Ask:string =
  //   `SELECT * FROM offers WHERE
  //   prodYear = ? AND
  //   mileage = ? AND
  //   city = ?`

query2Ask:
    `SELECT * FROM prices WHERE
    prodYear = ? AND
    mileage = ? AND
    city = ?
    ORDER BY fetchDate DESC
    LIMIT 1`,

  // let query2Ask:string =
  //   `SELECT * FROM offers WHERE
  //   prodYear = ? AND
  //   mileage = ? AND
  //   fetchDate = ?`

 updateDateQuery: `UPDATE prices
    SET lastSeen = CURDATE()
    WHERE 
      prodYear = ? AND
      mileage = ? AND
      city = ? AND
      price = ?
`
}