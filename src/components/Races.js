import React, { useState, useEffect } from 'react';
import axios from 'axios';



const Races = (props) => {

const [races, setRaces] = useState([]); 
const [loading, setLoading] = useState(true)

//get data for races//
useEffect(() => {
  axios.get('https://api.airtable.com/v0/app51Ub4aBrwWISd5/races/?view=Grid%20view', props.header)
  .then( response => setRaces(response.data.records))
  .catch( error => console.log(error))
setTimeout(() => setLoading(false), 2000);
}, [props.header]);


//map data for races//
  let raceTable = races.map((planIt) => {
        return (
          <div className="tab races" key={planIt.id}>
          <input type="checkbox" id={planIt.id}></input>
          <label className="tab-label" htmlFor={planIt.id}>{planIt.fields.Race}</label>
          <div className="tab-content">
          <div className='inner'>
            <p><strong>Venue:</strong> {planIt.fields.Venue}</p> 
            <p><strong>Date:</strong> {planIt.fields.NewDate}</p> 
            <p><strong>Event:</strong> {planIt.fields.Event}</p>
            <p><strong>Position:</strong> {planIt.fields.Position} </p>
            <p><strong>Time:</strong> {planIt.fields.Time}</p>
            </div>
          </div>
        </div>
      ); 
    }); 
  
  
    return (
      <>
      {loading === false ? (
        <div className='cbox'>
        <div className='tabtitle'><span className='tabicon' role="img" aria-label="race flag">🏁</span><p className='tabtitle'>race results</p><p className='tabsubtitle'>(last 10 races)</p></div>
        <div className="tabs races">
        {raceTable}
        </div>
      </div>
        ) : (
          <div className='cbox'>
          </div>
        )}
        </>
    );
  }

export default Races;

