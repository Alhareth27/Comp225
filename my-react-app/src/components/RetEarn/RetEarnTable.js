import React from 'react'; // Importing React library for JSX functionality
import './RetEarnTable.css'; // Importing CSS styles for RetEarnTable component
import { Tooltip } from '../Tooltip/Tooltip'; // Importing Tooltip component

// Defining RetEarTable functional component with props graphData
function RetEarTable({ graphData }) {
  
  // Destructuring props to extract title, subtitle, columns, and rows
  const { title, subtitle, columns, rows } = graphData;

  // Function to render a single row, with optional child styling
  const renderRow = (row, isChild = false) => (
    <tr key={row.label}>
      <td style={{ paddingLeft: isChild ? '30px' : '0', ...(isChild ? {} : { paddingLeft: '15px' }) }}>
        {row.label}
        {/* Rendering a Tooltip component if row.details exists */}
        {row.details !== undefined ? (
          <Tooltip text={`${row.details}`}>
          </Tooltip>
        ) : (
          <span></span> // Empty span if details are not provided
        )}
      </td>
      {/* Mapping over row values to render table cells */}
      {row.values?.map((value, index) => ( 
        <td key={index}>{value} </td> // Rendering table cell with value
      ))}
    </tr>
  );

  // Function to render rows and their children recursively
  const renderRows = (rows) =>
    rows.map((row) => [
      renderRow(row), // Rendering parent row
      row.children?.map((child) => renderRow(child, true)) // Rendering children rows
    ]);

  // Returning JSX for RetEarnTable component
  return (
    <div className="RetEarTable"> {/* Applying CSS class */}
      <h2>{title}</h2> {/* Rendering title */}
      <p>{subtitle}</p> {/* Rendering subtitle */}
      <table> {/* Rendering table */}
        <thead>
          <tr>
            <th>Category</th>
            {/* Mapping over columns to render table headers */}
            {columns.map((column, index) => (
              <th key={index}>{column}</th> // Rendering table header with column name
            ))}
          </tr>
        </thead>
        <tbody>{renderRows(rows)}</tbody> {/* Rendering table body using renderRows function */}
      </table>
    </div>
  );
}

export default RetEarTable; // Exporting RetEarTable component
