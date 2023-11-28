import React, { useState } from "react";
// import chart from "../chart.png";
import '../Css/trend.css';
import Plot from "./Plot";
import getCookie from "./GetCookieJs";
import handleLogout from "./HandleLogoutJs";
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';


export default function Trend2() {

  const [href, setHref] = useState('./trend2');

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
  const [radiusValue, setRadiusValue] = useState(10);

  const toggleDivs = () => {
    setShowInput(!showInput);
    setShowPlot(!showPlot);
  };

  const handleSubmit = (event) => {
    const dropdownValue = document.getElementById("dropdown").value;
    event.preventDefault();
    const url = 'http://127.0.0.1:5000/trend2';
    const requestData = {
      "trend_name": "trend2",
      "params": {
        "district_name": dropdownValue,
        "radius" : parseFloat(radiusValue)
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
        const apdata = combineYearMonth(data);

        console.log(apdata);

        // Store the fetched data in state
        setApiData(apdata);
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
            {/* <li><h1>Geographical Analysis of Safety and Security Trend</h1></li> */}
          </ul>
        </nav>
      </header>

      <div className="content">
        <h1 className="element">Geographical Crime Analysis Trend</h1>
        <h4>
        This trend analyses crime incidents occured in the specified district of Chicago City and within specified radius.
        </h4>
        <br />
        <h4>A line graph with time period on X-axis and Number of Crimes on Y-axis will be displayed upon submitting the user input.</h4>
        <br /><br />
        <div className="content-container">
          <div className="inside1" id="input" style={{ display: showInput ? "block" : "none" }}>
            <br />
            <br />
            <form style={{ backgroundColor: "#F3F5F9", display: "flex" }} onSubmit={handleSubmit}>
              <label htmlFor="dropdown">Select the district:</label>
              <br />
              <select id="dropdown" name="dropdown">
              <option value="Hyde Park">Hyde Park</option>
                <option value="River North">River North</option>
                <option value="West Loop">West Loop</option>
                <option value="Irving Park">Irving Park</option>
                <option value="Uptown">Uptown</option>
                <option value="Loop">Loop</option>
                <option value="Bridgeport">Bridgeport</option>
                <option value="Wrigleyville">Wrigleyville</option>
                <option value="Lakeview">Lakeview</option>
                <option value="Lincoln Park">Lincoln Park</option>
              </select>
              <br />  


              <SliderComponent onSliderChange={setRadiusValue} />



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


const SliderComponent = () => {
  const [value, setValue] = useState(10);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ width: '300px', margin: '20px' }}>
      <Typography id="range-slider" gutterBottom>
        Select Radius (in kilo meters)
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value}km`}
        min={10}
        max={100}
        step={1}
      />
    </div>
  );
};



function combineYearMonth(data) {
  return data.map(entry => {
    const combinedDate =  entry.MONTH.toString() + "-" +entry.YEAR.toString();

    return {
      DATE: combinedDate,
      NUMBER_OF_CRIMES: entry.NUMBER_OF_CRIMES
    };
  });
}