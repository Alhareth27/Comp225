import React, { useState, useEffect, useRef } from 'react';
import measuresData from "./measures.json";
import "./FinanceShelf.css";

const FinanceShelf = () => {
    const [isOpen, setIsOpen] = useState(false); 
    const [activeTerm, setActiveTerm] = useState(null); 
    const shelfRef = useRef(null); 
  
    const toggleShelf = () => setIsOpen(!isOpen);
    const toggleTerm = (term) => { 
      setActiveTerm(activeTerm === term ? null : term);
    };
  
    useEffect(() => { 
        const handleClickOutside = (event) => {
          if (shelfRef.current && !shelfRef.current.contains(event.target)) {
            setIsOpen(false);
          }
        };
    
        if (isOpen) {
          document.addEventListener("mousedown", handleClickOutside);
        } else {
          document.removeEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [isOpen]);

  return (
    <div className="finance-shelf-container" ref={shelfRef}>
      <div className="sidebar-menu-icon" onClick={toggleShelf}>
        Glossary
      </div>
      {isOpen && (
        <div className="shelf">
          <div className="close-button" onClick={toggleShelf}>
            Close
          </div>
          {measuresData.map(({ term, description }) => (
            <div key={term} className="term-container">
              <div className="term-title" onClick={() => toggleTerm(term)}>
                {term}
              </div>
              {activeTerm === term && (
                <div className="term-description">{description}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FinanceShelf;
