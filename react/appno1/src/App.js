import React, { useState, useEffect } from 'react';
import './App.css'

export default function App() {

  const [elem1, setElem1] = useState('');

  useEffect(() => {
    fetch('http://localhost:8016/sprawdziany')
    // .then(resp => {setElem1(resp[1].htmlElement)})
    .then(resp => resp.json())
    .then(res => {setElem1(res[res.length-1].htmlElement); console.log('lenght: ', res.length)})
    .catch(error => console.error('this error: ', error));
    return () => {
      setElem1('');
    }
  }, []);

  return (
    <div className='myMain' dangerouslySetInnerHTML={{__html: elem1}}>
    </div>
    )
}