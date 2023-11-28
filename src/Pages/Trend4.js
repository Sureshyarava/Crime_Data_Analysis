import React, { useState } from "react";
// import chart from "../chart.png";
import '../Css/trend.css';
import Plot3 from "./Plot3";
import getCookie from "./GetCookieJs";
import handleLogout from "./HandleLogoutJs";


export default function Trend4() {
  const [href, setHref] = useState('./trend4');

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
    const dropdownValue = getSelectedDropdownValues();
    event.preventDefault();
    const url = 'http://127.0.0.1:5000/trend4';
    const requestData = {
      "trend_name" : "trend4",
       "params": {
        "location_type" : dropdownValue
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

        console.log(segregateData)
        
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
            {/* <li><h1>Location-Based Crime Analysis Trend</h1></li> */}
          </ul>
        </nav>
      </header>

      <div className="content">
        <h1 className="element">Location-Based Crime Analysis Trend</h1>
        <h4>
        This trend analyses crime incidents for specified crime type and which occured in specified type of location (like Residential Areas, Government and Public Facilities etc).
        </h4>
        <br />
        <h4>A line graph with time period on X-axis and Number of Crimes on Y-axis will be displayed upon submitting the user input.</h4>
        <br /><br />
        <div className="content-container">
          <div className="inside1" id="input" style={{ display: showInput ? "block" : "none" }}>
            <br />
            <br />
            <form style={{ backgroundColor: "#F3F5F9", display: "flex" }} onSubmit={handleSubmit}>
              <label htmlFor="dropdown">Select the crime type:</label>
              <br />
              <select id="dropdown" name="dropdown" multiple size="4">
                <option value="Residential Areas">Residential Areas</option>
                <option value="Commercial Areas">Commercial Areas</option>
                <option value="Educational Institutions">Educational Institutions</option>
                <option value="Transportation Areas">Transportation Areas</option>
                <option value="Healthcare Facilities">Healthcare Facilities</option>
                <option value="Government and Public Facilities">Government and Public Facilities</option>
                <option value="Miscellaneous Location">Miscellaneous Location</option>
              </select>
              <br />
              <input type="submit" value="Submit" style={{ background: "blue", color: "white", borderRadius: "3px" }} />
            </form>
          </div>
          <div className="inside2" id="plot" style={{ display: showPlot ? "block" : "none", width: "600px" }}>
            <Plot3 apdata={apiData} />
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
    const location_type = entry.LOCATION_TYPE;

    // If the crime type doesn't exist in segregatedData, create an empty array
    if (!segregatedData[location_type]) {
      segregatedData[location_type] = [];
    }

    // Push an object with only "NUMBER_OF_CRIMES" and "YEAR" properties
    segregatedData[location_type].push({
      NUMBER_OF_CRIMES: entry.NUMBER_OF_CRIMES,
      YEAR: entry.YEAR,
    });
  });
  const locationTypeToIndex = {};
const locationTypes = Object.keys(segregatedData);

// Iterate over crime types and replace keys with indices
locationTypes.forEach((locationType, index) => {
  locationTypeToIndex[index] = locationType;
});

// Create a new object with indices as keys
const segregatedData1 = {};
locationTypes.forEach((locationType, index) => {
  segregatedData1[index] = segregatedData[locationType];
});

console.log(segregatedData1)

  return segregatedData1;
}