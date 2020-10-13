import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend
} from 'recharts';


const Graph = (props) => {

const [data, setData] = useState([]); 
const [graph, setGraph] = useState('weight (kg)'); 
const [domain, setDomain] = useState([59, 63]);
const [color, setColor] = useState('#4056A1');
const [loading, setLoading] = useState(true)

//get data for graph//
  useEffect(() => { 
      axios.get('https://api.airtable.com/v0/appmvdwUHwS2I0QDd/Table%201?&view=Grid%20view', props.header)
        .then( response => setData(response.data.records.map(item => (
          {
          'date': item.fields.date, 
          'weight (kg)': item.fields.weight,
          'fitness (v02)': item.fields.fitness,
          'booze (units)': item.fields.booze,
          'load (km)': item.fields.load,
          }
          ))))
         .catch( error => console.log('graph error', error))

    setTimeout(() => setLoading(false), 2000)
    
  },[props.header]);

//change graph data on click//
  const handleClick = (title) => { 
      setGraph(title);
      if (  title === 'booze (units)') {setDomain([5,20]); setColor('#407CB8');}
      if (  title === 'fitness (v02)') {setDomain([55,75]); setColor('#4440B8');}
      if (  title === 'weight (kg)') {setDomain([59,63]); setColor('#4056A1');}
      if (  title === 'load (km)') {setDomain([25,70]); setColor('#3D92AD');}
  }
  return (
    <>
    {loading === false ? (
      <div className='gbox'>
        <div className='nav'>
        <div className={ (graph === 'weight (kg)') ? 'graphnav active' : 'graphnav' } onClick={() => {handleClick('weight (kg)');}} ><span className='tabicon' role="img" aria-label="scales">⚖️</span><p>weight tracker</p></div>
        <div className={ (graph === 'fitness (v02)') ? 'graphnav active' : 'graphnav' } onClick={() => {handleClick('fitness (v02)');}} ><span className='tabicon' role="img" aria-label="heart">💜</span><p>fitness tracker</p></div>
        <div className={ (graph === 'booze (units)') ? 'graphnav active' : 'graphnav'} onClick={() => {handleClick('booze (units)');}} ><span className='tabicon' role="img" aria-label="beer">🍺</span><p>booze tracker</p></div>
        <div className={ (graph === 'load (km)') ? 'graphnav active' : 'graphnav' } onClick={() => {handleClick('load (km)');}} ><span className='tabicon' role="img" aria-label="up down">↕️</span><p>load tracker</p></div>
        </div>

      <ResponsiveContainer  width={'100%'} height={300} className='graph'>
        <LineChart
          data={data}
          margin={{
            top: 50, right: 30, left: 20, bottom: 5,
          }}
        >
          <XAxis dataKey="date" stroke="white"/>
          <YAxis type="number" domain={domain} stroke="white" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={graph} stroke={color}  strokeWidth={3}  activeDot={{ r: 8 }}  />
        </LineChart>
      </ResponsiveContainer>
      </div>
      ) : (
        <div className='gbox'>
      </div>
      )}
      </>
);
  }

export default Graph;