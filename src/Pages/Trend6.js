import React, { useState } from "react";
// import chart from "../chart.png";
import '../Css/trend.css';
import Plot6 from "./Plot6";
import getCookie from "./GetCookieJs";
import handleLogout from "./HandleLogoutJs";


export default function Trend6() {
  const [href, setHref] = useState('./trend6');

  const handleLinkClick = (path) => {
    const authToken = getCookie("authToken");
    if (authToken) {
        setHref(path);
    } else {
        setHref('./login');
    }
}
  return (
    <div className="wrapper">
      <div className="sidebar">
        <a href="/dashboard"><h2 style={{ marginTop: "-13%" }}>Dashboard</h2></a>
        <ul>
        <li><a href={href} onClick={() => handleLinkClick("/trend1")}>Trend 1</a></li>
                    <li><a href={href} onClick={() => handleLinkClick("/trend2")}>Trend 2</a></li>
                    <li><a href={href} onClick={() => handleLinkClick("/trend3")}>Trend 3</a></li>
                    <li><a href={href} onClick={() => handleLinkClick("/trend4")}>Trend 4</a></li>
                    <li><a href={href} onClick={() => handleLinkClick("/trend5")}>Trend 5</a></li>
                    <li><a href={href} onClick={() => handleLinkClick("/trend6")}>Trend 6</a></li>
        </ul>
        <div className="social_media">
          <a href={handleLogout}>Logout</a>

        </div>
      </div>
      <div className="main_content">
        <MainPage />
      </div>
    </div>
  )
}

function MainPage() {
  const [showInput, setShowInput] = useState(true);
  const [showPlot, setShowPlot] = useState(false);
  const [apiData, setApiData] = useState(null);

  const toggleDivs = () => {
    setShowInput(!showInput);
    setShowPlot(!showPlot);
  };

  const handleSubmit = (event) => {
    const dropdownValue = document.getElementById("dropdown").value;
    event.preventDefault();
    const url = 'http://127.0.0.1:5000/trend6';
    const requestData = {
      "trend_name" : "trend6",
       "params": {
        "demographic_type" : dropdownValue
      }
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData), // Convert the data to JSON format
    };

      fetch(url,requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const segregatedData = segregateData(data);
        
        // Store the fetched data in state
        setApiData(segregatedData);
        // Toggle divs to hide input and show the plot
        toggleDivs();
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  };

  return (
    <div>
      <header className="trend">
        <nav>
          <ul className="navbar-trend">
            {/* <li><h1>Police Sentiment Analysis Trend</h1></li> */}
          </ul>
        </nav>
      </header>

      <div className="content">
        <h1 className="element">Police Sentiment Trust Score AnalysisTrend</h1>
        <h4>
        This trend analyses police sentiment trust score within selected demographic type.
        </h4>
        <br />
        <h4>A line graph with time period on X-axis and Number of Crimes on Y-axis will be displayed upon submitting the user input.</h4>
        <br /><br />
        <div className="content-container">
          <div className="inside1" id="input" style={{ display: showInput ? "block" : "none" }}>
            <br />
            <br />
            <form style={{ backgroundColor: "#F3F5F9", display: "flex" }} onSubmit={handleSubmit}>
              <label htmlFor="dropdown">Select the demographic type:</label>
              <br />
              <select id="dropdown" name="dropdown">
                <option value="Age">Age</option>
                <option value="Income">Income</option>
                <option value="Gender">Gender</option>
                <option value="Education">Education</option>
                <option value="Race">Race</option>
                <option value="Trust">Trust</option>
              </select>
              <br />
              <input type="submit" value="Submit" style={{ background: "blue", color: "white", borderRadius: "3px" }} />
            </form>
          </div>
          <div className="inside2" id="plot" style={{ display: showPlot ? "block" : "none", width: "600px" }}>
            <Plot6 apdata={apiData} />
          </div>
        </div>
      </div>
    </div>
  );
}

function segregateData(data) {

  if (!data) {
    console.error('Data is null or undefined');
    return {};
  }

  const segregatedData = {};

  // Iterate over the data and segregate based on crime type
  data.forEach(entry => {
    const crimeType = entry.DEMOGRAPHIC_TYPE;

    // If the crime type doesn't exist in segregatedData, create an empty array
    if (!segregatedData[crimeType]) {
      segregatedData[crimeType] = [];
    }

    // Push an object with only "NUMBER_OF_CRIMES" and "YEAR" properties
    segregatedData[crimeType].push({
      DEMOGRAPHIC_SCORE: entry.DEMOGRAPHIC_SCORE,
      YEAR: entry.YEAR,
    });
  });
  const crimeTypeToIndex = {};
const crimeTypes = Object.keys(segregatedData);

// Iterate over crime types and replace keys with indices
crimeTypes.forEach((crimeType, index) => {
  crimeTypeToIndex[index] = crimeType;
});

// Create a new object with indices as keys
const segregatedData1 = {};
crimeTypes.forEach((crimeType, index) => {
  segregatedData1[index] = segregatedData[crimeType];
});

console.log(segregatedData1)

  return segregatedData1;
}