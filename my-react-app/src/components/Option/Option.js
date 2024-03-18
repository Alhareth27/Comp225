import React from "react";
import "./option.css";

const Option = ({ option, onSelectOption, isSelected, isCorrect }) => {
  const getButtonStyle = () => {
    if (!isSelected) return {};
    return isCorrect ? { backgroundColor: 'lightgreen' } : { backgroundColor: 'lightcoral' };
  };

  return (
    <button onClick={onSelectOption} style={getButtonStyle()}>
      {option}
    </button>
  );
};

export default Option;
