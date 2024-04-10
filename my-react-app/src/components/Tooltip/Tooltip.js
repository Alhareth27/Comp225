import React, {useState} from "react";

export const Tooltip = ({text, children}) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <div
            className="tooltip-container"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave = {() => setIsVisible(false)}
            >
            {children}
            <span className="tooltip-icon" aria-hidden="true"> ❓ </span>
            {isVisible&& <div className="tooltip">{text}</div>} 
        </div>
    );
};

