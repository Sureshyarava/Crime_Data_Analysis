import React from "react";

export default function MainAbout() {
  const tableStyle = {
    borderCollapse: "collapse",
    width: "50%",
    margin: "auto",
    border: "2px solid #ddd", // Thicker border for the entire table
  };

  const cellStyle = {
    border: "2px solid #ddd", // Thicker border for cells
    padding: "8px",
    textAlign: "left",
  };

  const headerCellStyle = {
    ...cellStyle,
    backgroundColor: "#f2f2f2",
  };

  return (
    <div className="content">
      <h1>About Us </h1>
      <br></br><br></br>
      <h2>UNIVERSITY OF FLORIDA </h2>
      <br></br>
      <h2><storng>Computer and Information Science and Engineering</storng></h2>
      <br></br><br></br><br></br>
      <h2>[COP5725] - Database Management Systems</h2>
      <br></br>
      <h2>Instructor: Dr. Markus Schneider</h2>
      <br></br><br></br><br></br>
      <h2> Crime Data Analysis for Safer Communities</h2>
      <br></br><br></br><br></br>
      <h3>Project Group : 18</h3>
      <br></br><br></br>
      

      <h3>Group Members</h3><br></br>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerCellStyle}>Name</th>
            <th style={headerCellStyle}>UFID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={cellStyle}>Venkata Suresh Yarava</td>
            <td style={cellStyle}>61752296</td>
          </tr>
          <tr>
            <td style={cellStyle}>Sri Charan Pabbathi</td>
            <td style={cellStyle}>80984724</td>
          </tr>
          <tr>
            <td style={cellStyle}>Chenna Kesava Varaprasad Korlapati</td>
            <td style={cellStyle}>48368778</td>
          </tr>
          <tr>
            <td style={cellStyle}>Sreenivasa Raju Konduru</td>
            <td style={cellStyle}>83999388</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
