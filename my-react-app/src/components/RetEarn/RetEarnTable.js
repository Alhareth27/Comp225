import React from 'react'; 
import './RetEarnTable.css'; 
import { Tooltip } from '../Tooltip/Tooltip'; 

// Defining RetEarTable functional component with props graphData
function RetEarTable({ graphData }) {
  
  const { title, subtitle, columns, rows } = graphData;

  // Function to render a single row, with optional child styling
  const renderRow = (row, isChild = false) => (
    <tr key={row.label}>
      <td style={{ paddingLeft: isChild ? '30px' : '0', ...(isChild ? {} : { paddingLeft: '15px' }) }}>
        {row.label}
        {row.details !== undefined ? (
          <Tooltip text={`${row.details}`}>
          </Tooltip>
        ) : (
          <span></span> 
        )}
      </td>
      {row.values?.map((value, index) => ( 
        <td key={index}>{value} </td> // Rendering table cell with value
      ))}
    </tr>
  );

  // Function to render rows and their children recursively
  const renderRows = (rows) =>
    rows.map((row) => [
      renderRow(row), 
      row.children?.map((child) => renderRow(child, true)) 
    ]);

  return (
    <div className="RetEarTable"> 
      <h2>{title}</h2> 
      <p>{subtitle}</p> 
      <table> 
        <thead>
          <tr>
            <th>Category</th>
            {/* Mapping over columns to render table headers */}
            {columns.map((column, index) => (
              <th key={index}>{column}</th> // Rendering table header with column name
            ))}
          </tr>
        </thead>
        <tbody>{renderRows(rows)}</tbody> 
      </table>
    </div>
  );
}

export default RetEarTable; 