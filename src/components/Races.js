import React, { useState, useEffect } from "react";
import { fetchRaces } from "./api";

const Races = () => {
  const [races, setRaces] = useState([]);
  const [error, setError] = useState(false);

  //get data for races//
  useEffect(() => {
    fetchRaces().then((response) => {
      if (response.status === 200) {
        setRaces(response.data.records);
      } else {
        setError(true);
      }
    });
  }, []);

  //map data for races//
  let raceTable = races.map((planIt) => {
    return (
      <details className='tab races' key={planIt.id}>
        <summary className='tab-label' htmlFor={planIt.id}>
          {" "}
          {planIt.fields.Race}
        </summary>
        <div className='tab-content'>
          <div className=''>
            <p>
              <strong>Venue:</strong> {planIt.fields.Venue}
            </p>
            <p>
              <strong>Date:</strong> {planIt.fields.NewDate}
            </p>
            <p>
              <strong>Event:</strong> {planIt.fields.Event}
            </p>
            <p>
              <strong>Position:</strong> {planIt.fields.Position}{" "}
            </p>
            <p>
              <strong>Time:</strong> {planIt.fields.Time}
            </p>
          </div>
        </div>
      </details>
    );
  });

  return (
    <>
      {error ? (
        <div className='cbox'>
          <div className='tabtitle'>
            <span className='tabicon' role='img' aria-label='race flag'>
              🏁
            </span>
            <p className='tabtitle'>race results</p>
            <p className='tabsubtitle'>(last 10 races)</p>
          </div>
          <div className='tabs races'>races load error</div>
        </div>
      ) : (
        <div className='cbox'>
          <div className='tabtitle'>
            <span className='tabicon' role='img' aria-label='race flag'>
              🏁
            </span>
            <p className='tabtitle'>race results</p>
            <p className='tabsubtitle'>(last 10 races)</p>
          </div>
          <div className='tabs races'>{raceTable}</div>
        </div>
      )}
    </>
  );
};

export default Races;
