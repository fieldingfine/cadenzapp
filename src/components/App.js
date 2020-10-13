
import React, { useState } from 'react';
import '../css/App.css';
import Header from './Header';
import NextSessions from './NextSessions';
import LatestRuns from './LatestRuns';
import Races from './Races';
import axios from 'axios';
import Graph from './Graph';


function App() {
const [auth, setAuth] = useState(); 

//hold refresh token for post
let refresh;

//airtable header for databse calls//
const airtableHeader = {headers: { 'Authorization': `Bearer keyLEVUsiVxM15Nsg`, 'Content-Type': 'application/json'}} ;


// TOKEN MANAGEMENT FOR STRAVA CALLS //
  
//getRefresh: get refresh token when expired//
 const getRefresh = () => { //refresh token when expired
  axios.post(`https://www.strava.com/api/v3/oauth/token?client_id=53708&client_secret=29f1f915569b51a2890df9a07a5d4c6443134819&grant_type=refresh_token&refresh_token=${refresh}`)
    .then(response => postRefresh(response.data))
    .catch(error => console.log(error));
};

//postRefresh: posting new token to database//
const postRefresh = (response) => { 
  var config = {
    method: 'put',
    url: 'https://api.airtable.com/v0/appB944pnqlNcrQda/kicktokens',
    headers: { 
      'authorization': 'Bearer keyLEVUsiVxM15Nsg', 
      'Content-Type': 'application/json', 
      },
      data : JSON.stringify({"records":[{"id":"recPtaP7rRYatGese","fields":{"auth": response.access_token ,"refresh": response.refresh_token ,"exp": (Date.now() + (response.expires_in * 1000))}}]})
    };
  axios(config)
      .then(getTokens())
      .catch( error => console.log(error));
};

//getTokens = getting latest token from data base, check if expired. If so, request and post refresh//
const getTokens = async () => { 
     await axios.get("https://api.airtable.com/v0/appB944pnqlNcrQda/kicktokens/recPtaP7rRYatGese", airtableHeader)
      .then( response => {
          setAuth(response.data.fields.auth);
          refresh = response.data.fields.refresh;
          return response;
      })
      .then(response => (response.data.fields.exp < Date.now()) ? getRefresh():"")
        };
     
getTokens()

  return (
      <div className='container'>
      <Header auth={auth}/>
      <section>
      <NextSessions header={airtableHeader} />
      <LatestRuns auth={auth} />
      <Races header={airtableHeader} />
      </section>
      <section>
      <Graph header={airtableHeader}/>
      </section>
    </div>
  );



}

export default App;

