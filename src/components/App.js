import React, { useState } from "react";
import "../styles/App.css";

const App = () => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  
  const [selectedMonth, setSelectedMonth] = useState(0); // Index of the month
  const [selectedYear, setSelectedYear] = useState(2025);
  const [isEditingYear, setIsEditingYear] = useState(false);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderDaysTable = () => {
    const days = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();

    let table = [];
    let row = [];
    // Padding for the first row
    for (let i = 0; i < firstDay; i++) {
      row.push(<td key={`empty-${i}`} />);
    }

    // Add days to the table
    for (let day = 1; day <= days; day++) {
      if (row.length === 7) {
        table.push(<tr key={`row-${table.length}`}>{row}</tr>);
        row = [];
      }
      row.push(<td key={`day-${day}`}>{day}</td>);
    }

    // Fill the last row
    if (row.length > 0) {
      while (row.length < 7) {
        row.push(<td key={`empty-${row.length}`} />);
      }
      table.push(<tr key={`row-${table.length}`}>{row}</tr>);
    }

    return table;
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const handleYearEdit = () => {
    setIsEditingYear(true);
  };

  const handleYearInputChange = (event) => {
    setSelectedYear(parseInt(event.target.value) || selectedYear);
  };

  const handleYearSubmit = () => {
    setIsEditingYear(false);
  };

  const handlePrevMonth = () => {
    setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (selectedMonth === 0) setSelectedYear((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (selectedMonth === 11) setSelectedYear((prev) => prev + 1);
  };

  const handlePrevYear = () => {
    setSelectedYear((prev) => prev - 1);
  };

  const handleNextYear = () => {
    setSelectedYear((prev) => prev + 1);
  };

  return (
    <div id="main">
      <h1 id="heading">Calendar</h1>
      <div>
       
        <select
          id="month-dropdown"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {months.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <div>
        <span
          id="year-display"
          onDoubleClick={handleYearEdit}
        >
          {isEditingYear ? (
            <input
              id="year-input"
              type="number"
              value={selectedYear}
              onChange={handleYearInputChange}
              onBlur={handleYearSubmit}
              autoFocus
            />
          ) : (
            selectedYear
          )}
        </span>
      </div>
      <hr></hr>
      <table id="days-table">
        <thead>
          <tr>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>{renderDaysTable()}</tbody>
      </table>
      <hr></hr>
      <div>
        <button id="prev-month-btn" onClick={handlePrevMonth}>
          Prev Month
        </button>
        <button id="next-month-btn" onClick={handleNextMonth}>
          Next Month
        </button>
      </div>
      <div>
        <button id="prev-year-btn" onClick={handlePrevYear}>
          Prev Year
        </button>
        <button id="next-year-btn" onClick={handleNextYear}>
          Next Year
        </button>
      </div>
    </div>
  );
};

export default App;
/*

import React, {Component, useState} from "react";
import '../styles/App.css';

const App = () => {
  return (
    <div id="main"></div>
  )
}


export default App;
*/