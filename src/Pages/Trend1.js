import React, { useState } from "react";
// import chart from "../chart.png";
import '../Css/trend.css';
import Plot from "./Plot3";
import getCookie from "./GetCookieJs";
import handleLogout from "./HandleLogoutJs";


export default function Trend1() {

  const [href, setHref] = useState('./trend1');

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
          <a href="./login" onClick={handleLogout}>Logout</a>

        </div>
      </div>
      <div className="main_content">
        <MainPage />
        <footer id="footer" style={{ marginLeft: "20%" }}><p>Disclaimer: This project is intended for informational 
          and educational purposes only. The analysis and trends presented in this report are based on publicly 
          available crime data and are 
          subject to the limitations and accuracy of the data sources.</p></footer>
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
    const dropdownValue = getSelectedDropdownValues();
    const season = document.querySelector('input[name="season"]:checked')?.value;
    event.preventDefault();
    const url = 'http://127.0.0.1:5000/trend1';
    const requestData = {
      "trend_name": "trend1",
      "params": {

        "crime_type": dropdownValue,
        "season_name" : season
      }
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData), // Convert the data to JSON format
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {


        console.log(data);

        const appdata = segregateData(data);
        // Store the fetched data in state
        setApiData(appdata);
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
            {/* <li><h1>Season-Based Crime Analysis Trend</h1></li> */}
          </ul>
        </nav>
      </header>

      <div className="content">
        <h1 className="element">Season-Based Crime Analysis Trend</h1>
        <div className="content-container">
          <div className="inside1" id="input" style={{ display: showInput ? "block" : "none" }}>
            <br />
            <form style={{ backgroundColor: "#F3F5F9", display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
            <strong><h2>Select a Specific Season </h2> </strong>
            <br></br>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <label style={{ marginRight: "10px" }}></label>
                <input type="radio" id="summer" name="season" value="summer" style={{ marginRight: "10px" }} />
                <label htmlFor="summer">Summer</label>

                <input type="radio" id="winter" name="season" value="winter" style={{ marginRight: "10px", marginLeft: "20px" }} />
                <label htmlFor="winter">Winter</label>

                <input type="radio" id="fall" name="season" value="fall" style={{ marginRight: "10px", marginLeft: "20px" }} />
                <label htmlFor="fall">Fall</label>

                <input type="radio" id="spring" name="season" value="spring" style={{ marginLeft: "20px" }} />
                <label htmlFor="spring">Spring</label>
            </div>
              <br></br>
              <label htmlFor="dropdown">Select atmost 3 crime types :</label>
              <br />
              <select id="dropdown" name="dropdown" multiple size="10">
                <option value="ROBBERY">ROBBERY</option>
                <option value="HOMICIDE">HOMICIDE</option>
                <option value="CRIMINAL DAMAGE">CRIMINAL DAMAGE</option>
                <option value="CRIMINAL TRESPASS">CRIMINAL TRESPASS</option>
                <option value="KIDNAPPING">KIDNAPPING</option>
                <option value="NARCOTICS">NARCOTICS</option>
                <option value="OTHER OFFENSE">OTHER OFFENSE</option>
                <option value="RITUALISM">RITUALISM</option>
                <option value="ARSON">ARSON</option>
                <option value="DECEPTIVE PRACTICE">DECEPTIVE PRACTICE</option>
                <option value="SEX OFFENSE">SEX OFFENSE</option>
                <option value="BATTERY">BATTERY</option>
                <option value="CONCEALED CARRY LICENSE VIOLATION">CONCEALED CARRY LICENSE VIOLATION</option>
                <option value="PROSTITUTION">PROSTITUTION</option>
                <option value="OBSCENITY">OBSCENITY</option>
                <option value="CRIMINAL ABORTION">CRIMINAL ABORTION</option>
                <option value="ASSAULT">ASSAULT</option>
                <option value="CRIMINAL SEXUAL ASSAULT">CRIMINAL SEXUAL ASSAULT</option>
                <option value="THEFT">THEFT</option>
                <option value="GAMBLING">GAMBLING</option>
                <option value="OTHER NARCOTIC VIOLATION">OTHER NARCOTIC VIOLATION</option>
                <option value="WEAPONS VIOLATION">WEAPONS VIOLATION</option>
                <option value="HUMAN TRAFFICKING">HUMAN TRAFFICKING</option>
                <option value="PUBLIC INDECENCY">PUBLIC INDECENCY</option>
                <option value="LIQUOR LAW VIOLATION">LIQUOR LAW VIOLATION</option>
                <option value="INTERFERENCE WITH PUBLIC OFFICER">INTERFERENCE WITH PUBLIC OFFICER</option>
                <option value="INTIMIDATION">INTIMIDATION</option>
                <option value="PUBLIC PEACE VIOLATION">PUBLIC PEACE VIOLATION</option>
                <option value="NON-CRIMINAL">NON-CRIMINAL</option>
                <option value="STALKING">STALKING</option>
                <option value="BURGLARY">BURGLARY</option>
                <option value="MOTOR VEHICLE THEFT">MOTOR VEHICLE THEFT</option>
                <option value="OFFENSE INVOLVING CHILDREN">OFFENSE INVOLVING CHILDREN</option>
              </select>
              <input type="submit" value="Submit" style={{ background: "blue", color: "white", borderRadius: "3px" }} />
            </form>
          </div>
          <div className="inside2" id="plot" style={{ display: showPlot ? "block" : "none", width: "600px" }}>
            <Plot apdata={apiData} />
          </div>
        </div>
      </div>
    </div>

  );
}


function getSelectedDropdownValues() {
  // Get the <select> element by its ID
  const dropdown = document.getElementById("dropdown");

  // Create an array to store the values of selected options
  const selectedValues = [];

  // Iterate over the options and add the value to the array if the option is selected
  for (let i = 0; i < dropdown.options.length; i++) {
    if (dropdown.options[i].selected) {
      selectedValues.push(dropdown.options[i].value);
    }
  }

  // Log or use the collected selected values as needed
  console.log(selectedValues);

  // Return the array if needed
  return selectedValues;
}


function segregateData(data) {

  if (!data) {
    console.error('Data is null or undefined');
    return {};
  }

  const segregatedData = {};

  // Iterate over the data and segregate based on crime type
  data.forEach(entry => {
    const crimeType = entry.CRIME_TYPE;

    // If the crime type doesn't exist in segregatedData, create an empty array
    if (!segregatedData[crimeType]) {
      segregatedData[crimeType] = [];
    }

    // Push an object with only "NUMBER_OF_CRIMES" and "YEAR" properties
    segregatedData[crimeType].push({
      NUMBER_OF_CRIMES: entry.NUMBER_OF_CRIMES,
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