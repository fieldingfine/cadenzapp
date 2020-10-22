import React from "react";
import "../css/App.css";
import Header from "./Header";
import NextSessions from "./NextSessions";
import LatestRuns from "./LatestRuns";
import Races from "./Races";
import Graph from "./Graph";

function App() {
  return (
    <div className='container'>
      <Header />
      <section>
        <NextSessions />
        <LatestRuns />
        <Races />
      </section>
      <section>{/* <Graph /> */}</section>
    </div>
  );
}

export default App;
