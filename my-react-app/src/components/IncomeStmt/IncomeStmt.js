import React from 'react';
import sooData from './IncomeStmt.json';
import './IncomeStmt.css';
import { Tooltip } from '../Tooltip/Tooltip';

function IncomeStmtTable() {
  const { title, subtitle, columns, rows } = sooData;

  const renderRow = (row, level = 0) => {
    return (
      <tr key={row.label}>
        <td style={{ paddingLeft: `${15 + level * 15}px` }}>
          {row.details !== undefined ? ( 
            <Tooltip text={`${row.details}`}>
              <span>{row.label}</span>
            </Tooltip>
          ) : (
            <span>{row.label}</span> 
          )}
        </td>
        {row.values?.map((value, index) => (
          <td key={index}>{value}</td>
        ))}
      </tr>
    );
  };

  const renderRowsWithChildren = (rows, level = 0) => {
    return rows.flatMap(row => {
      const currentRow = renderRow(row, level);

      const childRows = row.children ? renderRowsWithChildren(row.children, level + 1) : [];

      const totalRow = row.total ? renderRow(row.total, level) : null;

      return [currentRow, ...childRows, totalRow];
    }).filter(row => row !== null); 
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
              <th key={index}>{column}</th>
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

export default IncomeStmtTable;
