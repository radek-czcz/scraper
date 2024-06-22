import React, {useEffect, useState} from 'react';
import './App.css';
import OfferComponent from './offers/OfferComponent.jsx'

function App() {

  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3091/newOffers')
      .then(resp => resp.json())
      .then(res => {
        setOffers(res);
        console.log('lenght: ', res.length)
      })
      .catch(error => console.error('this error: ', error));
    return () => {
      setOffers([])
    }
  }, []);


  let offersSorted;
  let unique = [...new Set(offers.map(item => item.descr))];
  offers.forEach((offer) => {
    if (offersSorted[offer.descr]) {offersSorted[offer.descr]}
  }

  return (
    <div className="mainFrame">
      {offers.map(inp => <OfferComponent 
        city={inp.city} mileage={inp.mileage}
        price={inp.price} description={inp.descr}
        year={inp.prodYear}
      ></OfferComponent>)}
    </div>
  )
}

export default App;