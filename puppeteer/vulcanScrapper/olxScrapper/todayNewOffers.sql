
        SELECT tab2.descr, prices.prodYear, prices.mileage, prices.city, prices.fetchDate, prices.lastSeen, prices.price FROM (
					
                    # USING tab1 - CHOOSE INITED GROUPS(tab1, prices) WITH MORE THAN 1 ELEMENT
					SELECT tab1.descr, tab1.prodYear, tab1.mileage, tab1.city, ma1, COUNT(*) as cou FROM (
							
							# (tab1) CHOOSE UNITED(OFFERS, PRICES) GROUPS WITH MAX FETCHDATE EQUAL TO CURDATE()
							SELECT offers.descr, offers.prodYear, offers.mileage, offers.city,  max(prices.fetchDate) as ma1 from offers, prices
							WHERE 	offers.prodYear = prices.prodYear AND
									offers.mileage = prices.mileage AND
									offers.city = prices.city
								GROUP BY offers.prodYear, offers.mileage, offers.city
								HAVING ma1 = CURDATE()# - INTERVAL 1 DAY
                            
					) as tab1, prices
					WHERE
						tab1.prodYear = prices.prodYear AND
						tab1.mileage = prices.mileage AND
						tab1.city = prices.city
					GROUP BY prices.prodYear, prices.mileage, prices.city
					HAVING cou >= 1
                    
                    
		) as tab2, prices
        WHERE (
					tab2.prodYear = prices.prodYear AND
					tab2.mileage = prices.mileage AND
					tab2.city = prices.city
        )
        ORDER BY prices.prodYear, prices.mileage, prices.city, prices.fetchDate, prices.lastSeen
