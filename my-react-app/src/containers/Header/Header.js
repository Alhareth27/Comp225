import React from "react"; // Importing React library for JSX functionality
import "./header.css"; // Importing CSS styles for Header component

// Defining Header functional component
const Header = () => {
    return(
        <div className="header"> {/* Applying CSS class */}
            Company of the Day {/* Displaying header text */}
        </div>
    )
}

export default Header; // Exporting Header component
