import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const activities = {
  booze: {
    title: 'booze (units)',
    color: '#407CB8',
    domain: [5, 20],
  },
  fitness: {
    title: 'fitness (v02)',
    color: '#4440B8',
    domain: [55, 63],
  },
  weight: {
    title: 'weight (kg)',
    color: '#4056A1',
    domain: [59, 63],
  },
  load: {
    title: 'load (km)',
    color: '#3D92AD',
    domain: [25, 70],
  },
};

const Graph = (props) => {
  const [data, setData] = useState([]);
  const [activity, setActivity] = useState('booze');
  const [loading, setLoading] = useState(true);
  const selectedActivity = activities[activity];

  //get data for graph//
  useEffect(() => {
    axios
      .get('https://api.airtable.com/v0/appmvdwUHwS2I0QDd/Table%201?&view=Grid%20view', props.header)
      .then((response) =>
        setData(
          response.data.records.map((item) => ({
            date: item.fields.date,
            weight: item.fields.weight,
            fitness: item.fields.fitness,
            booze: item.fields.booze,
            load: item.fields.load,
          }))
        )
      )
      .catch((error) => console.log('graph error', error));

    setTimeout(() => setLoading(false), 2000);
  }, [props.header]);

  if (loading) {
    return <div className="gbox"></div>;
  }

  return (
    <>
      <div className="gbox">
        <div className="nav">
          <div
            className={activity === 'weight' ? 'graphnav active' : 'graphnav'}
            onClick={() => {
              setActivity('weight');
            }}
          >
            <span className="tabicon" role="img" aria-label="scales">
              ⚖️
            </span>
            <p>weight tracker</p>
          </div>
          <div
            className={activity === 'fitness' ? 'graphnav active' : 'graphnav'}
            onClick={() => {
              setActivity('fitness');
            }}
          >
            <span className="tabicon" role="img" aria-label="heart">
              💜
            </span>
            <p>fitness tracker</p>
          </div>
          <div
            className={activity === 'booze' ? 'graphnav active' : 'graphnav'}
            onClick={() => {
              setActivity('booze');
            }}
          >
            <span className="tabicon" role="img" aria-label="beer">
              🍺
            </span>
            <p>booze tracker</p>
          </div>
          <div
            className={activity === 'load' ? 'graphnav active' : 'graphnav'}
            onClick={() => {
              setActivity('load');
            }}
          >
            <span className="tabicon" role="img" aria-label="up down">
              ↕️
            </span>
            <p>load tracker</p>
          </div>
        </div>

        <ResponsiveContainer width={'100%'} height={300} className="graph">
          <LineChart
            data={data}
            margin={{
              top: 50,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="date" stroke="white" />
            <YAxis type="number" domain={selectedActivity.domain} stroke="white" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              name={selectedActivity.title}
              dataKey={activity}
              stroke={selectedActivity.color}
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      )
    </>
  );
};

export default Graph;
