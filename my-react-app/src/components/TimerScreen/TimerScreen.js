import React from 'react'; 
import PropTypes from 'prop-types'; 
import './TimerScreen.css';

const TimerScreen = ({ onStartQuiz }) => { 
  return (
    <div className="timer-screen"> 
      <p>You can only do the quiz once a day! Click below to start!</p> 
      <button onClick={onStartQuiz}>Start Quiz</button> {/* Button to start quiz */}
    </div>
  );
};

// PropTypes validation for onStartQuiz prop
TimerScreen.propTypes = {
  onStartQuiz: PropTypes.func.isRequired, 
};

export default TimerScreen; 
