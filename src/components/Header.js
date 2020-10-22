import React, { useState, useEffect } from "react";
import { getAthlete, getAthleteStats } from "./api";

function Header() {
  const [stats, setStats] = useState([]);
  const [data, setData] = useState([]);

  //get data for header stats//
  useEffect(() => {
    getAthlete().then((response) => {
      if (response !== undefined) {
        setData(response.data);
      }
    });

    getAthleteStats().then((response) => {
      if (response !== undefined) {
        setStats(response.data.all_run_totals);
      }
    });
  }, []);

  return (
    <>
      {Object.keys(stats).length > 0 && Object.keys(data).length > 0 ? (
        <header>
          <img src='/logo.png' alt='profile'></img>
          <h1 className='title'>@{data.username}</h1>
          <p>total runs: {stats.count}</p>
          <p>
            total kilometers: {parseInt(stats.distance / 1000).toLocaleString()}
            km
          </p>
        </header>
      ) : (
        <header>
          <img src='/logo.png' alt='profile'></img>
          <h1 className='title'>cadenz loading...</h1>
          <p className='loading'>strava stats loading...</p>
        </header>
      )}
    </>
  );
}

export default Header;
