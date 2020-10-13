import React, { useState, useEffect } from 'react';
import axios from 'axios';


const LatestRuns = (props) => {

const [activity, setActivity] = useState([]); 
const [loading, setLoading] = useState(true)


//get data for strava runs//
  useEffect(() => { 
    const getTraining = () => {
      //get data ids of last runs//
      axios.get("https://www.strava.com/api/v3/athlete/activities?per_page=10", {headers: { Authorization: 'Bearer ' + props.auth}})
        .then(response => {return response.data;})
        .catch(error => console.log(error))
         //use ids to get detail of each run//
        .then(async data => {
            await Promise.all(data.map((e, index, array) => {
                return axios.get('https://www.strava.com/api/v3/activities/' + e.id + '?include_all_efforts=false', {headers: { Authorization: 'Bearer ' + props.auth}})
                    .then(response => {array[index] = { ...response.data};})
                    .catch(error => console.log(error))
                    }));
            setActivity(data);
   
        })
        .catch(error => console.log(error))
    }
    if(typeof props.auth !== "undefined"){getTraining();} 
    setTimeout(() => setLoading(false), 2000);

  }, [props.auth]);

  //handle clicks on strava links//
  const stravaLink = (id) => { 
    window.open(`https://www.strava.com/activities/${id}`,"_blank", "toolbar=no,scrollbars=yes,resizable=yes,top=10,left=50,width=800,height=400");
  };

    let tabContent = activity.map((runs) => {
      return (
        <div className="tab runs" key={runs.id}>
        <input type="checkbox" id={runs.id}></input>
        <label className="tab-label" htmlFor={runs.id}>{runs.name}</label>
        <div className="tab-content">
        <div className='inner'>
          <p>{runs.description}</p>
            <p><strong>Date:</strong> {runs.start_date.substring(0, 10)}</p> 
          <p><strong>KM:</strong>  {(runs.distance / 1000).toFixed(2)}</p>
          <p><strong>KPH:</strong> {(runs.average_speed * 3.6).toFixed(2)} kph </p>
          <p><strong >AVG HR:</strong>  {(runs.average_heartrate).toFixed(0)} bpm </p>
          <p><strong>Shoes:</strong> {runs.gear.name} </p>
          <p className="stravabtn" onClick={() => {stravaLink(runs.id);}} >view on strava</p>
          </div>
        </div>
      </div>
        );
      }, 
      ); 

  return (
    <>
    {loading === false ? (
      <div className='cbox'>
        <div className='tabtitle'><span className='tabicon' role="img" aria-label="tick">👍</span><p className='tabtitle'>previous sessions</p><p className='tabsubtitle'>(last 10 sessions)</p></div>
        <div className="tabs">
        {tabContent}
        </div>
  </div>
      ) : (
        <div className='cbox'>
        </div>
      )}
      </>
  );



  
}





export default LatestRuns;

