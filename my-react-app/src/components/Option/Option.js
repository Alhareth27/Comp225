import React from "react";
import "./option.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const Option = ({ option, onSelectOption, isSelected, isCorrect }) => {
  const getButtonStyle = () => {
    if (!isSelected) return {};
    return isCorrect ? { backgroundColor: 'lightgreen' } : { backgroundColor: 'lightcoral' };
  };

  return (
    <button className="option-button" onClick={onSelectOption} style={getButtonStyle()}>
      {option}
      {isSelected && isCorrect && <FontAwesomeIcon icon={faCheck} className="check-icon" />}
      {isSelected && !isCorrect && <FontAwesomeIcon icon={faTimes} className="times-icon" />}
    </button>
  );
}; 

export default Option;
