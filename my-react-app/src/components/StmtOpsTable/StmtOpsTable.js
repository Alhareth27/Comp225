import React from 'react';
import sooData from './SOO.json'; 
import './StmtOpsTable.css';

function ConsolidatedStatementsTable() {
  const { title, subtitle, columns, rows } = sooData;

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
      <div className="ConsolidatedStatementsTable"> {}
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

export default ConsolidatedStatementsTable;