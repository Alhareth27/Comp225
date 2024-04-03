// Quiz.js
import React, { useState, useEffect} from 'react';
import Option from "../Option/Option";
import { Tooltip } from '../Tooltip/Tooltip';
import "./quiz.css";

const questions = [
  {
    question: "What is a stock?",
    options: ["Crypto currency of a company", "Electronic check of a company", "A fraction (share) of ownership of a company", "Financial product released by a company"],
    correctAnswer: "A fraction (share) of ownership of a company",
    explanation: "Stocks consist of all the shares by which ownership of a company is divided."
  },
  {
    question: "On a stock exchange, what kind of company are you allowed to invest in?",
    options: ["Private", "Public", "Non-Profit", "Fraudulent"],
    correctAnswer: "Public",
    explanation: "A stock exchange is essentially a virtual marketplace where you can sell and buy stocks of various public companies"
  },
  {
    question: "What does the PE ratio measure in a company?",
    options: ["How much investors are willing to pay for each dollar of earnings", "The company's debt levels compared to its equity.", "The dividend yield the company pays out to its shareholders.", "The total market value of a company's outstanding shares."],
    correctAnswer: "How much investors are willing to pay for each dollar of earnings",
    explanation: "The PE ratio measures the company's share price relative to its per-share earnings."
  },
  {
    question: "What is the market cap of a company?",
    options: ["The debt of the company", "The annual profit of the company", "The total value of the company", "Total amount of cash the company owns"],
    correctAnswer: "The total value of the company",
    explanation: "The market capitalization of a company is the total market value of its outstanding shares of stock, calculated by multiplying the current share price by the total number of outstanding shares."
  },
  {
    question: "What is the beta of a company?",
    options: ["Volatility", "Rate of return", "Debt-to-equity ratio", "Market correlation"],
    correctAnswer: "Market correlation",
    explanation: "The beta of a company measures the volatility of its stock price relative to the overall market, indicating how much the stock price is expected to change compared to market movements."
  }

];

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
      midnight.setHours(24, 0, 0, 0); // Set to midnight of current day
      const timeLeft = midnight - now;
      setRemainingTime(timeLeft);
    };

    const interval = setInterval(calcRemainingTime, 1000);
    calcRemainingTime(); // Calculate immediately on mount

    return () => clearInterval(interval);
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setTimeout(() => { 
      if (questions[currentQuestionIndex].correctAnswer === option) {
        setExplanationShown(true); 
        setTimeout(() => {
          setExplanationShown(false); 
          handleNextQuestion(); 
        }, 3000); 
      } else {
        setSelectedOption(null); 
      }
    }, 1000); 
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
          {!explanationShown ? (
            <div className="question-card">
              <Tooltip text={questions[currentQuestionIndex].explanation}>
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
                    onSelectOption={() => handleOptionSelect(option)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="explanation">
              {questions[currentQuestionIndex].explanation}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;
