import React from 'react';
import PropTypes from 'prop-types';
import './TimerScreen.css';


const TimerScreen = ({ onStartQuiz }) => { 
  return (
    <div className="timer-screen">
      <p>You can only do the quiz once a day! Click below to start!</p>
      <button onClick={onStartQuiz}>Start Quiz</button>
    </div>
  );
};

TimerScreen.propTypes = {
  onStartQuiz: PropTypes.func.isRequired,
};

export default TimerScreen;
