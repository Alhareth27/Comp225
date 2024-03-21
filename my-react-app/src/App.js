import React from 'react';
import Quiz from './components/Quiz/Quiz'; 
import Header from "./containers/Header/Header";
import Apple from "./Apple.png";
import "./App.css";
import StockChart from './components/StockChart/StockChart';
import { Tooltip } from '/Users/alharethali/Documents/GitHub/Comp225/my-react-app/src/components/Tooltip/Tooltip.js';

function App() {
  return (
    <div className="App">   
    <button> Alert</button>
    <Tooltip text = {"Press"}>
    <span class="material-symbols-outlined">
info
</span>
    </Tooltip>
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



