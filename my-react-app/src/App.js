import React, { useState, useEffect } from 'react';
import Quiz from './components/Quiz/Quiz';
import TimerScreen from './components/TimerScreen/TimerScreen';
import Header from "./containers/Header/Header";
import FinanceShelf from './components/FinanceShelf/FinanceShelf';
import "./App.css";
import RetEarTable from './components/RetEarn/RetEarnTable';
import StmtOpsTable from './components/StmtOpsTable/StmtOpsTable';
import StockChart from './components/StockChart/StockChart';
import Days from "./Days.json"
import AppleData from './components/StockChart/AAPL201020.csv';



function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuiz, setcurrentQuiz] = useState(Days[0]);  // TODO: replace this with dynamic calculation from today's date
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [lastDayCompleted, setLastDayCompleted] = useState(null);
  const [score, setScore] = useState(0); // Added score state here


  const advanceToNextQuestion = () => {
    if (currentQuestionIndex === currentQuiz.questions.length - 1) {
      setLastDayCompleted(currentQuiz.day);
      setCurrentQuestionIndex(0);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

   // Define an array of graph components for easy indexing
  //  const graphs = [
  //   <RetEarTable graphData={Days[0].graph.data} />,
  //   <IncomeStmtTable key={currentGraphIndex} />,
  //   <StmtOpsTable key={currentGraphIndex} />,
  //   <StockChart key={currentGraphIndex}/>
  // ];
 
  useEffect(() => {
    // Get today's date
    const today = new Date();
    const todayDayOfWeek = today.getDay(); // 4 (for example)
    const lengthofDays = Days.length; // 4 (for example)
    let indexofDay = todayDayOfWeek % lengthofDays;
    const todayDay = Days[indexofDay];
    setcurrentQuiz(todayDay);
  });

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

 

  const formatTimeLeft = (timeLeft) => {
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return `${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
  };
   
  

  // useEffect(() => {
  //   // const checkMidnight = () => {
  //   //   const now = new Date();
  //   //   const hours = now.getHours();
  //   //   const minutes = now.getMinutes();
  //   //   const seconds = now.getSeconds();
  //   //   if (hours === 0 && minutes === 0 && seconds < 5) { // Checks within the first 5 seconds after midnight
  //   //     setCurrentGraphIndex(prevIndex => (prevIndex + 1) % graphs.length);
  //   //   }
  //   // };
  //   // const intervalId = setInterval(checkMidnight, 1000); // Check every second

  //   // return () => clearInterval(intervalId); // Cleanup on component unmount
  //   const now = new Date();
  //   const date = now.getDate();
  // }, []);

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
            {renderGraph(currentQuiz.graph)}
          </div>
        </div>
          
        <div className="App-column">
          {
            (lastDayCompleted === currentQuiz.day) ? (
              <p>Quiz completed! You scored <b>{score} points</b>. Next quiz available in {formatTimeLeft(remainingTime)}.</p>
            ) : quizStarted ? (
              <>
                <Quiz 
                  currentQuestionIndex={currentQuestionIndex} 
                  advanceToNextQuestion={advanceToNextQuestion} 
                  questions = {currentQuiz.questions}
                  score={score}
                  setScore={setScore}
                />
              </>
            ) : (
            <TimerScreen onStartQuiz={handleStartQuiz} />
            )
          }
        </div>
      </div> 
    </div>
  );
}

function renderGraph(graph) {
  if (graph.type == "RetEarnTable"){
    return <RetEarTable graphData={graph.data} />;
  } else if (graph.type == "StmtOpsTable") {
    return <StmtOpsTable graphData={graph.data} />;
  } else if (graph.type == "IncomeStmtTable") {
    return <StmtOpsTable graphData={graph.data} />;
  }  else if (graph.type == "StockChart") {
    return <StockChart graphData={AppleData} />;
  }  
 else {
    return (<p>ERROR: Unknown graph type: {graph.type}</p>);
  }
}

export default App;

