import React from 'react';
import './StmtOpsTable.css';
import { Tooltip } from '../Tooltip/Tooltip';

function ConsolidatedStatementsTable( {graphData}) {
  const { title, subtitle, columns, rows } = graphData;

  const renderRow = (row, isChild = false) => (
    <tr key={row.label}>
      <td style={{ paddingLeft: isChild ? '30px' : '0', ...(isChild ? {} : { paddingLeft: '15px' }) }}>{row.label}
      
      {row.details !== undefined ? ( 
            <Tooltip text={`${row.details}`}>
            </Tooltip>
          ) : (
            <span></span> 
          )}
      
      </td>
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