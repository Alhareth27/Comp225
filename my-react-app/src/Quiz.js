import React, { useState } from 'react';

const questions = [
  { term: "Ticker Symbol", definition: "It uniquely identifies a publicly traded company on stock exchanges." },
  { term: "Market Cap", definition: "The total value of all a company's shares of stock." },
  { term: "Beta", definition: "A measure of a stock's volatility in relation to the overall market." },
  // Add more questions as needed
];

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);

  const handleNextQuestion = () => {
    setShowDefinition(false);
    setCurrentQuestionIndex((prevIndex) => 
      prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handleShowDefinition = () => {
    setShowDefinition(true);
  };

  return (
    <div className="quiz-container">
      <h1>COMPANY OF THE DAY</h1>
      <div className="question-card">
        {showDefinition ? (
          <p className="definition">{questions[currentQuestionIndex].definition}</p>
        ) : (
          <p className="term" onClick={handleShowDefinition}>
            {questions[currentQuestionIndex].term}
          </p>
        )}
      </div>
      {currentQuestionIndex < questions.length - 1 && (
        <button onClick={handleNextQuestion}>Next Question</button>
      )}
    </div>
  );
};

export default Quiz;
