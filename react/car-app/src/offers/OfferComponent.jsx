// import {useState} from 'react';
import './OfferComponent.css'

let city = '';
let mileage = 0;

export default function OfferComponent({description, year, mileage, city, price}) {
	return (
		<div className="main">
			<p>{description}</p>
			<p><span className="bold">rok:</span>{year}, <span className="bold">przebieg:</span>{mileage} 000, <span className="bold">cena:</span>{price}</p>
			<p>{city}</p>
		</div>
	)
}