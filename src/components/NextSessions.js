import React, { useState, useEffect } from 'react';
import axios from 'axios'



const NextSessions = (props) => {
const [plan, setPlan] = useState([]); 
const [loading, setLoading] = useState(true)


//get data for sessions//
useEffect(() => {
  axios.get('https://api.airtable.com/v0/appCxNHOlPKoOiFeE/training/?sort%5B0%5D%5Bfield%5D=date', props.header)
  .then( response => setPlan(response.data.records))
  .catch( error => console.log(error))

  setTimeout(() => setLoading(false), 2000);

}, [props.header]);

//only map the next 10 sessions by date //
  let tabLinks = plan.map((planIt) => {
    let today = Date.now();
    let week = today + 864000000;
    let date = Date.parse(planIt.fields.date);
     if ((date > today) & (date < week)) {
        return (
          <div className="tab calendar" key={planIt.id}>
            <input type="checkbox" id={planIt.id}></input>
            <label className="tab-label" htmlFor={planIt.id}>{planIt.fields.newdate}: {planIt.fields.session}</label>
            <div className="tab-content">
            <div className='inner'>
            <p><strong>{planIt.fields.session}: </strong>{planIt.fields.detail}</p>
            </div>
            </div>
          </div>
          );
        } 
        return null
        
      }); 

      return (
        <>
        {loading === false ? (
          <div className='cbox'>
            <div className='tabtitle'><span className='tabicon' role="img" aria-label="tick">📅</span><p>next sessions</p><p>(next 10 days)</p></div>
            <div className="tabs">
            {tabLinks}
          </div>
        </div>
          ) : (
          <div className='cbox'>
          </div>
          )}
          </>
      );
}

export default NextSessions;

