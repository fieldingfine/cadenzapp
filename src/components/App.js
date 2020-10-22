import React, { useState, useEffect } from "react";
import "../css/App.css";
import Header from "./Header";
import NextSessions from "./NextSessions";
import LatestRuns from "./LatestRuns";
import Races from "./Races";
import Graph from "./Graph";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    <>
      {loading ? (
        <div className='container-loading'>
          <header className='load'>
            <img src='/cadenz.gif' alt='loading'></img>
          </header>
        </div>
      ) : (
        <div className='container'>
          <Header />
          <section>
            <NextSessions />
            <LatestRuns />
            <Races />
          </section>
          <section>
            <Graph />
          </section>
        </div>
      )}
    </>
  );
}

export default App;
