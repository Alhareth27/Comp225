// Quiz.js
import React, { useState, useEffect} from 'react';
import Option from "../Option/Option";
import { Tooltip } from '../Tooltip/Tooltip';
import "./quiz.css";

const questions = [
  {
    "question": "What is a stock?",
    "options": ["Crypto currency of a company", "Electronic check of a company", "A fraction (share) of ownership of a company", "Financial product released by a company"],
    "correctAnswer": "A fraction (share) of ownership of a company",
    "explanation": "Stocks consist of all the shares by which ownership of a company is divided.",
    "hint": "Think of it as owning a small piece of a company."
  },
  {
    "question": "On a stock exchange, what kind of company are you allowed to invest in?",
    "options": ["Private", "Public", "Non-Profit", "Fraudulent"],
    "correctAnswer": "Public",
    "explanation": "A stock exchange is essentially a virtual marketplace where you can sell and buy stocks of various public companies",
    "hint": "These companies have shares that the general public can freely buy and sell."
  },
  {
    "question": "What does the PE ratio measure in a company?",
    "options": ["How much investors are willing to pay for each dollar of earnings", "The company's debt levels compared to its equity.", "The dividend yield the company pays out to its shareholders.", "The total market value of a company's outstanding shares."],
    "correctAnswer": "How much investors are willing to pay for each dollar of earnings",
    "explanation": "The PE ratio measures the company's share price relative to its per-share earnings.",
    "hint": "It's a valuation metric that assesses the market's valuation of a company's earnings."
  },
  {
    "question": "What is the market cap of a company?",
    "options": ["The debt of the company", "The annual profit of the company", "The total value of the company", "Total amount of cash the company owns"],
    "correctAnswer": "The total value of the company",
    "explanation": "The market capitalization of a company is the total market value of its outstanding shares of stock, calculated by multiplying the current share price by the total number of outstanding shares.",
    "hint": "This figure represents the company's overall valuation in the stock market."
  },
  {
    "question": "What is the beta of a company?",
    "options": ["Volatility", "Rate of return", "Debt-to-equity ratio", "Market correlation"],
    "correctAnswer": "Market correlation",
    "explanation": "The beta of a company measures the volatility of its stock price relative to the overall market, indicating how much the stock price is expected to change compared to market movements.",
    "hint": "This number tells you how a stock is expected to perform compared to the market as a whole."
  },
  {
    "question": "What indicates a company's ability to pay short-term obligations?",
    "options": ["Current ratio", "PE ratio", "Earnings per share", "Market cap"],
    "correctAnswer": "Current ratio",
    "explanation": "The current ratio is a liquidity ratio that measures a company's ability to pay short-term obligations or those due within one year.",
    "hint": "This ratio compares a firm's current assets to its current liabilities."
  },
  {
    "question": "Which metric shows the actual profit each share has earned?",
    "options": ["Dividend yield", "Earnings per share", "Book value", "Beta"],
    "correctAnswer": "Earnings per share",
    "explanation": "Earnings per share (EPS) is calculated as a company's profit divided by the outstanding shares of its common stock.",
    "hint": "It’s an indicator of a company’s profitability on a per-share basis."
  },
  {
    "question": "What is a high dividend yield a potential sign of?",
    "options": ["Company growth", "Stock undervaluation", "Financial stability", "Market volatility"],
    "correctAnswer": "Stock undervaluation",
    "explanation": "A high dividend yield may indicate that a stock is undervalued or that the company is distributing a large portion of its earnings as dividends.",
    "hint": "This yield can be appealing but might also signal that the stock price is low for reasons of concern."
  },
  {
    "question": "What does a company's 'book value' represent?",
    "options": ["Total debt", "Asset value minus liabilities", "Annual revenue", "Market capitalization"],
    "correctAnswer": "Asset value minus liabilities",
    "explanation": "Book value represents a company's total assets minus its total liabilities, essentially the net value of the company according to its books.",
    "hint": "It's what remains if the company liquidates its assets to pay off all its liabilities."
  },
  {
    "question": "What measures a stock's dividend payout relative to its price?",
    "options": ["Dividend yield", "PE ratio", "Beta", "Market cap"],
    "correctAnswer": "Dividend yield",
    "explanation": "Dividend yield is a financial ratio that shows how much a company pays out in dividends each year relative to its stock price.",
    "hint": "This percentage shows the return on investment from dividends alone."
  },
  {
    "question": "What does 'return on equity' measure?",
    "options": ["Debt level", "Profit reinvestment", "Shareholder equity efficiency", "Liquidity"],
    "correctAnswer": "Shareholder equity efficiency",
    "explanation": "Return on equity (ROE) measures the ability of a firm to generate profits from its shareholders' investments in the company.",
    "hint": "This ratio indicates how good a company is at generating returns on the investment it received from its shareholders."
  },
  {
    "question": "What assesses a company's financial health by comparing its operating cash flow to its net debt?",
    "options": ["Debt-to-equity ratio", "Cash flow adequacy", "Current ratio", "Earnings before interest and taxes"],
    "correctAnswer": "Cash flow adequacy",
    "explanation": "Cash flow adequacy examines whether a company can generate enough cash to pay off its debt, indicating its ability to sustain financial health.",
    "hint": "It’s about whether the company can cover what it owes with what it makes from its regular business operations."
  },
  {
    "question": "What does 'debt-to-equity ratio' indicate?",
    "options": ["Company's borrowing habit", "Profitability per share", "Stock market performance", "Dividend reliability"],
    "correctAnswer": "Company's borrowing habit",
    "explanation": "The debt-to-equity ratio is a measure of a company's financial leverage calculated by dividing its total liabilities by stockholders' equity.",
    "hint": "This ratio shows the balance between the capital contributed by creditors and the capital contributed by shareholders."
  },
  {
    "question": "Which metric is used to compare a company's stock price to its revenues?",
    "options": ["Price-to-earnings ratio", "Earnings per share", "Price-to-sales ratio", "Market capitalization"],
    "correctAnswer": "Price-to-sales ratio",
    "explanation": "The price-to-sales ratio is a valuation ratio that compares a company’s stock price to its revenues, helping investors find undervalued stocks.",
    "hint": "This ratio can be useful for comparing the value of companies that are not profitable."
  },
  {
    "question": "What does the 'operating margin' reveal about a company?",
    "options": ["Liquidity", "Profitability from core operations", "Total earnings", "Share value"],
    "correctAnswer": "Profitability from core operations",
    "explanation": "The operating margin measures how much profit a company makes on a dollar of sales, after paying for variable costs of production, before interest and taxes.",
    "hint": "This figure shows what percentage of sales has turned into profits."
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
