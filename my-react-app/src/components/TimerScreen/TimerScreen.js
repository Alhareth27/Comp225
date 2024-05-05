import React from 'react'; // Importing React library for JSX functionality
import PropTypes from 'prop-types'; // Importing PropTypes for prop type validation
import './TimerScreen.css'; // Importing CSS styles for TimerScreen component

// Defining TimerScreen functional component with props onStartQuiz
const TimerScreen = ({ onStartQuiz }) => { 
  return (
    <div className="timer-screen"> {/* Applying CSS class */}
      <p>You can only do the quiz once a day! Click below to start!</p> {/* Displaying message */}
      <button onClick={onStartQuiz}>Start Quiz</button> {/* Button to start quiz */}
    </div>
  );
};

// PropTypes validation for onStartQuiz prop
TimerScreen.propTypes = {
  onStartQuiz: PropTypes.func.isRequired, // Function prop is required
};

export default TimerScreen; // Exporting TimerScreen component
