import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../assets/ViewTable.css";
function ViewTable() {
  const [tableName, setTableName] = useState('');
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const availableTables = [
    'Diagnoses',
    'Doctors',
    'Medicines',
    'PatientDiagnoses',
    'PatientDoctor',
    'PatientMedicines',
    'Patients'
  ];

  const fetchTableData = async () => {
    if (!tableName) {
      setError('Please select a table');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/node/table/${tableName}`, {
        method: 'GET',
      });
      const data = await response.json();

      if (response.ok) {
        setTableData(data);
        setError(null);  // Clear any previous error
      } else {
        setError('Failed to fetch table data');
      }
    } catch (error) {
      setError('Error fetching table data');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTableData();
  };

  return (
    <div className="view-table-container">
      <h3>View Table Data</h3>
      
      <form onSubmit={handleSubmit} className="table-form">
        <label>
          Select Table:
          <select
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            className="table-select"
          >
            <option value="">Select a table</option>
            {availableTables.map((table) => (
              <option key={table} value={table}>
                {table}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="fetch-button">Fetch Data</button>
      </form>

      {error && <div className="error">{error}</div>}
      {tableData.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              {Object.keys(tableData[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, idx) => (
                  <td key={idx}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewTable;
