import React, { useState, useEffect } from "react";
import { getTraining } from "./api";

const LatestRuns = () => {
  const [activity, setActivity] = useState([]);

  //get data for strava runs//
  useEffect(() => {
    console.log("latestruns");

    getTraining().then((response) => {
      if (response !== undefined) {
        setActivity(response);
      }
    });
  }, []);

  //handle clicks on strava links//
  const stravaLink = (id) => {
    window.open(
      `https://www.strava.com/activities/${id}`,
      "_blank",
      "toolbar=no,scrollbars=yes,resizable=yes,top=10,left=50,width=800,height=400"
    );
  };

  let tabContent = activity.map((runs) => {
    return (
      <details className='tab calendar' key={runs.id}>
        <summary className='tab-label' htmlFor={runs.id}>
          {runs.name}
        </summary>
        <div className='tab-content'>
          <p>{runs.description}</p>
          <p>
            <strong>Date:</strong> {runs.start_date.substring(0, 10)}
          </p>
          <p>
            <strong>KM:</strong> {(runs.distance / 1000).toFixed(2)}
          </p>
          <p>
            <strong>KPH:</strong> {(runs.average_speed * 3.6).toFixed(2)} kph
          </p>
          <p>
            <strong>AVG HR:</strong> {runs.average_heartrate.toFixed(0)} bpm
          </p>
          <p>
            <strong>Shoes:</strong>{" "}
            {runs.gear !== undefined ? runs.gear.name : "n/a"}
          </p>
          <p
            className='stravabtn'
            onClick={() => {
              stravaLink(runs.id);
            }}>
            view on strava
          </p>
        </div>
      </details>
    );
  });

  return (
    <>
      {Object.keys(activity).length > 0 ? (
        <div className='cbox'>
          <div className='tabtitle'>
            <span className='tabicon' role='img' aria-label='tick'>
              👍
            </span>
            <p className='tabtitle'>previous sessions</p>
            <p className='tabsubtitle'>(last 10 sessions)</p>
          </div>
          <div className='tabs'>{tabContent}</div>
        </div>
      ) : (
        <div className='cbox'>
          <div className='tabtitle'>
            <span className='tabicon' role='img' aria-label='tick'>
              👍
            </span>
            <p className='tabtitle'>previous sessions</p>
            <p className='tabsubtitle'>(last 10 sessions)</p>
          </div>
          <div className='tabs-loading'>
            <p>strava latest runs loading...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default LatestRuns;
