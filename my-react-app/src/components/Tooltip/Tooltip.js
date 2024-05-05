import React, { useState } from "react"; // Importing React library for JSX functionality and useState hook

// Defining Tooltip functional component with props text and children
export const Tooltip = ({ text, children }) => {
    const [isVisible, setIsVisible] = useState(false); // State for tooltip visibility
    return (
        <div
            className="tooltip-container" // Applying CSS class
            onMouseEnter={() => setIsVisible(true)} // Handling mouse enter event to show tooltip
            onMouseLeave={() => setIsVisible(false)} // Handling mouse leave event to hide tooltip
        >
            {children} {/* Rendering children */}
            <span className="tooltip-icon" aria-hidden="true"> ❓ </span> {/* Tooltip icon */}
            {isVisible && <div className="tooltip">{text}</div>} {/* Rendering tooltip if isVisible is true */}
        </div>
    );
};
