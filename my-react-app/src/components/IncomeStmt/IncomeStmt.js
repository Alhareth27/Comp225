import React from 'react';
import './IncomeStmt.css'; // Load custom CSS for the component
import { Tooltip } from '../Tooltip/Tooltip'; // Import Tooltip component for detailed info

function IncomeStmtTable({graphData}) {
  const { title, subtitle, columns, rows } = graphData; // Destructure props for easy access

  const renderRow = (row, level = 0) => {
    // Render a table row with indentation based on hierarchy level
    return (
      <tr key={row.label}>
        <td style={{ paddingLeft: `${15 + level * 15}px` }}>
          {row.details ? ( 
            <Tooltip text={row.details}>
              <span>{row.label}</span>
            </Tooltip> // Show tooltip if details exist
          ) : (
            <span>{row.label}</span> // Otherwise, just show label
          )}
        </td>
        {row.values?.map((value, index) => (
          <td key={index}>{value}</td> // Render each value in its own cell
        ))}
      </tr>
    );
  };

  const renderRowsWithChildren = (rows, level = 0) => {
    // Recursively render rows and their children, if any
    return rows.flatMap(row => {
      const currentRow = renderRow(row, level); // Render the current row

      const childRows = row.children ? renderRowsWithChildren(row.children, level + 1) : [];

      const totalRow = row.total ? renderRow(row.total, level) : null; // Render a total row if specified

      return [currentRow, ...childRows, totalRow];
    }).filter(row => row !== null); // Filter out any null rows (e.g., missing totals)
  };

  return (
    <div className="IncomeStmtTable">
      <h2>{title}</h2> 
      <p>{subtitle}</p> 
      <table>
        <thead>
          <tr>
            <th>Category</th>
            {columns.map((column, index) => (
              <th key={index}>{column}</th> // Render each column header
            ))}
          </tr>
        </thead>
        <tbody>
          {renderRowsWithChildren(rows)}
        </tbody>
      </table>
    </div>
  );
}

export default IncomeStmtTable; // Export component
