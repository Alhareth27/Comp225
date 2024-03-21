import React from 'react';
import Quiz from './components/Quiz/Quiz'; 
import Header from "./containers/Header/Header";
import "./App.css";
import StockChart from './components/StockChart/StockChart';

function App() {
  return (
    <div className="App">   
      <header className="App-header">
        <Header/>
      </header>
      <div className="App-content">
        <div className="App-column">
          <div className="Stockchart-section">
        <StockChart />
      </div>
        </div>
        <div className="App-column">
          <Quiz/>
        </div>
      </div> 
    </div>
  );
}

export default App;



