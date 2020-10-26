import React, { useState, useEffect } from "react";
import { getAthlete, getAthleteStats } from "./api";

function Header() {
  const [stats, setStats] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  //get data for header stats//
  useEffect(() => {
    getAthlete().then((response) => {
      if (response.status === 200) {
        setData(response.data);
      } else {
        setError(true);
      }
    });

    getAthleteStats().then((response) => {
      if (response.status === 200) {
        setStats(response.data.all_run_totals);
      } else {
        setError(true);
      }
    });
  }, []);

  return (
    <>
      {error ? (
        <header>
          <img src='/logo.png' alt='profile'></img>
          <h1 className='title'>cadenz app</h1>
          <p>strava load error</p>
          <p></p>
        </header>
      ) : (
        <header>
          <img src='/logo.png' alt='profile'></img>
          <h1 className='title'>@{data.username}</h1>
          <p>total runs: {stats.count}</p>
          <p>
            total kilometers: {parseInt(stats.distance / 1000).toLocaleString()}
            km
          </p>
        </header>
      )}
    </>
  );
}

export default Header;
