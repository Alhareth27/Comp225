import React, { useState } from "react";

// Defining Tooltip functional component with props text and children
export const Tooltip = ({ text, children }) => {
    const [isVisible, setIsVisible] = useState(false); 
    return (
        <div
            className="tooltip-container" 
            onMouseEnter={() => setIsVisible(true)} // Handling mouse enter event to show tooltip
            onMouseLeave={() => setIsVisible(false)} // Handling mouse leave event to hide tooltip
        >
            {children} {/* Rendering children */}
            <span className="tooltip-icon" aria-hidden="true"> ❓ </span> 
            {isVisible && <div className="tooltip">{text}</div>} 
        </div>
    );
};
