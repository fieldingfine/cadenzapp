import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Header (props) {

  const [stats, setStats] = useState([]); 
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true)

  

//get data for header stats//
    useEffect(() => { 
      const getAthlete = () => { 
        axios.get(`https://www.strava.com/api/v3/athletes/3118597?access_token=${props.auth}`)
            .then(function (response) {setData(response.data);})
            .catch(function (error) {console.log(error);}) 
          };
      
      const getAthleteStats = () => { 
        axios.get(`https://www.strava.com/api/v3/athletes/3118597/stats`, {headers: { 'Authorization': `Bearer ${props.auth}`}})
          .then( response => setStats(response.data.all_run_totals))
          .catch( error => console.log('header error',error))
        };
      if(typeof props.auth !== "undefined"){getAthlete();getAthleteStats();} 
      setTimeout(() => setLoading(false), 2000);
    }, [props.auth]);
    


    return (
      <>
      {loading === false ? (
        <header>
          <img src='https://pbs.twimg.com/profile_images/1036876528657813504/WLq-d1X9_400x400.jpg' alt='profile'></img>
          <h1 className='title'>kick {data.username}</h1>
    
          <p>total runs: {stats.count}</p>
          <p>total kilometers: {parseInt(stats.distance / 1000).toLocaleString()} km</p>  
     
       </header>
        ) : (
          <header>
          </header>
        )}
        </>
    );
}

export default Header;

