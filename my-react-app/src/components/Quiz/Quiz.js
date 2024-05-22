import React, { useState, useEffect } from 'react';
import Option from "../Option/Option";
import { Tooltip } from '../Tooltip/Tooltip';
import "./quiz.css";

const Quiz = ({currentQuestionIndex, advanceToNextQuestion, questions}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [explanationShown, setExplanationShown] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setExplanationShown(true);
    if( isOptionCorrect (option) ){
      setScore((prevScore) => prevScore + 20); 
    }
  };

  const isOptionCorrect = (option) => {
    return option === questions[currentQuestionIndex].correctAnswer;
  };


  const handleNextQuestion = () => {
    setSelectedOption(null); 
    setExplanationShown(false); 
    advanceToNextQuestion();
  };

  return (
    <div className="quiz-container">
      <div className="question-card">
        <Tooltip text={questions[currentQuestionIndex].hint}>
          <p className="question">
            {questions[currentQuestionIndex].question}
          </p>
        </Tooltip>
        <div>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <Option
              key={index}
              option={option}
              isSelected={selectedOption === option}
              isCorrect={isOptionCorrect(option)}
              onSelectOption={() => !explanationShown && handleOptionSelect(option)}
            />
          ))}
        </div>
      </div>
      {explanationShown && (
        <>
          <div className="explanation">{questions[currentQuestionIndex].explanation}</div>
          <button className="next-button" onClick={handleNextQuestion}>Next</button>
        </>
      )}
      <div className="progress-display">
        Questions Answered: {currentQuestionIndex + 1} / {questions.length}
      </div>
    </div>
  );
};

export default Quiz;
