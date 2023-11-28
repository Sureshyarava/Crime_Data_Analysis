import React, { useState } from "react";
// import chart from "../chart.png";
import '../Css/trend.css';
import Plot from "./Plot";
import getCookie from "./GetCookieJs";
import handleLogout from "./HandleLogoutJs";


export default function Trend5() {
  const [href, setHref] = useState('./trend5');

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
        <footer id="footer" style={{ marginLeft: "20%" }}><p>Disclaimer</p></footer>
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
    const url = 'http://127.0.0.1:5000/trend5';
    const requestData = {
      "trend_name" : "trend5",
       "params": {
        "crime_type" : dropdownValue
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

        const apdata = segregateData(data)
        
        // Store the fetched data in state
        setApiData(apdata);
        // Toggle divs to hide input and show the plot
        console.log(apdata);
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
            <li><h1>Dynamic Crime Analysis Trend</h1></li>
          </ul>
        </nav>
      </header>

      <div className="content">
        <h1 className="element">Analysis of Trend Data</h1>
        <div className="content-container">
          <div className="inside1" id="input" style={{ display: showInput ? "block" : "none" }}>
            <br />
            <br />
            <form style={{ backgroundColor: "#F3F5F9", display: "flex" }} onSubmit={handleSubmit}>
              <label htmlFor="dropdown">Select the crime type:</label>
              <br />
              <select id="dropdown" name="dropdown">
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
              <br />
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


function segregateData(data) {
  if (!data) {
    console.error('Data is null or undefined');
    return null;
  }

  const segregatedData = {};

  // Iterate over the data and segregate based on crime type
  data.forEach(entry => {
    const day = entry.DAY;

    // If the crime type doesn't exist in segregatedData, create an empty array
    if (!segregatedData[day]) {
      segregatedData[day] = [];
    }

    // Push an object with only "NUMBER_OF_CRIMES" and "YEAR" properties
    segregatedData[day].push({
      NUMBER_OF_CRIMES: entry.NUMBER_OF_CRIMES,
      YEAR: entry.YEAR,
    });
  });

  return segregatedData;
}