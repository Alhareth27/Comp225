// App.js
import React, { useState } from 'react';
import Quiz from './components/Quiz/Quiz';
import TimerScreen from './components/TimerScreen/TimerScreen';
import Header from "./containers/Header/Header";
import "./App.css";
import StockChart from './components/StockChart/StockChart';
import IncomeStmtTable from './components/IncomeStmt/IncomeStmt';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div className="App">   
      <header className="App-header">
        <Header/>
      </header>
      <div className="App-content">
        <div className="App-column">
          <div className="Stockchart-section">
            < IncomeStmtTable/>
          </div>
        </div>
        <div className="App-column">
          {quizStarted ? (
            <Quiz />
          ) : (
            <TimerScreen onStartQuiz={handleStartQuiz} />
          )}
        </div>
      </div> 
    </div>
  );
}

export default App;
