import React, { useState } from 'react';
import Option from "../Option/Option";
import { Tooltip } from '/Users/alharethali/Documents/GitHub/Comp225/my-react-app/src/components/Tooltip/Tooltip.js';
import "./quiz.css";

const questions = [
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

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setTimeout(() => { 
      if (questions[currentQuestionIndex].correctAnswer === option) {
        setExplanationShown(true); 
        setTimeout(() => {
          setExplanationShown(false); 
          handleNextQuestion(); 
        }, 6000); 
      } else {
        setSelectedOption(null); 
      }
    }, 1000); 
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex < questions.length - 1 ? prevIndex + 1 : 0
    );
    setSelectedOption(null); 
    setExplanationShown(false); 
  };

  const isOptionCorrect = (option) => {
    return option === questions[currentQuestionIndex].correctAnswer;
  };

  return (
    <div className="quiz-container">
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
    </div>
  );
};

export default Quiz;

