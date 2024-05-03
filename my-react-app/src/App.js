import React, { useState, useEffect } from 'react';
import Quiz from './components/Quiz/Quiz'; 
import TimerScreen from './components/TimerScreen/TimerScreen'; 
import Header from "./containers/Header/Header"; 
import FinanceShelf from './components/FinanceShelf/FinanceShelf'; 
import "./App.css"; 
import RetEarTable from './components/RetEarn/RetEarnTable'; 
import StmtOpsTable from './components/StmtOpsTable/StmtOpsTable'; 
import StockChart from './components/StockChart/StockChart'; 
import Days from "./Days.json"; 
import AppleData from './components/StockChart/AAPL201020.csv';

// Defining App functional component
function App() {
  const [quizStarted, setQuizStarted] = useState(false); // State for quiz started status
  const [currentQuiz, setcurrentQuiz] = useState(Days[0]); // State for current quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // State for current question index
  const [remainingTime, setRemainingTime] = useState(0); // State for remaining time in the day
  const [lastDayCompleted, setLastDayCompleted] = useState(null); // State for last completed day
  const [score, setScore] = useState(0); // State for quiz score

  // Function to advance to the next question in the quiz
  const advanceToNextQuestion = () => {
    if (currentQuestionIndex === currentQuiz.questions.length - 1) {
      setLastDayCompleted(currentQuiz.day);
      setCurrentQuestionIndex(0);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Effect hook to set current quiz based on today's date
  useEffect(() => {
    const today = new Date();
    const todayDayOfWeek = today.getDay();
    const lengthofDays = Days.length;
    let indexofDay = todayDayOfWeek % lengthofDays;
    const todayDay = Days[indexofDay];
    setcurrentQuiz(todayDay);
  });

  // Effect hook to calculate remaining time in the day
  useEffect(() => {
    const calcRemainingTime = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const timeLeft = midnight - now;
      setRemainingTime(timeLeft);
    };

    const interval = setInterval(calcRemainingTime, 1000);
    calcRemainingTime();

    return () => clearInterval(interval);
  }, []);

  // Function to format remaining time into hours, minutes, and seconds
  const formatTimeLeft = (timeLeft) => {
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return `${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
  };

  
  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  // Rendering JSX for App component
  return (
    <div className="App">
      <FinanceShelf /> 
      <header className="App-header">
        <Header /> 
      </header>
      <div className="App-content">
        <div className="App-column">
          <div className="Stockchart-section">
            {renderGraph(currentQuiz.graph)} {/* Rendering graph based on current quiz */}
          </div>
        </div>
        <div className="App-column">
          {lastDayCompleted === currentQuiz.day ? ( // Conditional rendering based on last completed day
            <p>
              Quiz completed! You scored <b>{score} points</b>. Next quiz available in {formatTimeLeft(remainingTime)}.
            </p>
          ) : quizStarted ? (
            <Quiz // Rendering Quiz component
              currentQuestionIndex={currentQuestionIndex}
              advanceToNextQuestion={advanceToNextQuestion}
              questions={currentQuiz.questions}
              score={score}
              setScore={setScore}
            />
          ) : (
            <TimerScreen onStartQuiz={handleStartQuiz} /> // Rendering TimerScreen component
          )}
        </div>
      </div>
    </div>
  );
}

// Function to render graph based on its type
function renderGraph(graph) {
  if (graph.type == "RetEarnTable") {
    return <RetEarTable graphData={graph.data} />;
  } else if (graph.type == "StmtOpsTable") {
    return <StmtOpsTable graphData={graph.data} />;
  } else if (graph.type == "IncomeStmtTable") {
    return <StmtOpsTable graphData={graph.data} />;
  } else if (graph.type == "StockChart") {
    return <StockChart graphData={AppleData} />;
  } else {
    return <p>ERROR: Unknown graph type: {graph.type}</p>;
  }
}

export default App; 
