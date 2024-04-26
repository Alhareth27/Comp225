import React, { useState, useEffect } from 'react';
import Quiz from './components/Quiz/Quiz';
import TimerScreen from './components/TimerScreen/TimerScreen';
import Header from "./containers/Header/Header";
import FinanceShelf from './components/FinanceShelf/FinanceShelf';
import "./App.css";
import RetEarTable from './components/RetEarn/RetEarnTable';
import IncomeStmtTable from './components/IncomeStmt/IncomeStmt';
import StmtOpsTable from './components/StmtOpsTable/StmtOpsTable';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentGraphIndex, setCurrentGraphIndex] = useState(0);
  const [graphCounter, setGraphCounter] = useState();

   // Define an array of graph components for easy indexing
   const graphs = [
    <RetEarTable key={currentGraphIndex} />,
    <IncomeStmtTable key={currentGraphIndex} />,
    <StmtOpsTable key={currentGraphIndex} />
  ];
 

   

  useEffect(() => {
    // const checkMidnight = () => {
    //   const now = new Date();
    //   const hours = now.getHours();
    //   const minutes = now.getMinutes();
    //   const seconds = now.getSeconds();
    //   if (hours === 0 && minutes === 0 && seconds < 5) { // Checks within the first 5 seconds after midnight
    //     setCurrentGraphIndex(prevIndex => (prevIndex + 1) % graphs.length);
    //   }
    // };
    // const intervalId = setInterval(checkMidnight, 1000); // Check every second

    // return () => clearInterval(intervalId); // Cleanup on component unmount
    const now = new Date();
    const date = now.getDate();
    // const hash = hashCode(date);
    const graphIndex = date % graphs.length;
    setGraphCounter(graphIndex);
  }, []);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };
  // const manualChangeGraph = () => {
  //   setCurrentGraphIndex((prevIndex) => (prevIndex + 1) % graphs.length);
  // };
  

  return (
    <div className="App">
      <FinanceShelf />
      <header className="App-header">
        <Header/>
      </header>
      <div className="App-content">
        <div className="App-column">
          <div className="Stockchart-section">
            {graphs[graphCounter]}
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
