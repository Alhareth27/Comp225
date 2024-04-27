import React, { useState, useEffect} from 'react';
import Option from "../Option/Option";
import { Tooltip } from '../Tooltip/Tooltip';
import questions from "./questions.json";
import "./quiz.css";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [explanationShown, setExplanationShown] = useState(false);
  const [lastQuizTime, setLastQuizTime] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const lastTime = localStorage.getItem('lastQuizTime');
    if (lastTime) {
      setLastQuizTime(new Date(lastTime));
    }
  }, []);

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

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setExplanationShown(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setQuizCompleted(true);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null); 
      setExplanationShown(false); 
    }
  };

  const isOptionCorrect = (option) => {
    return option === questions[currentQuestionIndex].correctAnswer;
  };

  const formatTimeLeft = (timeLeft) => {
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return `${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
  };

  return (
    <div className="quiz-container">
    {quizCompleted ? (
      <p>Quiz completed! Next quiz available in {formatTimeLeft(remainingTime)}.</p>
    ) : (
      <>
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
            <div className="explanation">
              {questions[currentQuestionIndex].explanation}
            </div>
            <button className="next-button" onClick={handleNextQuestion}>Next</button>
          </>
        )}
      </>
    )}
  </div>
  );
};

export default Quiz;
