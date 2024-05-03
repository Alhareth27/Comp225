import React, { useState } from 'react';
import Option from "../Option/Option";
import { Tooltip } from '../Tooltip/Tooltip';
import "./quiz.css"; // Load custom CSS for the quiz component

const Quiz = ({currentQuestionIndex, advanceToNextQuestion, questions, score, setScore}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [explanationShown, setExplanationShown] = useState(false);

  const handleOptionSelect = (option) => {
    // Set selected option and show explanation
    setSelectedOption(option);
    setExplanationShown(true);
    if (isOptionCorrect(option)) {
      setScore(score + 20); // Increase score if the option is correct
    }
  };

  const isOptionCorrect = (option) => {
    // Check if the selected option is the correct answer
    return option === questions[currentQuestionIndex].correctAnswer;
  };

  const handleNextQuestion = () => {
    // Reset state for next question
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
              onSelectOption={() => !explanationShown && handleOptionSelect(option)} // Handle option selection
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
        Question: {currentQuestionIndex + 1} / {questions.length}
      </div>
    </div>
  );
};

export default Quiz; // Export the Quiz component
