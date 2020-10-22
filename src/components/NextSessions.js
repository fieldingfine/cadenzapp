import React, { useState, useEffect } from "react";
import { fetchTraining } from "./api";

const NextSessions = () => {
  const [plan, setPlan] = useState([]);

  //get data for sessions//
  useEffect(() => {
    fetchTraining().then((response) => {
      setPlan(response);
    });
  }, []);

  let today = Date.now();
  let week = today + 864000000;
  //only map the next 10 sessions by date //
  let tabLinks = plan.map((planIt) => {
    let date = Date.parse(planIt.fields.date);
    if ((date > today) & (date < week)) {
      return (
        <details className='tab calendar' key={planIt.id}>
          <summary className='tab-label' htmlFor={planIt.id}>
            {planIt.fields.newdate}: {planIt.fields.session}
          </summary>
          <div className='tab-content'>
            <p>
              <strong>{planIt.fields.session}: </strong>
              {planIt.fields.detail}
            </p>
          </div>
        </details>
      );
    }
    return null;
  });

  return (
    <>
      {Object.keys(plan).length > 0 ? (
        <div className='cbox'>
          <div className='tabtitle'>
            <span className='tabicon' role='img' aria-label='tick'>
              📅
            </span>
            <p>next sessions</p>
            <p>(next 10 days)</p>
          </div>
          <div className='tabs'>{tabLinks}</div>
        </div>
      ) : (
        <div className='cbox'>
          <div className='tabtitle'>
            <span className='tabicon' role='img' aria-label='tick'>
              📅
            </span>
            <p>next sessions</p>
            <p>(next 10 days)</p>
          </div>
          <div className='tabs-loading'>
            <p>next sessions loading...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default NextSessions;
