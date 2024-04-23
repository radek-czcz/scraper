import React, { useState, useEffect } from 'react';
import './App.css'

export default function App() {

  const [exams, setExams] = useState('');
  const [bPlan, setbPlan] = useState('');
  const [hPlan, sethPlan] = useState('');

  useEffect(() => {
    fetch('http://localhost:8016/sprawdziany')
      // .then(resp => {setElem1(resp[1].htmlElement)})
      .then(resp => resp.json())
      .then(res => {setExams(res[res.length-1].htmlElement); console.log('lenght: ', res.length)})
      .catch(error => console.error('this error: ', error));
    fetch('http://localhost:8016/bPlan')
      // .then(resp => {setElem1(resp[1].htmlElement)})
      .then(resp => resp.json())
      .then(res => {setbPlan(res[res.length-1].htmlElement); console.log('lenght: ', res.length)})
      .catch(error => console.error('this error: ', error));
    fetch('http://localhost:8016/hPlan')
      // .then(resp => {setElem1(resp[1].htmlElement)})
      .then(resp => resp.json())
      .then(res => {sethPlan(res[res.length-1].htmlElement); console.log('lenght: ', res.length)})
      .catch(error => console.error('this error: ', error));
    return () => {
      setExams('');
      setbPlan('');
      sethPlan('');
    }
  }, []);

  return (
    <div className="mainComponent">
      <div className='myMain' dangerouslySetInnerHTML={{__html: exams}}>
      </div>
      <div className='myMain' dangerouslySetInnerHTML={{__html: bPlan}}>
      </div>
      <div className='myMain' dangerouslySetInnerHTML={{__html: hPlan}}>
      </div>
    </div>
    )
}