import React from 'react';
import RetEarData from './RetEarn.json'; 
import './RetEarnTable.css';

function RetEarTable() {
  const { title, subtitle, columns, rows } = RetEarData;

  const renderRow = (row, isChild = false) => (
    <tr key={row.label}>
      <td style={{ paddingLeft: isChild ? '30px' : '0', ...(isChild ? {} : { paddingLeft: '15px' }) }}>{row.label}</td>
      {row.values?.map((value, index) => ( 
        <td key={index}>{value}</td>
      ))}
    </tr>
  );

  const renderRows = (rows) =>
    rows.map((row) => [
      renderRow(row),
      row.children?.map((child) => renderRow(child, true)) 
    ]);

    return (
      <div className="RetEarTable"> {}
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
          <tbody>{renderRows(rows)}</tbody>
        </table>
      </div>
    );
    
}

export default RetEarTable;