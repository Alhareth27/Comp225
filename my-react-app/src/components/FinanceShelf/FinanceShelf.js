import React, { useState, useEffect, useRef } from 'react';
import measuresData from "./measures.json"; // Load data from JSON file
import "./FinanceShelf.css"; // Load custom CSS

const FinanceShelf = () => {
    const [isOpen, setIsOpen] = useState(false); // State to toggle shelf visibility
    const [activeTerm, setActiveTerm] = useState(null); // State to manage active glossary term
    const shelfRef = useRef(null); // Ref to detect clicks outside the component
  
    const toggleShelf = () => setIsOpen(!isOpen); // Toggle shelf open/close
    const toggleTerm = (term) => { 
      setActiveTerm(activeTerm === term ? null : term); // Set or unset active term
    };
  
    useEffect(() => { 
        const handleClickOutside = (event) => {
          if (shelfRef.current && !shelfRef.current.contains(event.target)) {
            setIsOpen(false); // Close shelf on outside click
          }
        };
    
        if (isOpen) {
          document.addEventListener("mousedown", handleClickOutside); // Listen for outside clicks
        } else {
          document.removeEventListener("mousedown", handleClickOutside); // Stop listening when closed
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside); // Clean up listener
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
                <div className="term-description">{description}</div> // Display term description if active
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FinanceShelf;
